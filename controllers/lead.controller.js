const Lead = require("../models/Lead");

exports.createLead = async (req, res) => {
  try {
    const {
      code,
      name,
      document_type,
      document,
      district,
      address,
      phone,
      source,
      surgeries,
      surgery_type,
      advisor,
      date,
      season,
      payment_method,
      diagnosis,
    } = req.body;
    const lead = await Lead.create({
      code,
      name,
      document_type,
      document,
      district,
      address,
      phone,
      source,
      surgeries,
      surgery_type,
      advisor,
      date,
      season,
      payment_method,
      diagnosis,
    });
    res.status(201).json(lead);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllLeads = async (req, res) => {
  try {
    const leads = await Lead.findAll();
    res.status(200).json(leads);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getLeadById = async (req, res) => {
  try {
    const { lead_id } = req.params;
    const lead = await Lead.findByPk(lead_id);
    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }
    res.status(200).json(lead);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
