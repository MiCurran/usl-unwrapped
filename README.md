# USL Unwrapped API

Welcome to the USL Unwrapped API repository! This API provides access to match, player, and team statistics from the USL soccer league. Below, you'll find information on how to set up and use this API for your development and testing needs.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [Clone the Repository](#clone-the-repository)
  - [Set Up the Development Database](#set-up-the-development-database)
  - [Install Dependencies](#install-dependencies)
  - [Run the Application](#run-the-application)
  - [Testing](#testing)
- [API Documentation](#api-documentation)
  - [GraphQL](#GraphQL-example-queries)

## Prerequisites

Before you get started, make sure you have the following prerequisites installed on your system:

- [Docker](https://www.docker.com/get-started)
- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

## Getting Started

### Clone the Repository

```bash
git clone <repository-url>
cd usl-unwrapped-api
```  

### Set Up the Development Database
This project uses PostgreSQL as its database. To set up a PostgreSQL development database, you can use Docker Compose. Here's a docker-compose.yml file that you can use:

```yaml

version: '3.8'
services:
  uslunwrapped_dev_db:
    image: postgres:14
    container_name: uslunwrapped_dev_db
    ports:
      - 5432:5432
    volumes:
      - postgres:/var/lib/postgresql/data
    environment:
      - POSTGRES_PASSWORD=<your-password>
      - POSTGRES_USER=<your-username>
      - POSTGRES_DB=<your-database-name>
    networks:
      - usl

volumes:
  postgres:
    name: usl

networks:
  usl:
```
Copy the example env file to get started quickly. 
```bash
cp .env.example .env
```

Install Dependencies

```bash
npm install
```  

Then, run the following command to start the database container:

```bash
# Starts dev db container - migrates schema then seeds db
npm run db:dev:init
```  

### Run the Application

```bash
npm run start:dev
```  
### Testing
To run tests for the API, you can use the following command:

```bash
# Run either
npm test
# Or
npm test:watch
```

Your API should now be running locally at http://localhost:3000.

## API Documentation
The API documentation is available through Swagger UI. You can access it by navigating to http://localhost:3000/api-docs in your web browser.

<br><br>  

## GraphQL example queries
<hr>  

```http
# Default graphql endpoint
http://localhost:3000/graphql
```

```graphql
#query all usl teams and get id's
query {
  uslTeams {
    name
    id
  	conference
  }
  }
```

```graphql
#query all matches
query {
  matches {
    id
    homeTeamId
    awayTeamId
    score
    stats {
      ... on Stats {
        GENERAL_STATS {
          home {
            Possession
            Duels_Success_Rate
            Ariel_Duels_Won
            Interceptions
            Offsides
            Corners_Won
          }
          away {
            Possession
            Duels_Success_Rate
            Ariel_Duels_Won
            Interceptions
            Offsides
            Corners_Won
          }
        }
        DISTRIBUTION_STATS {
          home {
            Passes
            Long_Passes
            Passing_Accuracy
            Passing_Accuracy_In_Opponent_Half
            Crosses
            Crossing_Accuracy
          }
          away {
            Passes
            Long_Passes
            Passing_Accuracy
            Passing_Accuracy_In_Opponent_Half
            Crosses
            Crossing_Accuracy
          }
        }
      }
    }
  }
}
```
```graphql
# Query match by match id
query {
  match(id: 10) {
    id
    homeTeamId
    awayTeamId
    score
    stats {
      ... on Stats {
        GENERAL_STATS {
          home {
            Possession
            Duels_Success_Rate
            Ariel_Duels_Won
            Interceptions
            Offsides
            Corners_Won
          }
          away {
            Possession
            Duels_Success_Rate
            Ariel_Duels_Won
            Interceptions
            Offsides
            Corners_Won
          }
        }
        DISTRIBUTION_STATS {
          home {
            Passes
            Long_Passes
            Passing_Accuracy
            Passing_Accuracy_In_Opponent_Half
            Crosses
            Crossing_Accuracy
          }
          away {
            Passes
            Long_Passes
            Passing_Accuracy
            Passing_Accuracy_In_Opponent_Half
            Crosses
            Crossing_Accuracy
          }
        }
      }
    }
  }
}
```

```graphql
# matches by team
query {
  matchesByTeam(teamId: 18) {
    id
    homeTeamId
    awayTeamId
    score
    stats {
      ... on Stats {
        GENERAL_STATS {
          home {
            Possession
            Duels_Success_Rate
            Ariel_Duels_Won
            Interceptions
            Offsides
            Corners_Won
          }
          away {
            Possession
            Duels_Success_Rate
            Ariel_Duels_Won
            Interceptions
            Offsides
            Corners_Won
          }
        }
        DISTRIBUTION_STATS {
          home {
            Passes
            Long_Passes
            Passing_Accuracy
            Passing_Accuracy_In_Opponent_Half
            Crosses
            Crossing_Accuracy
          }
          away {
            Passes
            Long_Passes
            Passing_Accuracy
            Passing_Accuracy_In_Opponent_Half
            Crosses
            Crossing_Accuracy
          }
        }
      }
    }
  }
}
```

```graphql
# Query single match events
query {
  singleMatchEvents(id: 11) {
    id
  	events {
      time
      event
    }
  }
  }
```