import {
  getAllPlayers,
  putItemCommand,
  getItemCommand,
  deletePlayer,
  updateItem,
} from "../dynamo/dynamo";

export const handlePostMethod = async (event) => {
  const playerItem = playerObjectMapper(JSON.parse(event.body));

  try {
    await putItemCommand(process.env.DYNAMO_DB_PLAYERS_TABLE, playerItem);
  } catch (e) {
    console.log("Error: ", e);
  }
};

export const handleGetMethod = async (event) => {
  try {
    if (event.httpMethod === "GET") {
      return await getAllPlayers(process.env.DYNAMO_DB_PLAYERS_TABLE);
    }
  } catch (e) {
    console.log("Error", e);
  }
};

export const handleDeletePlayer = async (event) => {
  try {
    const playerId = event.pathParameters.id;

    await deletePlayer(process.env.DYNAMO_DB_PLAYERS_TABLE, playerId);
    return { message: "Player deleted succesffuly" };
  } catch (e) {
    console.log("Error", e);
  }
};

export const handleGetSinglePlayerMethod = async (event) => {
  try {
    const playerId = event.pathParameters.id;
    const player = await getItemCommand(
      process.env.DYNAMO_DB_PLAYERS_TABLE,
      playerId
    );
    if (player) {
      return player;
    } else {
      return "Player ID is not valid";
    }
  } catch (e) {
    console.log("Error", e);
    return "Error occurred while fetching player";
  }
};
export const handlePutPlayer = async (event) => {
  try {
    const playerId = event.pathParameters.id;
    const updateData = JSON.parse(event.body);

    await updateItem(process.env.DYNAMO_DB_PLAYERS_TABLE, playerId, updateData);

    return { message: "Player info updated " };
  } catch (e) {
    console.log("Error: ", e);
  }
};

const playerObjectMapper = (playerFromRequestBody) => {
  return {
    playerId: new Date().valueOf().toString(),
    name: playerFromRequestBody.name,
    club: playerFromRequestBody.club,
    nationality: playerFromRequestBody.nationality,
    league: playerFromRequestBody.league,
  };
};
