import {
  CreationOptional,
  DataTypes, InferAttributes, InferCreationAttributes, Model,
} from 'sequelize';
import db from './index';

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id: CreationOptional<number>;
  declare email: string;
  declare password: string;
  declare username: string;
  declare role: string;
}

User.init({
  id: {
    primaryKey: true,
    type: DataTypes.NUMBER,
    allowNull: false,
    autoIncrement: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize: db,
  timestamps: false,
  tableName: 'users',
});

export default User;
