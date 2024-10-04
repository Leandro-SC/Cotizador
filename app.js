const express = require("express");
const app = express();
const sequelize = require("./config/db.config");
require("dotenv").config();

const userRoutes = require("./routes/user.routes");
const leadRoutes = require("./routes/lead.routes");
const procedureRoutes = require("./routes/procedure.routes");
const quotationRoutes = require("./routes/quotation.routes");
const discountRoutes = require("./routes/discount.routes");

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/leads", leadRoutes);
app.use("/api/procedures", procedureRoutes);
app.use("/api/quotations", quotationRoutes);
app.use("/api/discounts", discountRoutes);

sequelize
  .sync()
  .then(() => {
    console.log("Database connected and synchronized");
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });

module.exports = app;
