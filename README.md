fut-squadBilder

fut-squadBilder is a web application allowing users to create and optimize sports teams based on club, league, and nationality criteria, inspired by FIFA 23’s chemistry system. This project utilizes React for the frontend and Node.js (AWS Lambda) for the backend, with data stored in DynamoDB.

Features

Database Structure (DynamoDB)

	•	Players Table: Contains player data including name, club, league, nationality, and individual ChemistryScore.
	•	Teams Table: Stores team names, lists of player IDs, and the overall team ChemistryScore.

Chemistry Rules

Chemistry is calculated based on shared club, nationality, and league among players, using a FIFA 23-like model:

	•	Club Chemistry: 1 point for 2 players, 2 points for 4 players, 3 points for 7 players.
	•	Nationality Chemistry: 1 point for 2 players, 2 points for 5 players, 3 points for 8 players.
	•	League Chemistry: 1 point for 3 players, 2 points for 5 players, 3 points for 8 players.
	•	These scores combine to create the team’s final ChemistryScore.

Frontend (React)

	•	Player Management: Users can create players by entering attributes like name, club, nationality, and league.
	•	Team Management: Users can create teams, assign players, and view chemistry scores.

Backend (AWS Lambda)

	•	AWS Lambda functions handle player data retrieval, team chemistry calculations, and data storage in DynamoDB.
Note: This project cannot be fully executed locally as it relies on AWS services (DynamoDB and AWS Lambda). You will need to set up the necessary AWS configurations using Terraform to run the backend components. The repository does not include the Terraform configuration files, so they will need to be created separately to deploy the infrastructure on AWS.
