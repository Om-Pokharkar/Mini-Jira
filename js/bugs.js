// bugs.js

// API Base URL
const API_BASE = window._config.api.invokeUrl;

// Fetch logged-in user's email from Cognito (via auth.js)
function getEmail() {
  const token = sessionStorage.getItem("id_token");
  if (!token) return null;

  const payload = JSON.parse(atob(token.split(".")[1]));
  return payload.email;
}

// Called when tester clicks "Create Bug"
async function createBug() {
  const title = document.getElementById("bugTitle").value.trim();
  const description = document.getElementById("bugDescription").value.trim();

  if (!title || !description) {
    alert("Please fill out all fields");
    return;
  }

  const data = {
    title,
    description,
    created_by: getEmail()
  };

  try {
    const res = await fetch(`${API_BASE}/createBug`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    const json = await res.json();

    if (json.error) {
      alert("Error: " + json.error);
      return;
    }

    alert("Bug created successfully!");

    document.getElementById("bugTitle").value = "";
    document.getElementById("bugDescription").value = "";

    loadMyBugs();

  } catch (err) {
    console.error(err);
    alert("Failed to create bug");
  }
}

// Load all bugs created by this tester
async function loadMyBugs() {
  const email = getEmail();
  if (!email) return;

  try {
    const res = await fetch(`${API_BASE}/listBugs?created_by=${email}`);
    const bugs = await res.json();

    const container = document.getElementById("bugList");
    container.innerHTML = "";

    if (!bugs || bugs.length === 0) {
      container.innerHTML = "<p>No bugs created yet.</p>";
      return;
    }

    bugs.forEach(bug => {
      const card = document.createElement("div");
      card.className = "bug-card";

      card.innerHTML = `
        <h3>${bug.title}</h3>
        <p>${bug.description}</p>
        <p><strong>Status:</strong> ${bug.status}</p>
        <p><strong>Assigned To:</strong> ${bug.assigned_to || "Unassigned"}</p>
      `;

      container.appendChild(card);
    });

  } catch (err) {
    console.error(err);
    alert("Failed to load bugs");
  }
}

window.onload = function() {
  loadMyBugs();
};
