# FishHub : A modern web application for aquarists

*Note for the purpose of running this project the .env file has been included on the repository. This is note stamdard practice

To run this application Docker Engine and Docker Compose must be first installed.
Once installed simply run 'docker-compose build' in the root directory to build the application.
The application can then be controlled with 'docker-compose up' and 'docker compose-down' 
Or alterntaively it can be controlled by using Docker Desktop.

When running the application the Rfishbase API will take up to a minute to load the tables when performing the first search. Subsequent searches will be much faster.
