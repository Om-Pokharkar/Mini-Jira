let bugs = JSON.parse(localStorage.getItem("bugs")) || [];

function createBug() {
  const title = document.getElementById("bugTitle").value;
  const desc = document.getElementById("bugDescription").value;

  const newBug = {
    id: Date.now(),
    title,
    desc,
    status: "Open",
    assigned_to: "",
  };

  bugs.push(newBug);
  localStorage.setItem("bugs", JSON.stringify(bugs));
  alert("Bug created successfully!");
  displayBugs();
}

function assignBug(id) {
  const dev = prompt("Assign to developer name:");
  bugs = bugs.map((b) =>
    b.id === id ? { ...b, assigned_to: dev, status: "Assigned" } : b
  );
  localStorage.setItem("bugs", JSON.stringify(bugs));
  displayBugs();
}

function closeBug(id) {
  bugs = bugs.map((b) => (b.id === id ? { ...b, status: "Closed" } : b));
  localStorage.setItem("bugs", JSON.stringify(bugs));
  displayBugs();
}

function displayBugs() {
  const userRole = localStorage.getItem("userRole");
  const bugList = document.getElementById("bugList");
  if (!bugList) return;

  bugList.innerHTML = "";

  bugs.forEach((bug) => {
    const card = document.createElement("div");
    card.className = "bug-card";

    card.innerHTML = `
      <div class="bug-header">
        <span>${bug.title}</span>
        <span class="status ${bug.status}">${bug.status}</span>
      </div>
      <p>${bug.desc}</p>
      <small>Assigned to: ${bug.assigned_to || "Unassigned"}</small><br>
      ${userRole === "Manager" && bug.status === "Open" ? `<button onclick="assignBug(${bug.id})">Assign</button>` : ""}
      ${userRole === "Developer" && bug.status === "Assigned" ? `<button onclick="closeBug(${bug.id})">Close</button>` : ""}
    `;

    bugList.appendChild(card);
  });
}

window.onload = displayBugs;
