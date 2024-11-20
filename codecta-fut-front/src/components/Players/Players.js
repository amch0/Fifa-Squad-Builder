import PlayerInfo from "./PlayerComponents/PlayerInfo";
import PlayerForm from "./PlayerComponents/PlayerForm";
import React, { useState, useEffect } from "react";
import axios from "axios";
import API_URL from "../../services/endpoints";
import "./Players.css";

const Players = () => {
  const getAllApiUrl = API_URL.GET_ALL_API;
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  const updatePlayerData = async () => {
    try {
      const response = await axios.get(getAllApiUrl);
      setPlayers(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(getAllApiUrl);
        setPlayers(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [getAllApiUrl]);

  return (
    <div className="players">
      {loading && <div className="loader"></div>}
      {!loading && (
        <>
          <PlayerForm updatePlayerData={updatePlayerData} />
          <PlayerInfo players={players} updatePlayerData={updatePlayerData} />
        </>
      )}
    </div>
  );
};

export default Players;
