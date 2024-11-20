export function calculatePlayerChemistryScore(
  retrievedTeam,
  playerInformation
) {
  const nationChemistry = calculateChemistryNation(
    retrievedTeam,
    playerInformation.nationality
  );
  const clubChemistry = calculateChemistryClub(
    retrievedTeam,
    playerInformation.club
  );
  const leagueChemistry = calculateChemistryLeague(
    retrievedTeam,
    playerInformation.league
  );

  const total = clubChemistry + nationChemistry + leagueChemistry;
  if (total > 3) return 3;
  else return total;
}

export function calculateTeamChemistryScore(retrievedTeam) {
  let totalChemistry = 0;
  for (const teamPlayer of retrievedTeam.teamPlayers) {
    totalChemistry += calculatePlayerChemistryScore(retrievedTeam, teamPlayer);
  }
  return totalChemistry;
}

function calculateChemistryNation(retrievedTeam, club) {
  const sameNation = retrievedTeam.teamPlayers.filter(
    (teamPlayer) => teamPlayer.nationality === club
  );

  if (sameNation.length >= 8) {
    return 3;
  } else if (sameNation.length >= 5) {
    return 2;
  } else if (sameNation.length >= 2) {
    return 1;
  }

  return 0;
}
function calculateChemistryClub(retrievedTeam, club) {
  const sameClub = retrievedTeam.teamPlayers.filter(
    (teamPlayer) => teamPlayer.club === club
  );

  if (sameClub.length >= 7) {
    return 3;
  } else if (sameClub.length >= 4) {
    return 2;
  } else if (sameClub.length >= 2) {
    return 1;
  }

  return 0;
}

function calculateChemistryLeague(retrievedTeam, club) {
  const sameLeague = retrievedTeam.teamPlayers.filter(
    (teamPlayer) => teamPlayer.league === club
  );

  if (sameLeague.length >= 8) {
    return 3;
  } else if (sameLeague.length >= 5) {
    return 2;
  } else if (sameLeague.length >= 3) {
    return 1;
  }

  return 0;
}
