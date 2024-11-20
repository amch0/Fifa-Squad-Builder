import React, { useState, useEffect } from "react";
import { fetchNationalityNames } from "../../../services/api";
import "./PlayerForm.css";
import clubsData from "../../../leaguesandclubs.json";
import API_URL from "../../../services/endpoints";
import axios from "axios";

const PlayerForm = ({ updatePlayerData }) => {
  const postApiUrl = API_URL.POST_API;
  const [name, setPlayerName] = useState("");
  const [nationality, setNationalitys] = useState([]);
  const [selectedNationality, setSelectedNationality] = useState("");
  const [selectedLeague, setSelectedLeague] = useState("");
  const [selectedClub, setSelectedClub] = useState("");
  const [availableLeagues, setAvailableLeagues] = useState([]);
  const [availableClubs, setAvailableClubs] = useState([]);

  const fetchData = async () => {
    const data = await fetchNationalityNames();
    if (data) {
      setNationalitys(data.map((nationality) => nationality.name));
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchClubsData = (selectedLeague) => {
    const selected = clubsData.leagues.find(
      (league) => league.league_name === selectedLeague
    );
    if (selected) {
      setAvailableClubs(selected.clubs);
    }
  };

  useEffect(() => {
    if (clubsData && clubsData.leagues) {
      const leagues = clubsData.leagues.map((league) => league.league_name);

      setAvailableLeagues(leagues);
    }
  }, []);

  const handleNameChange = (e) => {
    setPlayerName(e.target.value);
  };

  const handleNationalityChange = (e) => {
    const nationality = e.target.value;
    setSelectedNationality(nationality);
  };

  const handleLeagueChange = (e) => {
    const league = e.target.value;
    setSelectedLeague(league);
    fetchClubsData(league);
    setSelectedClub("");
  };

  const handleClubChange = (e) => {
    setSelectedClub(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (name && selectedNationality && selectedLeague && selectedClub) {
      try {
        const response = await axios.post(
          postApiUrl,
          {
            name,
            nationality: selectedNationality,
            league: selectedLeague,
            club: selectedClub,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 200) {
          setPlayerName("");
          setSelectedNationality("");
          setSelectedLeague("");
          setSelectedClub("");
          updatePlayerData();
        } else {
          console.error("Error sending data");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      alert("Please fill in all fields.");
    }
  };

  return (
    <div className="form-container">
      <h1>CREATE A PLAYER FOR FIFA ULTIMATE TEAM</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nameInput">Player's Name:</label>
          <input
            type="text"
            value={name}
            onChange={handleNameChange}
            id="nameInput"
          />
        </div>
        <div>
          <label htmlFor="nationalitySelect">Select a nationality:</label>
          <select
            value={selectedNationality}
            onChange={handleNationalityChange}
            id="nationalitySelect"
          >
            <option value="">Select a nationality</option>
            {nationality.map((nationality, index) => (
              <option key={index} value={nationality}>
                {nationality}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="leagueSelect">Select a league:</label>
          <select
            value={selectedLeague}
            onChange={handleLeagueChange}
            id="leagueSelect"
          >
            <option value="">Select a league</option>
            {availableLeagues.map((league, index) => (
              <option key={index} value={league}>
                {league}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="clubSelect">Select a club:</label>
          <select
            value={selectedClub}
            onChange={handleClubChange}
            id="clubSelect"
          >
            <option value="">Select a club</option>
            {availableClubs.map((club, index) => (
              <option key={index} value={club}>
                {club}
              </option>
            ))}
          </select>
        </div>
        <button className="submit-button" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default PlayerForm;
