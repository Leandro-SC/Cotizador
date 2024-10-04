function loadProcedures() {
  document.getElementById("main-content").innerHTML = `
        <h2>Procedimientos</h2>
        <button class="btn btn-primary mb-3" onclick="showProcedureForm()">Nuevo Procedimiento</button>
        <table class="table">
            <thead>
                <tr>
                    <th>Descripción</th>
                    <th>Área de Proceso</th>
                    <th>Precio</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody id="procedures-table-body">
                <!-- Procedures will be loaded here -->
            </tbody>
        </table>
    `;
  loadProceduresData();
}

async function loadProceduresData() {
  try {
    const procedures = await fetchProcedures();
    const tbody = document.getElementById("procedures-table-body");
    tbody.innerHTML = "";
    procedures.forEach((procedure) => {
      const row = `<tr>
                <td>${procedure.description}</td>
                <td>${procedure.process_area}</td>
                <td>S/ ${procedure.price}</td>
                <td>
                    <button class="btn btn-info btn-sm">Editar</button>
                    <button class="btn btn-danger btn-sm">Eliminar</button>
                </td>
            </tr>`;
      tbody.innerHTML += row;
    });
  } catch (error) {
    console.error("Error loading procedures:", error);
  }
}

function showProcedureForm() {
  document.getElementById("main-content").innerHTML = `
        <h2>Nuevo Procedimiento</h2>
        <form id="procedure-form">
            <div class="form-group">
                <label for="procedure-description">Descripción</label>
                <input type="text" class="form-control" id="procedure-description" required>
            </div>
            <div class="form-group">
                <label for="procedure-area">Área de Proceso</label>
                <input type="text" class="form-control" id="procedure-area" required>
            </div>
            <div class="form-group">
                <label for="procedure-price">Precio</label>
                <input type="number" class="form-control" id="procedure-price" required>
            </div>
            <button type="submit" class="btn btn-primary">Guardar</button>
        </form>
    `;

  document
    .getElementById("procedure-form")
    .addEventListener("submit", async (e) => {
      e.preventDefault();
      const procedureData = {
        description: document.getElementById("procedure-description").value,
        process_area: document.getElementById("procedure-area").value,
        price: document.getElementById("procedure-price").value,
      };
      await createProcedure(procedureData);
      loadProcedures();
    });
}
