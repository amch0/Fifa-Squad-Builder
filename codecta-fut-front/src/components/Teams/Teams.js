import React, { useState, useEffect } from "react";
import axios from "axios";
import API_URL from "../../services/endpoints";
import TeamInfo from "./TeamComponents/TeamInfo";
import TeamForm from "./TeamComponents/TeamFrom";
import TeamPlayersModal from "./TeamComponents/TeamPlayersModal"; // Corrected the import statement
import Stadium from "./StadiumComponents/Stadium";
import "./Teams.css";

const Teams = () => {
  const getAllTeamsApiUrl = API_URL.GET_ALL_TEAMS_API;
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  const updateTeamData = async () => {
    try {
      const teamsResponse = await axios.get(getAllTeamsApiUrl);
      setTeams((prevTeams) => teamsResponse.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const fetchData = async () => {
    try {
      await updateTeamData();
    } catch (error) {
      console.error("Error fetching teams:", error);
    }
  };
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  const handleTeamClick = async (teamId) => {
    try {
      const response = await axios.get(`${API_URL.TEAM_API}/${teamId}`);
      const clickedTeam = response.data;

      console.log("Team data fetched successfully:", clickedTeam);

      setSelectedTeam((prevSelectedTeam) => {
        setSelectedPlayer(null);
        console.log("Selected team:", prevSelectedTeam);
        return clickedTeam;
      });
    } catch (error) {
      console.error("Error fetching team:", error);
    }
  };
  const handleDeleteTeamPlayer = async (playerId) => {
    try {
      console.log("Deleting player with ID:", playerId);

      const response = await axios.delete(
        `${API_URL.TEAM_API}/${selectedTeam.teamId}/players/${playerId}`
      );
      handleTeamClick(selectedTeam.teamId);

      if (response.status === 200) {
        console.log("Player successfully deleted.");

        updateTeamData();
      } else {
        console.error(
          "Error deleting player. Unexpected response status:",
          response.status
        );
      }
    } catch (error) {
      console.error("Error deleting player:", error);
    }
  };

  return (
    <div className="teams">
      <h1 className="h1-teams">BUILD YOUR ULTIMATE TEAM</h1>
      {loading && <div className="loader"></div>}
      {!loading && (
        <>
          <div className="teams-container">
            <div className="teams-content">
              <div className="team-form-container">
                <TeamForm updateTeamData={updateTeamData} />
              </div>
              <TeamInfo
                teams={teams}
                updateTeamData={updateTeamData}
                onTeamClick={handleTeamClick}
              />
            </div>
          </div>
          <div className="stadium-container">
            <Stadium teams={teams} />
          </div>
          {selectedTeam && (
            <TeamPlayersModal
              teamName={selectedTeam.name}
              teamPlayers={selectedTeam.teamPlayers}
              onClose={() => setSelectedTeam(null)}
              selectedPlayer={selectedPlayer}
              selectedTeam={selectedTeam}
              updateTeamData={updateTeamData}
              onDeleteTeamPlayer={handleDeleteTeamPlayer}
              handleTeamClick={handleTeamClick}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Teams;
