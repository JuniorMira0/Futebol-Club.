export interface IMatches {
  homeTeam: number,
  awayTeam: number,
  homeTeamGoals: number,
  awayTeamGoals: number,
  inProgress?: boolean
}

export interface IMatchMock {
  id: number,
  homeTeam: number,
  awayTeam: number,
  homeTeamGoals: number,
  awayTeamGoals: number,
  inProgress?: boolean,
  teamHome?: {
    teamName: string,
  },
  teamAway?: {
    teamName: string,
  }
}
