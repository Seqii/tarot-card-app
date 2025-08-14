let cardData = [];

// Load JSON data
fetch('data.json')
  .then(response => response.json())
  .then(data => {
    cardData = data;
    populateTable();
    populateGrid();
    applySavedView();
    applySavedTheme();
  });

// -------------------------
// Populate Table
// -------------------------
function populateTable() {
  const tbody = document.querySelector("#mappingTable tbody");
  tbody.innerHTML = "";
  cardData.forEach(card => {
    const row = `<tr>
      <td>${card.tarot} - ${card.playing}</td>
      <td><img src="${card.image}" alt="${card.playing}" style="max-width:50px"></td>
      <td>${card.upright}</td>
      <td>${card.reversed}</td>
    </tr>`;
    tbody.innerHTML += row;
  });
}

// -------------------------
// Populate Grid
// -------------------------
function populateGrid() {
  const grid = document.getElementById("cardGrid");
  if (!grid) return;
  grid.innerHTML = "";
  cardData.forEach(card => {
    const cardEl = document.createElement("div");
    cardEl.className = "card";
    cardEl.innerHTML = `
      <img src="${card.image}" alt="${card.tarot}">
      <div class="card-name">${card.tarot} - ${card.playing}</div>
      <div class="card-meaning">
        <strong>Upright:</strong> ${card.upright}<br>
        <strong>Reversed:</strong> ${card.reversed}
      </div>
    `;
    grid.appendChild(cardEl);
  });
}

// -------------------------
// Search Functionality
// -------------------------
document.getElementById('search').addEventListener('input', function() {
  const query = this.value.toLowerCase();
  const result = cardData.find(card =>
    card.tarot.toLowerCase() === query ||
    card.playing.toLowerCase() === query
  );

  if (result) {
    document.getElementById('cardResult').innerHTML = `
      <img src="${result.image}" alt="${result.tarot}" style="max-width:150px"><br>
      <strong>Tarot:</strong> ${result.tarot} <br>
      <strong>Playing:</strong> ${result.playing} <br>
      <strong>Upright:</strong> ${result.upright} <br>
      <strong>Reversed:</strong> ${result.reversed}
    `;
  } else {
    document.getElementById('cardResult').innerHTML = "No match found.";
  }
});

// -------------------------
// Random Card
// -------------------------
document.getElementById('randomBtn').addEventListener('click', function() {
  const randomCard = cardData[Math.floor(Math.random() * cardData.length)];
  document.getElementById('cardResult').innerHTML = `
    <img src="${randomCard.image}" alt="${randomCard.tarot}" style="max-width:150px"><br>
    <strong>Tarot:</strong> ${randomCard.tarot} <br>
    <strong>Playing:</strong> ${randomCard.playing} <br>
    <strong>Upright:</strong> ${randomCard.upright} <br>
    <strong>Reversed:</strong> ${randomCard.reversed}
  `;
});

// -------------------------
// View Toggle (Table / Grid)
// -------------------------
document.getElementById("toggleViewBtn").addEventListener("click", () => {
  const table = document.getElementById("mappingTable");
  const grid = document.getElementById("cardGrid");

  table.classList.toggle("hidden");
  grid.classList.toggle("hidden");

  // Save current view
  if (grid.classList.contains("hidden")) {
    localStorage.setItem("cardView", "table");
  } else {
    localStorage.setItem("cardView", "grid");
  }
});

// Apply saved view on load
function applySavedView() {
  const savedView = localStorage.getItem("cardView") || "table";
  const table = document.getElementById("mappingTable");
  const grid = document.getElementById("cardGrid");

  if (savedView === "grid") {
    table.classList.add("hidden");
    grid.classList.remove("hidden");
  } else {
    table.classList.remove("hidden");
    grid.classList.add("hidden");
  }
}

// -------------------------
// Theme Toggle (Light / Dark)
// -------------------------
document.getElementById("themeToggleBtn").addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");
  const theme = document.body.classList.contains("dark-theme") ? "dark" : "light";
  localStorage.setItem("theme", theme);
});

function applySavedTheme() {
  const savedTheme = localStorage.getItem("theme") || "light";
  if (savedTheme === "dark") {
    document.body.classList.add("dark-theme");
  } else {
    document.body.classList.remove("dark-theme");
  }
}
