const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");
const Lead = require("./Lead"); // Importar Lead para la relación

const Quotation = sequelize.define("Quotation", {
  quotation_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  lead_id: {
    type: DataTypes.INTEGER,
    references: { model: Lead, key: "lead_id" },
    onDelete: "CASCADE",
  },
  amount: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  discount: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0.0 },
  approved: { type: DataTypes.BOOLEAN, defaultValue: false },
  quotation_date: { type: DataTypes.DATE, allowNull: false },
  season: { type: DataTypes.STRING },
  payment_method: { type: DataTypes.STRING },
  detail: { type: DataTypes.TEXT },
  creation_date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
});

// Establecer la relación con Lead
Quotation.belongsTo(Lead, { foreignKey: "lead_id" });

module.exports = Quotation;
