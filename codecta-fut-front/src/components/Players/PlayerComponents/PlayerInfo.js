import React from "react";
import axios from "axios";
import "./PlayerInfo.css";
import API_URL from "../../../services/endpoints";

const PlayerInfo = ({ players, updatePlayerData, setEditingPlayer }) => {
  const deleteApiUrl = API_URL.DELETE_API;

  const handleDelete = async (playerId) => {
    console.log("Deleting player with ID:", playerId);

    const updatedPlayers = players.filter(
      (player) => player.playerId.S !== playerId
    );

    try {
      await axios.delete(`${deleteApiUrl}/${playerId}`);
      console.log("Player successfully deleted.");

      updatePlayerData(updatedPlayers);
    } catch (error) {
      console.error("Error deleting player:", error);
    }
  };

  /* const handleEdit = (playerId) => {
    const playerToEdit = players.find(
      (player) => player.playerId.S === playerId
    );
    setEditingPlayer(playerToEdit);
  };*/

  return (
    <div className="player-cards">
      {players.map((player, index) => {
        return (
          <div key={index} className="player-card">
            <h3 className="player-name">{player.name && player.name.S}</h3>
            <p>
              <b>Nationality:</b> {player.nationality && player.nationality.S}
            </p>
            <p>
              <b>League: </b>
              {player.league && player.league.S}
            </p>
            <p>
              <b>Club:</b> {player.club && player.club.S}
            </p>

            <button
              className="delete-button"
              onClick={() => handleDelete(player.playerId.S)}
            >
              <i className="fa-solid fa-trash"></i>
            </button>
            <button
              className="edit-button"
              /* onClick={() => handleEdit(player.playerId && player.playerId.S)}*/
            >
              <i className="fa-solid fa-pen-to-square"></i>
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default PlayerInfo;
