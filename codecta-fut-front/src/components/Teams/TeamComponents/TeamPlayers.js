import React from "react";
import "./TeamPlayers.css";

const TeamPlayers = ({ teamPlayers, onDeleteTeamPlayer }) => {
  return (
    <div className="team-players">
      <h4>Players in the team:</h4>
      <ul>
        {teamPlayers &&
          teamPlayers.map((player) => (
            <li key={player.playerId}>
              <p>
                <strong>Name:</strong> {player.name}
              </p>
              <p>
                <strong>Club:</strong> {player.club}
              </p>
              <p>
                <strong>Nationality:</strong> {player.nationality}
              </p>
              <p>
                <strong>League:</strong> {player.league}
              </p>
              <button
                className="delete-team-player-button"
                onClick={() => onDeleteTeamPlayer(player.playerId)}
                style={{ backgroundColor: "red", color: "white" }}
              >
                Delete
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default TeamPlayers;
