let cardData = [];
let isGridView = false; // toggle between table and grid
let isDarkMode = false;

// Load JSON data
fetch('data.json')
  .then(response => response.json())
  .then(data => {
    cardData = data;
    populateTable(); // default view
  });

// Populate table view
function populateTable() {
  const tbody = document.querySelector("#mappingTable tbody");
  tbody.innerHTML = "";
  cardData.forEach(card => {
    const row = `<tr>
      <td>${card.tarot}<br>-<br>${card.playing}</td>
      <td><img src="${card.image}" alt="${card.tarot}" style="max-width:50px"></td>
      <td>${card.upright}</td>
      <td>${card.reversed}</td>
    </tr>`;
    tbody.innerHTML += row;
  });
}

// Populate grid view
function populateGrid() {
  const table = document.getElementById("mappingTable");
  table.style.display = "none"; // hide table
  let gridContainer = document.getElementById("gridContainer");

  // Create container if doesn't exist
  if (!gridContainer) {
    gridContainer = document.createElement("div");
    gridContainer.id = "gridContainer";
    gridContainer.className = "grid-view";
    document.body.appendChild(gridContainer);
  }
  gridContainer.innerHTML = "";

  cardData.forEach(card => {
    const cardDiv = document.createElement("div");
    cardDiv.className = "card";
    cardDiv.innerHTML = `
      <img src="${card.image}" alt="${card.tarot}">
      <div class="card-name">${card.tarot} - ${card.playing}</div>
      <div class="card-meaning">
        <strong>Upright:</strong> ${card.upright}<br>
        <strong>Reversed:</strong> ${card.reversed}
      </div>
    `;
    gridContainer.appendChild(cardDiv);
  });
}

// Toggle view button
function toggleView() {
  isGridView = !isGridView;
  const table = document.getElementById("mappingTable");
  const gridContainer = document.getElementById("gridContainer");
  
  if (isGridView) {
    table.style.display = "none";
    populateGrid();
  } else {
    table.style.display = "table";
    if (gridContainer) gridContainer.style.display = "none";
  }
}

// Toggle dark/light mode
function toggleDarkMode() {
  isDarkMode = !isDarkMode;
  document.body.classList.toggle("dark", isDarkMode);
}

// Search functionality
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

// Random card button
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

// --- Optional: add buttons to toggle grid/table and dark/light ---

const controls = document.createElement("div");
controls.style.marginTop = "10px";
controls.innerHTML = `
  <button id="viewToggleBtn">Toggle Grid/Table View</button>
  <button id="themeToggleBtn">Toggle Dark/Light Mode</button>
`;
document.body.insertBefore(controls, document.getElementById("mappingTable"));

document.getElementById("viewToggleBtn").addEventListener("click", toggleView);
document.getElementById("themeToggleBtn").addEventListener("click", toggleDarkMode);
