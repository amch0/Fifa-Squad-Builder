import {
  getAllTeams,
  putItemCommand,
  getItemCommand,
  deleteTeam,
  updateItem,
  updateTeamPlayersAndChemistry,
  deletePlayer,
} from "../teamsDynamo/teamsDynamo";
import { getItemCommand as fetchPlayerFromDatabase } from "../../../hello/src/dynamo/dynamo";
import {
  calculatePlayerChemistryScore,
  calculateTeamChemistryScore,
} from "./chemistryCalculations";

export const handlePostMethod = async (event) => {
  const teamItem = teamObjectMapper(JSON.parse(event.body));

  try {
    await putItemCommand(process.env.DYNAMO_DB_TEAMS_TABLE, teamItem);
  } catch (e) {
    console.log("Error: ", e);
  }
};

export const handleGetMethod = async (event) => {
  try {
    if (event.httpMethod === "GET") {
      return await getAllTeams(process.env.DYNAMO_DB_TEAMS_TABLE);
    }
  } catch (e) {
    console.log("Error", e);
  }
};

export const handleDeleteTeam = async (event) => {
  try {
    const teamId = event.pathParameters.id;

    await deleteTeam(process.env.DYNAMO_DB_TEAMS_TABLE, teamId);
    return { message: "Team deleted succesffuly" };
  } catch (e) {
    console.log("Error", e);
  }
};

export const handleGetSingleTeamMethod = async (event) => {
  try {
    const teamId = event.pathParameters.id;
    const team = await getItemCommand(
      process.env.DYNAMO_DB_TEAMS_TABLE,
      teamId
    );
    if (team) {
      return team;
    } else {
      return "Team ID is not valid";
    }
  } catch (e) {
    console.log("Error", e);
    return "Error occurred while fetching team";
  }
};
export const handlePutTeam = async (event) => {
  try {
    const teamId = event.pathParameters.id;
    const updateData = JSON.parse(event.body);

    await updateItem(process.env.DYNAMO_DB_TEAMS_TABLE, teamId, updateData);

    return { message: "Team info updated " };
  } catch (e) {
    console.log("Error: ", e);
  }
};

const teamObjectMapper = (teamFromRequestBody) => {
  return {
    teamId: new Date().valueOf().toString(),
    name: teamFromRequestBody.name,
  };
};

export const handlePlayerTeamAssociation = async (event) => {
  try {
    const requestedPlayerId = event.pathParameters.playerId;
    const requestedTeamId = event.pathParameters.teamId;

    const retrievedPlayer = await fetchPlayerFromDatabase(
      process.env.DYNAMO_DB_PLAYERS_TABLE,
      requestedPlayerId
    );

    if (!retrievedPlayer) {
      return "Requested player not found";
    }

    const retrievedTeam = await getItemCommand(
      process.env.DYNAMO_DB_TEAMS_TABLE,
      requestedTeamId
    );

    if (!retrievedTeam) {
      return "Requested team not found";
    }

    if (!retrievedTeam.teamPlayers) {
      retrievedTeam.teamPlayers = [];
    }
    const playerExistsInTeam = retrievedTeam.teamPlayers.some(
      (player) => player.playerId === requestedPlayerId
    );

    if (playerExistsInTeam) {
      return "Player with the same ID already exists in the team";
    }

    const playerInformation = {
      playerId: retrievedPlayer.playerId,
      name: retrievedPlayer.name,
      club: retrievedPlayer.club,
      nationality: retrievedPlayer.nationality,
      league: retrievedPlayer.league,
    };

    playerInformation.playerChemistry = 0;

    retrievedTeam.teamPlayers.push(playerInformation);

    for (const teamPlayer of retrievedTeam.teamPlayers) {
      teamPlayer.playerChemistry = calculatePlayerChemistryScore(
        retrievedTeam,
        teamPlayer
      );
    }
    const overallTeamChemistry = calculateTeamChemistryScore(retrievedTeam);

    await updateTeamPlayersAndChemistry(
      process.env.DYNAMO_DB_TEAMS_TABLE,
      requestedTeamId,
      retrievedTeam.teamPlayers,
      overallTeamChemistry
    );

    return "Player successfully added to the team";
  } catch (error) {
    console.error("Error: ", error);
    return "An error occurred while processing the player-team association";
  }
};

export const removePlayerFromTeam = async (event) => {
  try {
    const requestedPlayerId = event.pathParameters.playerId;
    const requestedTeamId = event.pathParameters.teamId;

    const retrievedTeam = await getItemCommand(
      process.env.DYNAMO_DB_TEAMS_TABLE,
      requestedTeamId
    );

    if (!retrievedTeam) {
      return "Requested team not found";
    }

    if (!retrievedTeam.teamPlayers || retrievedTeam.teamPlayers.length === 0) {
      return "The team doesn't have any players to remove.";
    }

    const playerIndex = retrievedTeam.teamPlayers.findIndex(
      (player) => player.playerId === requestedPlayerId
    );

    if (playerIndex === -1) {
      return "Player is not part of the team.";
    }

    const removedPlayer = retrievedTeam.teamPlayers.splice(playerIndex, 1)[0];

    removedPlayer.playerChemistry = 0;

    for (const teamPlayer of retrievedTeam.teamPlayers) {
      teamPlayer.playerChemistry = calculatePlayerChemistryScore(
        retrievedTeam,
        teamPlayer
      );
    }

    const overallTeamChemistry = calculateTeamChemistryScore(retrievedTeam);

    await deletePlayer(
      process.env.DYNAMO_DB_TEAMS_TABLE,
      requestedTeamId,
      playerIndex,
      retrievedTeam.teamPlayers,
      overallTeamChemistry
    );

    return "Player successfully removed from the team.";
  } catch (error) {
    console.error("Error: ", error);
    return "An error occurred while removing the player from the team.";
  }
};
