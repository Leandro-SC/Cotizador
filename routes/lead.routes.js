const express = require("express");
const router = express.Router();
const leadController = require("../controllers/lead.controller");
const { authenticate, authorize } = require("../middleware/auth");

router.post(
  "/create",
  authenticate,
  authorize(["salesperson", "administrator"]),
  leadController.createLead
);
router.get(
  "/",
  authenticate,
  authorize(["salesperson", "administrator"]),
  leadController.getAllLeads
);
router.get(
  "/:lead_id",
  authenticate,
  authorize(["salesperson", "administrator"]),
  leadController.getLeadById
);

module.exports = router;
