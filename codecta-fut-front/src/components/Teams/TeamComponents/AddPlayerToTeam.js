import React, { useState, useEffect } from "react";
import axios from "axios";
import API_URL from "../../../services/endpoints";
import "./AddPlayerToTeam.css";

const AddPlayerToTeam = ({ selectedTeam, updateTeamData, handleTeamClick }) => {
  const [allPlayers, setAllPlayers] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState("");
  const [error, setError] = useState("");

  const fetchAllPlayers = async () => {
    try {
      const response = await axios.get(API_URL.GET_ALL_API);
      setAllPlayers(response.data);
    } catch (error) {
      console.error("Error fetching players:", error);
      setError("Error fetching players");
    }
  };
  useEffect(() => {
    fetchAllPlayers();
  }, []);

  const handleAddPlayer = async () => {
    if (!selectedTeam || !selectedTeam.teamId) {
      console.error("Selected team or teamId is not available.");
      setError("Selected team or teamId is not available.");
      return;
    }
    if (selectedTeam.teamPlayers && selectedTeam.teamPlayers.length >= 11) {
      setError("Team already has 11 players.");
      return;
    }

    try {
      const teamId = selectedTeam.teamId;
      await axios.patch(
        `${API_URL.TEAM_API}/${teamId}/players/${selectedPlayer}`
      );

      handleTeamClick(teamId);
      setSelectedPlayer("");

      setError("");
    } catch (error) {
      console.error("Error adding player to team:", error);
      setError("Error adding player to team");
    }
  };

  return (
    <div className="add-player-container">
      <h4 className="add-players-title">Add Player to Team</h4>
      <div className="add-player-dropdown-container">
        <select
          value={selectedPlayer}
          onChange={(e) => setSelectedPlayer(e.target.value)}
        >
          <option value="" disabled>
            Select a Player
          </option>
          {allPlayers.map((player) => (
            <option key={player.playerId.S} value={player.playerId.S}>
              {player.name.S}
            </option>
          ))}
        </select>
      </div>

      <button className="add-player-button" onClick={handleAddPlayer}>
        Add Player
      </button>

      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default AddPlayerToTeam;
