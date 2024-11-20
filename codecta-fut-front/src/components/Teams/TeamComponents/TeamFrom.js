import React, { useState } from "react";
import axios from "axios";
import API_URL from "../../../services/endpoints";
import "./TeamForm.css";

const TeamForm = ({ updateTeamData }) => {
  const [teamName, setTeamName] = useState("");
  const postTeam = API_URL.TEAM_API;

  const handleNameChange = (e) => {
    setTeamName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (teamName) {
      try {
        const response = await axios.post(postTeam, { name: teamName });
        if (response.status === 200) {
          setTeamName("");
          updateTeamData();
        } else {
          console.error("Error sending data");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      alert("Please fill in the team name.");
    }
  };

  return (
    <div className="page-content">
      <div className="form-team-container">
        <form className="team-form" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="teamNameInput">Team Name:</label>
            <input
              type="text"
              value={teamName}
              onChange={handleNameChange}
              id="teamNameInput"
            />
          </div>
          <button className="submit-team-button" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default TeamForm;
