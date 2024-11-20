import { DynamoDBClient, ScanCommand } from "@aws-sdk/client-dynamodb";
import {
  PutCommand,
  DynamoDBDocumentClient,
  GetCommand,
  DeleteCommand,
  UpdateCommand,
} from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "us-east-1" });
const docClient = DynamoDBDocumentClient.from(client);

export const putItemCommand = async (tableName, item) => {
  const putCommand = new PutCommand({
    TableName: tableName,
    Item: item,
  });
  await docClient.send(putCommand);
};

export const getAllTeams = async (tableName) => {
  const params = {
    TableName: tableName,
  };
  const result = await docClient.send(new ScanCommand(params));
  return result.Items || [];
};

export const deleteTeam = async (tableName, teamId) => {
  const params = {
    TableName: tableName,
    Key: {
      teamId: teamId,
    },
  };
  const result = await docClient.send(new DeleteCommand(params));
  return result.Item;
};

export const getItemCommand = async (tableName, teamId) => {
  const getCommand = new GetCommand({
    TableName: tableName,
    Key: {
      teamId: teamId,
    },
  });

  const response = await docClient.send(getCommand);
  return response.Item;
};

export const updateItem = async (tableName, teamId, updateTeam) => {
  const update = {
    TableName: tableName,
    Key: {
      teamId: teamId,
    },
    UpdateExpression: "SET #name = :name",
    ExpressionAttributeNames: {
      "#name": "name",
    },
    ExpressionAttributeValues: {
      ":name": updateTeam.name,
    },
  };

  await docClient.send(new UpdateCommand(update));
};

export const updateTeamPlayersAndChemistry = async (
  tableName,
  teamId,
  playerInformation,
  teamChemistry
) => {
  const params = {
    TableName: tableName,
    Key: {
      teamId: teamId,
    },
    UpdateExpression:
      "SET #teamPlayers = :playerInformation, #teamChemistry = :teamChemistry",
    ExpressionAttributeNames: {
      "#teamPlayers": "teamPlayers",
      "#teamChemistry": "teamChemistry",
    },
    ExpressionAttributeValues: {
      ":playerInformation": playerInformation,
      ":teamChemistry": teamChemistry,
    },
  };

  await docClient.send(new UpdateCommand(params));
};

export const deletePlayer = async (
  tableName,
  teamId,
  playerIndex,
  playerInformation,
  teamChemistry
) => {
  const remove = {
    TableName: tableName,
    Key: {
      teamId: teamId,
    },
    UpdateExpression: `REMOVE teamPlayers [${playerIndex}]`,
  };
  const params = {
    TableName: tableName,
    Key: {
      teamId: teamId,
    },
    UpdateExpression:
      "SET #teamPlayers = :playerInformation, #teamChemistry = :teamChemistry",
    ExpressionAttributeNames: {
      "#teamPlayers": "teamPlayers",
      "#teamChemistry": "teamChemistry",
    },
    ExpressionAttributeValues: {
      ":playerInformation": playerInformation,
      ":teamChemistry": teamChemistry,
    },
  };
  await docClient.send(new UpdateCommand(remove));
  await docClient.send(new UpdateCommand(params));
};
