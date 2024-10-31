fut-squadBilder

“Squad Builder” is a web application designed to help users build and optimize sports teams based on club, league, and nationality, emulating the chemistry system found in FIFA 23. Developed using React for the frontend and Node.js (AWS Lambda) for the backend, it integrates with a DynamoDB database to manage data.

Key Features:

	1.	DynamoDB Structure:
	•	Two tables, “Players” and “Teams,” store player and team information. The “Players” table includes player-specific details (name, club, league, nationality) and a ChemistryScore attribute. The “Teams” table holds team names, a list of player IDs, and the overall team chemistry score.
	2.	Chemistry Rules:
	•	Chemistry is calculated based on shared club, nationality, and league among team players, following FIFA 23’s model:
	•	Club: 1 point for 2 players, 2 points for 4, 3 points for 7.
	•	Nationality: 1 point for 2 players, 2 points for 5, 3 points for 8.
	•	League: 1 point for 3 players, 2 points for 5, 3 points for 8.
	•	These scores are combined for the team’s final ChemistryScore.
	3.	React Frontend:
	•	Users can create and manage players and teams, and view how chemistry changes with different player choices.
	4.	AWS Lambda Backend:
	•	AWS Lambda functions handle player data retrieval and chemistry calculations, bridging the frontend with DynamoDB.

For security, AWS configurations aren’t included in the repository, meaning full functionality requires setup on AWS.

