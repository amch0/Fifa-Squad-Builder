import React, { useEffect } from "react";
import TeamPlayers from "./TeamPlayers";
import AddPlayerToTeam from "./AddPlayerToTeam";
import "./TeamPlayersModal.css";

const TeamPlayersModal = ({
  teamId,
  teamName,
  teamPlayers,
  onClose,
  updateTeamData,
  selectedTeam,
  selectedPlayer,
  onDeleteTeamPlayer,
  handleTeamClick,
}) => {
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (!e.target.closest(".team-players-content")) {
        onClose();
      }
    };

    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [onClose]);

  return (
    <div className="team-players-modal">
      <div className="team-players-header">
        <h2>{teamName}</h2>
      </div>
      <div className="team-players-content">
        <TeamPlayers
          teamPlayers={teamPlayers}
          onDeleteTeamPlayer={onDeleteTeamPlayer}
        />
        <AddPlayerToTeam
          teamId={teamId}
          updateTeamData={updateTeamData}
          selectedTeam={selectedTeam}
          selectedPlayer={selectedPlayer}
          handleTeamClick={handleTeamClick}
        />
      </div>
    </div>
  );
};

export default TeamPlayersModal;
