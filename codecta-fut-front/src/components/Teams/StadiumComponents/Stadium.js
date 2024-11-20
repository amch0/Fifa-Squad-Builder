import React, { useState } from "react";
import "./Stadium.css";
import axios from "axios";
import dressImage from "../../../assets/dress.png";
import API_URL from "../../../services/endpoints";

const Stadium = ({ teams }) => {
  // eslint-disable-next-line
  const [selectedTeamId, setSelectedTeamId] = useState("");
  const [selectedTeam, setSelectedTeam] = useState(null);

  const handleTeamChange = async (e) => {
    const teamId = e.target.value;
    setSelectedTeamId(teamId);

    try {
      const response = await axios.get(`${API_URL.TEAM_API}/${teamId}`);
      const teamData = response.data;
      console.log(teamData);
      setSelectedTeam(teamData);
    } catch (error) {
      console.error("Error fetching team:", error);
    }
  };

  return (
    <div className="stadium-wrapper">
      <div className="stadium">
        {selectedTeam &&
        selectedTeam.teamPlayers &&
        selectedTeam.teamPlayers.length > 0 ? (
          <div className="team-chemistry">
            <p>Team Chemistry: {selectedTeam.teamChemistry || 0}/33</p>
          </div>
        ) : (
          <p></p>
        )}
        {selectedTeam &&
          selectedTeam.teamPlayers &&
          selectedTeam.teamPlayers.length > 0 && (
            <div className="players-grid">
              <div className="attacker">
                {selectedTeam.teamPlayers.slice(0, 3).map((player) => (
                  <div key={player.playerId} className="player">
                    <img src={dressImage} alt={player.name || "Player Name"} />
                    <p>{player.name || "Player Name"}</p>

                    <div className="player-info-box">
                      <p>Name: {player.name || "N/A"}</p>
                      <p>Nationality: {player.nationality || "N/A"}</p>
                      <p>League: {player.league || "N/A"}</p>
                      <p>Club: {player.club || "N/A"}</p>
                      <p>Player Chemistry: {player.playerChemistry || 0}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="midfield">
                {selectedTeam.teamPlayers.slice(3, 7).map((player) => (
                  <div key={player.playerId} className="player">
                    <img src={dressImage} alt={player.name || "Player Name"} />
                    <p>{player.name || "Player Name"}</p>

                    <div className="player-info-box">
                      <p>Name: {player.name || "N/A"}</p>
                      <p>Nationality: {player.nationality || "N/A"}</p>
                      <p>League: {player.league || "N/A"}</p>
                      <p>Club: {player.club || "N/A"}</p>
                      <p>Player Chemistry: {player.playerChemistry || 0}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="defense">
                {selectedTeam.teamPlayers.slice(7, 12).map((player) => (
                  <div key={player.playerId} className="player">
                    <img src={dressImage} alt={player.name} />
                    <p>{player.name}</p>

                    <div className="player-info-box">
                      <p>Name: {player.name || "N/A"}</p>
                      <p>Nationality: {player.nationality || "N/A"}</p>
                      <p>League: {player.league || "N/A"}</p>
                      <p>Club: {player.club || "N/A"}</p>
                      <p>Player Chemistry: {player.playerChemistry || 0}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
      </div>
      <div className="sidebar">
        <select className="select-stadium" onChange={handleTeamChange}>
          <option value="">Select Team</option>
          {teams &&
            teams.map((team, index) => (
              <option key={index} value={team.teamId && team.teamId.S}>
                {team.name && team.name.S}
              </option>
            ))}
        </select>
      </div>
    </div>
  );
};

export default Stadium;
