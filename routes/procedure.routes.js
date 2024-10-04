const express = require("express");
const router = express.Router();
const procedureController = require("../controllers/procedure.controller");
const { authenticate, authorize } = require("../middleware/auth");

router.post(
  "/create",
  authenticate,
  authorize(["administrator"]),
  procedureController.createProcedure
);
router.post(
  "/detail",
  authenticate,
  authorize(["administrator"]),
  procedureController.addProcedureDetail
);
router.get(
  "/",
  authenticate,
  authorize(["salesperson", "administrator"]),
  procedureController.getAllProcedures
);

module.exports = router;
