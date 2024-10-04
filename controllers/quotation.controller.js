const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");
const moment = require("moment");
const Quotation = require("../models/Quotation");
const ProcedureDetail = require("../models/ProcedureDetail");

exports.generateQuotationPDF = async (req, res) => {
  try {
    const { quotation_id } = req.params;

    // Obtener los datos de la cotización y sus detalles
    const quotation = await Quotation.findOne({
      where: { quotation_id },
      include: [{ model: ProcedureDetail }],
    });

    if (!quotation) {
      return res.status(404).json({ message: "Cotización no encontrada" });
    }

    // Crear un nuevo documento PDF
    const doc = new PDFDocument({ size: "A4", margin: 50 });
    const pdfPath = path.join(
      __dirname,
      `../pdfs/cotizacion_${quotation_id}.pdf`
    );
    doc.pipe(fs.createWriteStream(pdfPath));

    // Cabecera del documento
    doc.image("path/to/logo.png", 50, 45, { width: 100 }); // Cambia la ruta por la ruta correcta del logo
    doc.fontSize(20).text(`COTIZACIÓN Nº ${quotation_id}`, 200, 50);

    // Datos del cliente
    doc.fontSize(10).text(`NOMBRE: ${quotation.Lead.name}`, 50, 120);
    doc.text(`DOCUMENTO: ${quotation.Lead.document}`, 50, 135);
    doc.text(`DIRECCIÓN: ${quotation.Lead.address}`, 50, 150);
    doc.text(`DISTRITO: ${quotation.Lead.district}`, 50, 165);
    doc.text(`TELÉFONO: ${quotation.Lead.phone}`, 50, 180);
    doc.text(`DIAGNÓSTICO: ${quotation.Lead.diagnosis}`, 50, 195);
    doc.text(`TIPO DE CIRUGÍA: ${quotation.Lead.surgery_type}`, 50, 210);
    doc.text(
      `FECHA PRESUPUESTO: ${moment(quotation.quotation_date).format(
        "DD/MM/YYYY"
      )}`,
      50,
      225
    );
    doc.text(`ASESOR: ${quotation.Lead.advisor}`, 50, 240);
    doc.text(`TELÉFONO ASESOR: ${quotation.Lead.advisor_phone}`, 50, 255);

    // Línea divisoria
    doc.moveTo(50, 270).lineTo(550, 270).stroke();

    // Tabla de detalles de procedimientos
    doc.fontSize(10).text("DESCRIPCIÓN", 50, 280);
    doc.text("UNIDADES", 250, 280);
    doc.text("PRECIO", 300, 280);
    doc.text("DTO.", 350, 280);
    doc.text("TOTAL", 400, 280);

    let y = 300;
    quotation.ProcedureDetails.forEach((detail) => {
      doc.text(detail.description, 50, y);
      doc.text(detail.units, 250, y);
      doc.text(`S/ ${detail.price.toFixed(2)}`, 300, y);
      doc.text(`S/ ${detail.discount.toFixed(2)}`, 350, y);
      doc.text(`S/ ${detail.total.toFixed(2)}`, 400, y);
      y += 20;
    });

    // Subtotal, descuento, y total
    doc.text(`SUB TOTAL: S/ ${quotation.amount.toFixed(2)}`, 300, y + 20);
    doc.text(`DESCUENTO: S/ ${quotation.discount.toFixed(2)}`, 300, y + 40);
    doc.text(
      `TOTAL: S/ ${(quotation.amount - quotation.discount).toFixed(2)}`,
      300,
      y + 60
    );

    // Línea divisoria antes del total
    doc
      .moveTo(50, y + 80)
      .lineTo(550, y + 80)
      .stroke();
    doc
      .fontSize(12)
      .text(
        `TOTAL PRESUPUESTO: S/ ${(
          quotation.amount - quotation.discount
        ).toFixed(2)}`,
        50,
        y + 100,
        { align: "right" }
      );

    // Sección de forma de pago y firma
    doc.text("Forma de pago: ___________________________", 50, y + 140);
    doc.text("Firma: _________________________________", 350, y + 140);
    doc.text(`ACEPTO EL PRESUPUESTO`, 350, y + 160);

    // Finalizar el documento
    doc.end();

    // Enviar el PDF generado como respuesta
    res.download(pdfPath, `cotizacion_${quotation_id}.pdf`);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const Quotation = require("../models/Quotation");
const ProcedureDetail = require("../models/ProcedureDetail"); // Importar los modelos relacionados

// Actualizar una cotización existente
exports.updateQuotation = async (req, res) => {
  try {
    const { quotation_id } = req.params;
    const { amount, discount, quotation_date, payment_method, detail } =
      req.body;

    // Buscar la cotización existente
    const quotation = await Quotation.findByPk(quotation_id);
    if (!quotation) {
      return res.status(404).json({ message: "Cotización no encontrada" });
    }

    // Actualizar los datos de la cotización
    quotation.amount = amount || quotation.amount;
    quotation.discount = discount || quotation.discount;
    quotation.quotation_date = quotation_date || quotation.quotation_date;
    quotation.payment_method = payment_method || quotation.payment_method;
    quotation.detail = detail || quotation.detail;
    await quotation.save();

    res
      .status(200)
      .json({ message: "Cotización actualizada exitosamente", quotation });
  } catch (error) {
    res.status(500).json({
      message: "Error al actualizar la cotización",
      error: error.message,
    });
  }
};

const Quotation = require("../models/Quotation");
const User = require("../models/User");

// Obtener cotizaciones por vendedor
exports.getQuotationsBySalesperson = async (req, res) => {
  try {
    const userId = req.user.userId; // El userId proviene del token JWT

    // Verificar si el usuario es un vendedor
    const user = await User.findByPk(userId);
    if (user.role !== "salesperson") {
      return res.status(403).json({ message: "Acceso denegado" });
    }

    // Obtener cotizaciones del vendedor
    const quotations = await Quotation.findAll({
      where: { salesperson_id: userId },
    });
    res.status(200).json(quotations);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener cotizaciones", error: error.message });
  }
};

const Quotation = require("../models/Quotation");

exports.createQuotation = async (req, res) => {
  try {
    const { lead_id, amount, discount, quotation_date } = req.body;

    // Crear la nueva cotización
    const newQuotation = await Quotation.create({
      lead_id,
      amount,
      discount,
      quotation_date,
    });

    res.status(201).json(newQuotation);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al crear la cotización", error: error.message });
  }
};
