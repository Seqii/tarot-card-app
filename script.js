let cardData = [];

// Load JSON data
fetch('data.json')
  .then(response => response.json())
  .then(data => {
    cardData = data;
    populateTable();
    populateGrid();
  });

// ----------------- Table -----------------
function populateTable() {
  const tbody = document.querySelector("#mappingTable tbody");
  tbody.innerHTML = "";
  cardData.forEach(card => {
    const row = `<tr>
      <td style="white-space: pre-line;">${card.tarot}\n-\n${card.playing}</td>
      <td><img src="${card.image}" alt="${card.tarot}" style="max-width:50px"></td>
      <td>${card.upright}</td>
      <td>${card.reversed}</td>
    </tr>`;
    tbody.innerHTML += row;
  });
}

// ----------------- Grid -----------------
function populateGrid() {
  const grid = document.querySelector(".grid-view");
  if (!grid) return;
  grid.innerHTML = "";
  cardData.forEach(card => {
    const cardDiv = document.createElement("div");
    cardDiv.className = "card";
    cardDiv.innerHTML = `
      <img src="${card.image}" alt="${card.tarot}">
      <div class="card-name">${card.tarot} - ${card.playing}</div>
      <div class="card-meanings">
        <strong>Upright:</strong> ${card.upright}<br>
        <strong>Reversed:</strong> ${card.reversed}
      </div>
    `;
    grid.appendChild(cardDiv);
  });
}

// ----------------- Search -----------------
document.getElementById('search').addEventListener('input', function() {
  const query = this.value.toLowerCase();
  const result = cardData.find(card =>
    card.tarot.toLowerCase() === query ||
    card.playing.toLowerCase() === query
  );

  const display = document.getElementById('cardResult');
  if (result) {
    display.innerHTML = `
      <img src="${result.image}" alt="${result.tarot}" style="max-width:150px"><br>
      <strong>Tarot:</strong> ${result.tarot} <br>
      <strong>Playing:</strong> ${result.playing} <br>
      <strong>Upright:</strong> ${result.upright} <br>
      <strong>Reversed:</strong> ${result.reversed}
    `;
  } else {
    display.innerHTML = "No match found.";
  }
});

// ----------------- Random Draw -----------------
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

// ----------------- Theme Toggle -----------------
const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-theme');
});

// ----------------- Table/Grid Toggle -----------------
const toggleBtn = document.getElementById('toggleView');
const tableEl = document.getElementById('mappingTable');
const gridEl = document.querySelector('.grid-view');

toggleBtn.addEventListener('click', () => {
  if (tableEl.classList.contains('hidden')) {
    gridEl.classList.add('hidden');
    setTimeout(() => tableEl.classList.remove('hidden'), 50);
  } else {
    tableEl.classList.add('hidden');
    setTimeout(() => gridEl.classList.remove('hidden'), 50);
  }
});
