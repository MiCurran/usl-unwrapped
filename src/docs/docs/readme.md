### GraphQL example queries

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