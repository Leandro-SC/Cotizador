const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");
const Quotation = require("./Quotation"); // Importar Quotation para la relación

const ProcedureDetail = sequelize.define("ProcedureDetail", {
  detail_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  quotation_id: {
    type: DataTypes.INTEGER,
    references: { model: Quotation, key: "quotation_id" },
    onDelete: "CASCADE",
  },
  description: { type: DataTypes.STRING, allowNull: false },
  units: { type: DataTypes.INTEGER, defaultValue: 1 },
  price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  discount: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0.0 },
  total: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
});

// Establecer la relación con Quotation
ProcedureDetail.belongsTo(Quotation, { foreignKey: "quotation_id" });

module.exports = ProcedureDetail;
