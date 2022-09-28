import { Model, STRING, NUMBER } from 'sequelize';
import db from '.';
import MatchesModel from './MatchesModel';

class team extends Model {
  id: number;
  teamName: string;
}

team.init({
  id: {
    type: NUMBER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  teamName: {
    type: STRING,
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'teams',
  timestamps: false,
  underscored: true,
});

MatchesModel.belongsTo(team, {
  as: 'teamHome',
  foreignKey: 'home_team',
});

MatchesModel.belongsTo(team, {
  as: 'teamAway',
  foreignKey: 'away_team',
});

export default team;
