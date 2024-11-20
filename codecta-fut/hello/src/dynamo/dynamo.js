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

export const getAllPlayers = async (tableName) => {
  const params = {
    TableName: tableName,
  };
  const result = await docClient.send(new ScanCommand(params));
  return result.Items || [];
};

export const deletePlayer = async (tableName, playerId) => {
  const params = {
    TableName: tableName,
    Key: {
      playerId: playerId,
    },
  };
  const result = await docClient.send(new DeleteCommand(params));
  return result.Item;
};

export const getItemCommand = async (tableName, playerId) => {
  const getCommand = new GetCommand({
    TableName: tableName,
    Key: {
      playerId: playerId,
    },
  });

  const response = await docClient.send(getCommand);
  return response.Item;
};

export const updateItem = async (tableName, playerId, updatePlayer) => {
  const update = {
    TableName: tableName,
    Key: {
      playerId: playerId,
    },
    UpdateExpression:
      "SET #name = :name, #club = :club, #nationality = :nationality, #league = :league",
    ExpressionAttributeNames: {
      "#name": "name",
      "#club": "club",
      "#nationality": "nationality",
      "#league": "league",
    },
    ExpressionAttributeValues: {
      ":name": updatePlayer.name,
      ":club": updatePlayer.club,
      ":nationality": updatePlayer.nationality,
      ":league": updatePlayer.league,
    },
  };

  await docClient.send(new UpdateCommand(update));
};
