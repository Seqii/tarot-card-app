let cardData = [];

// Elements
const tbody = document.querySelector("#mappingTable tbody");
const gridContainer = document.getElementById("gridContainer");
const cardResult = document.getElementById("cardResult");
const searchInput = document.getElementById("search");
const randomBtn = document.getElementById("randomBtn");
const toggleThemeBtn = document.getElementById("toggleThemeBtn");
const toggleViewBtn = document.getElementById("toggleViewBtn");
const readingModeBtn = document.getElementById("readingModeBtn");
const spreadResult = document.getElementById("spreadResult");

// Load JSON data
fetch('data.json')
  .then(res => res.json())
  .then(data => {
    cardData = data;
    populateTable();
    populateGrid();
    loadView();
    loadTheme();
  });

// Populate Table
function populateTable() {
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

// Populate Grid
function populateGrid() {
  gridContainer.innerHTML = "";
  cardData.forEach(card => {
    const cardDiv = document.createElement("div");
    cardDiv.className = "gridCard";
    cardDiv.innerHTML = `
      <img src="${card.image}" alt="${card.tarot}">
      <div class="cardName">${card.tarot} - ${card.playing}</div>
      <div class="cardMeaning">
        <strong>Upright:</strong> ${card.upright}<br>
        <strong>Reversed:</strong> ${card.reversed}
      </div>
    `;
    gridContainer.appendChild(cardDiv);
  });
}

// Search functionality
searchInput.addEventListener('input', function() {
  const query = this.value.toLowerCase();
  const result = cardData.find(card =>
    card.tarot.toLowerCase() === query ||
    card.playing.toLowerCase() === query
  );

  if (result) {
    cardResult.innerHTML = `
      <img src="${result.image}" alt="${result.tarot}" style="max-width:150px"><br>
      <strong>Tarot:</strong> ${result.tarot} <br>
      <strong>Playing:</strong> ${result.playing} <br>
      <strong>Upright:</strong> ${result.upright} <br>
      <strong>Reversed:</strong> ${result.reversed}
    `;
  } else {
    cardResult.innerHTML = "No match found.";
  }
});

// Random card draw
randomBtn.addEventListener('click', () => drawRandomCard());

// Draw random card function
function drawRandomCard() {
  const randomCard = cardData[Math.floor(Math.random() * cardData.length)];
  cardResult.innerHTML = `
    <img src="${randomCard.image}" alt="${randomCard.tarot}" style="max-width:150px"><br>
    <strong>Tarot:</strong> ${randomCard.tarot} <br>
    <strong>Playing:</strong> ${randomCard.playing} <br>
    <strong>Upright:</strong> ${randomCard.upright} <br>
    <strong>Reversed:</strong> ${randomCard.reversed}
  `;
}

// Theme toggle
toggleThemeBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-theme');
  localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
});

// Load saved theme
function loadTheme() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') document.body.classList.add('dark-theme');
}

// Table/Grid toggle
toggleViewBtn.addEventListener('click', () => {
  const table = document.getElementById("mappingTable");
  table.classList.toggle('hidden');
  gridContainer.classList.toggle('hidden');
  localStorage.setItem('view', table.classList.contains('hidden') ? 'grid' : 'table');
});

// Load saved view
function loadView() {
  const savedView = localStorage.getItem('view');
  const table = document.getElementById("mappingTable");
  if (savedView === 'grid') {
    table.classList.add('hidden');
    gridContainer.classList.remove('hidden');
  } else {
    table.classList.remove('hidden');
    gridContainer.classList.add('hidden');
  }
}

// Reading Mode (3-card spread example)
readingModeBtn.addEventListener('click', () => {
  spreadResult.innerHTML = "";
  const drawn = [];
  while (drawn.length < 3) {
    const card = cardData[Math.floor(Math.random() * cardData.length)];
    if (!drawn.includes(card)) drawn.push(card);
  }
  drawn.forEach((card, index) => {
    const upright = Math.random() > 0.5;
    const div = document.createElement('div');
    div.className = "spreadCard";
    div.innerHTML = `
      <strong>Card ${index+1}:</strong><br>
      <img src="${card.image}" alt="${card.tarot}" style="max-width:100px"><br>
      ${card.tarot} - ${card.playing}<br>
      <strong>${upright ? 'Upright' : 'Reversed'}:</strong><br>
      ${upright ? card.upright : card.reversed}
    `;
    spreadResult.appendChild(div);
  });
});
