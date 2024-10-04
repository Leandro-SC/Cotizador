function loadQuotations() {
  document.getElementById("main-content").innerHTML = `
      <h2>Cotizaciones</h2>
      <button class="btn btn-primary mb-3" onclick="showQuotationForm()">Nueva Cotización</button>
      <table class="table">
          <thead>
              <tr>
                  <th>Número</th>
                  <th>Cliente</th>
                  <th>Monto</th>
                  <th>Descuento</th>
                  <th>Estado</th>
                  <th>Acciones</th>
              </tr>
          </thead>
          <tbody id="quotations-table-body">
              <!-- Quotations will be loaded here -->
          </tbody>
      </table>
  `;
  loadQuotationsData();
}

async function loadQuotationsData() {
  try {
    const quotations = await fetchQuotations();
    const tbody = document.getElementById("quotations-table-body");
    tbody.innerHTML = "";
    quotations.forEach((quotation) => {
      const row = `<tr>
              <td>${quotation.quotation_id}</td>
              <td>${quotation.lead_id}</td>
              <td>S/ ${quotation.amount}</td>
              <td>S/ ${quotation.discount}</td>
              <td>${quotation.approved ? "Aprobada" : "Pendiente"}</td>
              <td>
                  <button class="btn btn-info btn-sm" onclick="showEditQuotationForm(${
                    quotation.quotation_id
                  })">Editar</button>
                  <button class="btn btn-primary btn-sm" onclick="generateQuotationPDF(${
                    quotation.quotation_id
                  })">Descargar PDF</button>
                  <button class="btn btn-success btn-sm" onclick="approveDiscount(${
                    quotation.quotation_id
                  })">Aprobar</button>
                  <button class="btn btn-danger btn-sm" onclick="rejectDiscount(${
                    quotation.quotation_id
                  })">Rechazar</button>
              </td>
          </tr>`;
      tbody.innerHTML += row;
    });
  } catch (error) {
    console.error("Error loading quotations:", error);
  }
}

function showEditQuotationForm(quotationId) {
  document.getElementById("main-content").innerHTML = `
      <h2>Editar Cotización</h2>
      <form id="edit-quotation-form">
          <div class="form-group">
              <label for="quotation-amount">Monto</label>
              <input type="number" class="form-control" id="quotation-amount" required>
          </div>
          <div class="form-group">
              <label for="quotation-discount">Descuento</label>
              <input type="number" class="form-control" id="quotation-discount" required>
          </div>
          <div class="form-group">
              <label for="quotation-date">Fecha</label>
              <input type="date" class="form-control" id="quotation-date" required>
          </div>
          <button type="submit" class="btn btn-primary">Guardar</button>
      </form>
  `;

  document
    .getElementById("edit-quotation-form")
    .addEventListener("submit", async (e) => {
      e.preventDefault();

      const quotationData = {
        amount: document.getElementById("quotation-amount").value,
        discount: document.getElementById("quotation-discount").value,
        quotation_date: document.getElementById("quotation-date").value,
      };

      await updateQuotation(quotationId, quotationData);
      loadQuotations();
    });
}

// Función para cargar las cotizaciones del vendedor
function loadSalespersonQuotations() {
  document.getElementById("main-content").innerHTML = `
      <h2>Mis Cotizaciones</h2>
      <table class="table">
          <thead>
              <tr>
                  <th>Número</th>
                  <th>Cliente</th>
                  <th>Monto</th>
                  <th>Descuento</th>
                  <th>Estado</th>
                  <th>Acciones</th>
              </tr>
          </thead>
          <tbody id="salesperson-quotations-table-body">
              <!-- Cotizaciones del vendedor se cargarán aquí -->
          </tbody>
      </table>
  `;
  loadSalespersonQuotationsData();
}

// Función para obtener las cotizaciones del vendedor
async function loadSalespersonQuotationsData() {
  try {
    const response = await fetch(`${API_URL}/quotations/salesperson`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    const quotations = await response.json();
    const tbody = document.getElementById("salesperson-quotations-table-body");
    tbody.innerHTML = "";
    quotations.forEach((quotation) => {
      const row = `<tr>
              <td>${quotation.quotation_id}</td>
              <td>${quotation.lead_id}</td>
              <td>S/ ${quotation.amount}</td>
              <td>S/ ${quotation.discount}</td>
              <td>${quotation.approved ? "Aprobada" : "Pendiente"}</td>
              <td>
                  <button class="btn btn-primary btn-sm" onclick="generateQuotationPDF(${
                    quotation.quotation_id
                  })">Descargar PDF</button>
              </td>
          </tr>`;
      tbody.innerHTML += row;
    });
  } catch (error) {
    console.error("Error al cargar cotizaciones del vendedor:", error);
  }
}

function showQuotationForm() {
  document.getElementById("main-content").innerHTML = `
      <h2>Nueva Cotización</h2>
      <form id="quotation-form">
          <div class="form-group">
              <label for="lead-id">ID del Cliente</label>
              <input type="text" class="form-control" id="lead-id" required>
          </div>
          <div class="form-group">
              <label for="quotation-amount">Monto</label>
              <input type="number" class="form-control" id="quotation-amount" required>
          </div>
          <div class="form-group">
              <label for="quotation-discount">Descuento</label>
              <input type="number" class="form-control" id="quotation-discount">
          </div>
          <div class="form-group">
              <label for="quotation-date">Fecha de Cotización</label>
              <input type="date" class="form-control" id="quotation-date" required>
          </div>
          <button type="submit" class="btn btn-primary">Guardar Cotización</button>
      </form>
  `;

  // Asignar el evento 'submit' para el formulario
  document
    .getElementById("quotation-form")
    .addEventListener("submit", async (e) => {
      e.preventDefault();

      // Recopilar datos del formulario
      const quotationData = {
        lead_id: document.getElementById("lead-id").value,
        amount: document.getElementById("quotation-amount").value,
        discount: document.getElementById("quotation-discount").value || 0,
        quotation_date: document.getElementById("quotation-date").value,
      };

      // Llamar a la función para crear la cotización
      await createQuotation(quotationData);
      loadQuotations(); // Recargar la lista de cotizaciones
    });
}
