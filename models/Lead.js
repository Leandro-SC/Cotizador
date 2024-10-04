const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");

const Lead = sequelize.define("Lead", {
  lead_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  code: { type: DataTypes.STRING, allowNull: false },
  name: { type: DataTypes.STRING, allowNull: false },
  document_type: {
    type: DataTypes.ENUM("DNI", "Passport", "Other"),
    allowNull: false,
  },
  document: { type: DataTypes.STRING, allowNull: false },
  district: { type: DataTypes.STRING },
  address: { type: DataTypes.TEXT },
  phone: { type: DataTypes.STRING },
  source: { type: DataTypes.STRING },
  surgeries: { type: DataTypes.TEXT },
  surgery_type: { type: DataTypes.STRING },
  advisor: { type: DataTypes.STRING },
  date: { type: DataTypes.DATE, allowNull: false },
  season: { type: DataTypes.STRING },
  payment_method: { type: DataTypes.STRING },
  diagnosis: { type: DataTypes.TEXT },
  creation_date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
});

module.exports = Lead;
