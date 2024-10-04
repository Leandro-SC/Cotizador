const Discount = require("../models/Discount");
const Quotation = require("../models/Quotation");

// Aprobar un descuento
exports.approveDiscount = async (req, res) => {
  try {
    const { discount_id } = req.params;

    // Buscar el descuento
    const discount = await Discount.findByPk(discount_id);
    if (!discount) {
      return res.status(404).json({ message: "Descuento no encontrado" });
    }

    // Aprobar el descuento y actualizar la cotización relacionada
    discount.status = "approved";
    discount.approval_date = new Date();
    await discount.save();

    // Actualizar la cotización con el monto del descuento aprobado
    const quotation = await Quotation.findByPk(discount.quotation_id);
    if (!quotation) {
      return res.status(404).json({ message: "Cotización no encontrada" });
    }

    quotation.discount = discount.discount_amount;
    await quotation.save();

    res
      .status(200)
      .json({
        message: "Descuento aprobado exitosamente",
        discount,
        quotation,
      });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al aprobar el descuento", error: error.message });
  }
};

// Rechazar un descuento
exports.rejectDiscount = async (req, res) => {
  try {
    const { discount_id } = req.params;

    // Buscar el descuento
    const discount = await Discount.findByPk(discount_id);
    if (!discount) {
      return res.status(404).json({ message: "Descuento no encontrado" });
    }

    // Rechazar el descuento
    discount.status = "rejected";
    discount.approval_date = new Date();
    await discount.save();

    res
      .status(200)
      .json({ message: "Descuento rechazado exitosamente", discount });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error al rechazar el descuento",
        error: error.message,
      });
  }
};
