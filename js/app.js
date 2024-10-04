document.addEventListener("DOMContentLoaded", () => {
  // Toggle Sidebar
  document.getElementById("menu-toggle").addEventListener("click", function () {
    document.getElementById("wrapper").classList.toggle("toggled");
  });

  // Load dashboard content
  loadDashboard();

  // Navigation links
  document
    .getElementById("dashboard-link")
    .addEventListener("click", loadDashboard);
  document.getElementById("leads-link").addEventListener("click", loadLeads);
  document
    .getElementById("procedures-link")
    .addEventListener("click", loadProcedures);
  document
    .getElementById("quotations-link")
    .addEventListener("click", loadQuotations);
});

function loadDashboard() {
  document.getElementById("main-content").innerHTML = `
        <h2>Dashboard</h2>
        <div class="row">
            <div class="col-md-4">
                <div class="card text-white bg-primary mb-3">
                    <div class="card-body">
                        <h5 class="card-title">Total Leads</h5>
                        <p class="card-text" id="total-leads">0</p>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="card text-white bg-success mb-3">
                    <div class="card-body">
                        <h5 class="card-title">Total Cotizaciones</h5>
                        <p class="card-text" id="total-quotations">0</p>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="card text-white bg-info mb-3">
                    <div class="card-body">
                        <h5 class="card-title">Total Procedimientos</h5>
                        <p class="card-text" id="total-procedures">0</p>
                    </div>
                </div>
            </div>
        </div>
    `;
  updateDashboardCounts();
}

async function updateDashboardCounts() {
  try {
    const leads = await fetchLeads();
    const quotations = await fetchQuotations();
    const procedures = await fetchProcedures();

    document.getElementById("total-leads").innerText = leads.length;
    document.getElementById("total-quotations").innerText = quotations.length;
    document.getElementById("total-procedures").innerText = procedures.length;
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  checkAuthentication();

  // Toggle Sidebar
  document.getElementById("menu-toggle").addEventListener("click", function () {
    document.getElementById("wrapper").classList.toggle("toggled");
  });

  // Navigation links
  document
    .getElementById("dashboard-link")
    .addEventListener("click", loadDashboard);
  document.getElementById("leads-link").addEventListener("click", loadLeads);
  document
    .getElementById("procedures-link")
    .addEventListener("click", loadProcedures);
  document
    .getElementById("quotations-link")
    .addEventListener("click", loadQuotations);
  document.getElementById("logout-link").addEventListener("click", logout);

  // Login form submission
  document
    .getElementById("login-form")
    .addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = document.getElementById("login-email").value;
      const password = document.getElementById("login-password").value;
      await login(email, password);
    });
});

// Check if the user is authenticated
function checkAuthentication() {
  const token = localStorage.getItem("token");
  if (token) {
    document.getElementById("login-container").style.display = "none";
    document.getElementById("wrapper").style.display = "flex";
    loadDashboard();
  } else {
    document.getElementById("login-container").style.display = "block";
    document.getElementById("wrapper").style.display = "none";
  }
}

// Login function
async function login(email, password) {
  try {
    const response = await fetch(`${API_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) throw new Error("Login failed");

    const data = await response.json();
    localStorage.setItem("token", data.token);
    checkAuthentication();
  } catch (error) {
    console.error("Error during login:", error);
    alert("Login failed. Please check your credentials.");
  }
}

// Logout function
function logout() {
  localStorage.removeItem("token");
  checkAuthentication();
}

document.addEventListener("DOMContentLoaded", () => {
  checkAuthentication();

  // Toggle Sidebar
  document.getElementById("menu-toggle").addEventListener("click", function () {
    document.getElementById("wrapper").classList.toggle("toggled");
  });

  // Navigation links
  document
    .getElementById("dashboard-link")
    .addEventListener("click", loadDashboard);
  document.getElementById("leads-link").addEventListener("click", loadLeads);
  document
    .getElementById("procedures-link")
    .addEventListener("click", loadProcedures);
  document
    .getElementById("quotations-link")
    .addEventListener("click", loadQuotations);
  document
    .getElementById("my-quotations-link")
    .addEventListener("click", loadSalespersonQuotations); // Nuevo enlace
  document.getElementById("logout-link").addEventListener("click", logout);
});
