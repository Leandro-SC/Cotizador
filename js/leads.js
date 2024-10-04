function loadLeads() {
  document.getElementById("main-content").innerHTML = `
      <h2>Leads</h2>
      <button class="btn btn-primary mb-3" onclick="showLeadForm()">Nuevo Lead</button>
      <table class="table">
          <thead>
              <tr>
                  <th>Código</th>
                  <th>Nombre</th>
                  <th>Documento</th>
                  <th>Distrito</th>
                  <th>Acciones</th>
              </tr>
          </thead>
          <tbody id="leads-table-body">
              <!-- Leads will be loaded here -->
          </tbody>
      </table>
  `;
  loadLeadsData();
}

async function loadLeadsData() {
  try {
    const leads = await fetchLeads();
    const tbody = document.getElementById("leads-table-body");
    tbody.innerHTML = "";
    leads.forEach((lead) => {
      const row = `<tr>
              <td>${lead.code}</td>
              <td>${lead.name}</td>
              <td>${lead.document}</td>
              <td>${lead.district}</td>
              <td>
                  <button class="btn btn-info btn-sm" onclick="editLead('${lead.lead_id}')">Editar</button>
                  <button class="btn btn-danger btn-sm" onclick="deleteLead('${lead.lead_id}')">Eliminar</button>
              </td>
          </tr>`;
      tbody.innerHTML += row;
    });
  } catch (error) {
    console.error("Error loading leads:", error);
  }
}

function showLeadForm() {
  document.getElementById("main-content").innerHTML = `
      <h2>Nuevo Lead</h2>
      <form id="lead-form">
          <div class="form-group">
              <label for="lead-name">Nombre</label>
              <input type="text" class="form-control" id="lead-name" required>
          </div>
          <div class="form-group">
              <label for="lead-document">Documento</label>
              <input type="text" class="form-control" id="lead-document" required>
          </div>
          <div class="form-group">
              <label for="lead-district">Distrito</label>
              <input type="text" class="form-control" id="lead-district" required>
          </div>
          <button type="submit" class="btn btn-primary">Guardar</button>
      </form>
  `;

  document.getElementById("lead-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const leadData = {
      name: document.getElementById("lead-name").value,
      document: document.getElementById("lead-document").value,
      district: document.getElementById("lead-district").value,
    };
    await createLead(leadData);
    loadLeads();
  });
}
