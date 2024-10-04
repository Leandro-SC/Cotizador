const express = require("express");
const router = express.Router();
const quotationController = require("../controllers/quotation.controller");
const { authenticate, authorize } = require("../middleware/auth");

router.post(
  "/create",
  authenticate,
  authorize(["salesperson", "administrator"]),
  quotationController.createQuotation
);
router.get(
  "/pdf/:quotation_id",
  authenticate,
  authorize(["salesperson", "administrator"]),
  quotationController.generateQuotationPDF
);
router.put(
  "/update/:quotation_id",
  authenticate,
  authorize(["salesperson", "administrator"]),
  quotationController.updateQuotation
);

// Ruta para obtener las cotizaciones del vendedor
router.get(
  "/salesperson",
  authenticate,
  authorize(["salesperson"]),
  quotationController.getQuotationsBySalesperson
);

// Ruta para crear una nueva cotización
router.post(
  "/create",
  authenticate,
  authorize(["salesperson", "administrator"]),
  quotationController.createQuotation
);

module.exports = router;
