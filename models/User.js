const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");

const User = sequelize.define("User", {
  user_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  role: {
    type: DataTypes.ENUM("salesperson", "administrator"),
    allowNull: false,
  },
  creation_date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
});

module.exports = User;
