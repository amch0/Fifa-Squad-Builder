import {
  handleGetMethod,
  handlePostMethod,
  handleGetSingleTeamMethod,
  handleDeleteTeam,
  handlePutTeam,
  handlePlayerTeamAssociation,
  removePlayerFromTeam,
} from "./src/httpMethodHandlers/teamsMethods";
import { successResponse } from "./src/responseTeams/successResponseTeams";

export const handler = async (event) => {
  try {
    if (event.httpMethod === "POST") {
      await handlePostMethod(event);
      return successResponse({ message: "Successfully created a team" });
    } else if (event.httpMethod === "GET") {
      if (event.pathParameters && event.pathParameters.id) {
        const team = await handleGetSingleTeamMethod(event);
        return successResponse(team);
      } else {
        const teams = await handleGetMethod(event);
        return successResponse(teams);
      }
    } else if (event.httpMethod === "DELETE") {
      if (event.pathParameters.teamId && event.pathParameters.playerId) {
        const team = await removePlayerFromTeam(event);
        return successResponse(team);
      } else {
        const result = await handleDeleteTeam(event);
        return successResponse(result);
      }
    } else if (event.httpMethod === "PUT") {
      const result = await handlePutTeam(event);
      return successResponse(result);
    } else if (event.httpMethod === "PATCH") {
      const result = await handlePlayerTeamAssociation(event);
      return successResponse(result);
    }
  } catch (e) {
    console.log("Error: ", e);
  }
};
