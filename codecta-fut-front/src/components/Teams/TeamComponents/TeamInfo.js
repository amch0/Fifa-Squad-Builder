import React from "react";
import axios from "axios";
import "./TeamInfo.css";
import API_URL from "../../../services/endpoints";

const TeamInfo = ({ teams, updateTeamData, onTeamClick }) => {
  const deleteApiUrl = API_URL.DELETE_TEAM_API;

  const handleDelete = async (teamId, e) => {
    e.stopPropagation();
    console.log("Deleting team with ID:", teamId);

    const updatedTeams = teams.filter((team) => team.teamId === teamId);

    try {
      await axios.delete(`${deleteApiUrl}/${teamId}`);
      console.log("Team successfully deleted.");

      updateTeamData(updatedTeams);
    } catch (error) {
      console.error("Error deleting team:", error);
    }
  };

  /* const handleEdit = async (teamId, newName, e) => {
    e.stopPropagation();
    try {
      const updatedTeams = teams.map((team) => {
        if (team.teamId.S === teamId) {
          return { ...team, name: { S: newName } };
        }
        return team;
      });

      await axios.put(
        `${API_URL.TEAM_API}${teamId}`,
        updatedTeams.find((team) => team.teamId.S === teamId)
      );

      console.log("Team successfully edited.");

      updateTeamData(updatedTeams);
    } catch (error) {
      console.error("Error editing team:", error);
    }
  };*/

  return (
    <div className="team-container">
      <h2 className="teams-title">MY TEAMS</h2>
      <div className="team-cards-container">
        {teams.map((team, index) => (
          <div
            key={index}
            className="team-card"
            onClick={() => onTeamClick(team.teamId && team.teamId.S)}
          >
            <h3 className="team-name">{team.name && team.name.S}</h3>

            <button
              className="delete-team-button"
              onClick={(e) => handleDelete(team.teamId && team.teamId.S, e)}
            >
              <i className="fa-solid fa-trash"></i>
            </button>
            <button
              className="edit-team-button"
              /*</div> onClick={(e) => handleEdit(team.teamId && team.teamId.S, e)}*/
            >
              <i className="fa-solid fa-pen-to-square"></i>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamInfo;
