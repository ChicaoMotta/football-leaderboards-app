import {
  InferAttributes,
  InferCreationAttributes,
  Model,
  DataTypes,
  CreationOptional,
} from 'sequelize';
import db from './index';
import Team from './teams.models';

export default class Matches extends Model<
InferAttributes<Matches>,
InferCreationAttributes<Matches>> {
  declare id: CreationOptional<number>;
  declare homeTeamId: number;
  declare homeTeamGoals: number;
  declare awayTeamId: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}

Matches.init(
  { id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  homeTeamId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'home_team_id',
    // references: {
    //   model: Team,
    //   key: 'id',
    // },
  },
  homeTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'home_team_goals',
  },
  awayTeamId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'away_team_id',
    // references: {
    //   model: Team,
    //   key: 'id',
    // },
  },
  awayTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'away_team_goals',
  },
  inProgress: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    field: 'in_progress',
  },
  },
  {
    sequelize: db,
    timestamps: false,
    underscored: true,
    tableName: 'matches',
  },
);

Matches.belongsTo(Team, { as: 'homeTeam',
  foreignKey: 'homeTeamId',
});
Matches.belongsTo(Team, { as: 'awayTeam',
  foreignKey: 'awayTeamId',
});

// Team.hasMany(Matches);

// Matches.belongsTo(Team, { as: 'homeTeam', foreignKey: 'home_team_id' });
// Matches.belongsTo(Team, { as: 'awayTeam', foreignKey: 'away_team_id' });
