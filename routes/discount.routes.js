const express = require("express");
const router = express.Router();
const discountController = require("../controllers/discount.controller");
const { authenticate, authorize } = require("../middleware/auth");

router.post(
  "/request",
  authenticate,
  authorize(["salesperson"]),
  discountController.requestDiscount
);
router.post(
  "/approve/:discount_id",
  authenticate,
  authorize(["administrator"]),
  discountController.approveDiscount
);
router.post(
  "/reject/:discount_id",
  authenticate,
  authorize(["administrator"]),
  discountController.rejectDiscount
);

module.exports = router;
