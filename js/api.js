const API_URL = "http://localhost:3000/api";

// Fetch Leads
async function fetchLeads() {
  try {
    const response = await fetch(`${API_URL}/leads`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    if (!response.ok) throw new Error("Failed to fetch leads");
    return await response.json();
  } catch (error) {
    console.error("Error fetching leads:", error);
    return [];
  }
}

// Create a new Lead
async function createLead(leadData) {
  try {
    const response = await fetch(`${API_URL}/leads/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify(leadData),
    });
    if (!response.ok) throw new Error("Failed to create lead");
    return await response.json();
  } catch (error) {
    console.error("Error creating lead:", error);
  }
}

// Fetch Procedures
async function fetchProcedures() {
  try {
    const response = await fetch(`${API_URL}/procedures`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    if (!response.ok) throw new Error("Failed to fetch procedures");
    return await response.json();
  } catch (error) {
    console.error("Error fetching procedures:", error);
    return [];
  }
}

// Create a new Procedure
async function createProcedure(procedureData) {
  try {
    const response = await fetch(`${API_URL}/procedures/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify(procedureData),
    });
    if (!response.ok) throw new Error("Failed to create procedure");
    return await response.json();
  } catch (error) {
    console.error("Error creating procedure:", error);
  }
}

// Fetch Quotations
async function fetchQuotations() {
  try {
    const response = await fetch(`${API_URL}/quotations`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    if (!response.ok) throw new Error("Failed to fetch quotations");
    return await response.json();
  } catch (error) {
    console.error("Error fetching quotations:", error);
    return [];
  }
}

// Create a new Quotation
async function createQuotation(quotationData) {
  try {
    const response = await fetch(`${API_URL}/quotations/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify(quotationData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error al crear la cotización");
    }

    return await response.json();
  } catch (error) {
    console.error("Error al crear la cotización:", error);
    alert("Error al crear la cotización: " + error.message);
  }
}

// Generate PDF for Quotation
async function generateQuotationPDF(quotationId) {
  try {
    const response = await fetch(`${API_URL}/quotations/pdf/${quotationId}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    if (!response.ok) throw new Error("Failed to generate PDF");
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `cotizacion_${quotationId}.pdf`;
    document.body.appendChild(a);
    a.click();
    a.remove();
  } catch (error) {
    console.error("Error generating quotation PDF:", error);
  }
}

async function updateQuotation(quotationId, quotationData) {
  try {
    const response = await fetch(
      `${API_URL}/quotations/update/${quotationId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify(quotationData),
      }
    );
    if (!response.ok) throw new Error("Error al actualizar la cotización");
    return await response.json();
  } catch (error) {
    console.error("Error updating quotation:", error);
  }
}

async function approveDiscount(discountId) {
  try {
    const response = await fetch(`${API_URL}/discounts/approve/${discountId}`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    if (!response.ok) throw new Error("Error al aprobar el descuento");
    return await response.json();
  } catch (error) {
    console.error("Error approving discount:", error);
  }
}

async function rejectDiscount(discountId) {
  try {
    const response = await fetch(`${API_URL}/discounts/reject/${discountId}`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    if (!response.ok) throw new Error("Error al rechazar el descuento");
    return await response.json();
  } catch (error) {
    console.error("Error rejecting discount:", error);
  }
}

// Obtener cotizaciones del vendedor
async function fetchSalespersonQuotations() {
  try {
    const response = await fetch(`${API_URL}/quotations/salesperson`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    if (!response.ok) throw new Error("Error al obtener cotizaciones");
    return await response.json();
  } catch (error) {
    console.error("Error al obtener cotizaciones del vendedor:", error);
  }
}
