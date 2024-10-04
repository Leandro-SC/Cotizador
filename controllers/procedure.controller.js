const Procedure = require("../models/Procedure");
const ProcedureDetail = require("../models/ProcedureDetail");

exports.createProcedure = async (req, res) => {
  try {
    const { description, process_area, season, price } = req.body;
    const procedure = await Procedure.create({
      description,
      process_area,
      season,
      price,
    });
    res.status(201).json(procedure);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addProcedureDetail = async (req, res) => {
  try {
    const { procedure_id, description, units, price, discount } = req.body;
    const total = price - discount;
    const procedureDetail = await ProcedureDetail.create({
      procedure_id,
      description,
      units,
      price,
      discount,
      total,
    });
    res.status(201).json(procedureDetail);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllProcedures = async (req, res) => {
  try {
    const procedures = await Procedure.findAll();
    res.status(200).json(procedures);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
