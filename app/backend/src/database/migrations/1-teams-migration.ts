import { DataTypes, Model, QueryInterface } from 'sequelize';
import ITeam from '../../Interfaces/ITeams';

export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.createTable<Model<ITeam>>('teams', {
      id: {
        primaryKey: true,
        unique: true,
        allowNull: false,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      },
      teamName: {
        unique: true,
        allowNull: false,
        type: DataTypes.STRING,
        field: "team_name"
      }
    }
    );
  },
  down(queryInterface: QueryInterface){
    return queryInterface.dropTable('teams')
  }
};
