let cardData = [];
let gridPopulated = false;

// ─── Helpers ────────────────────────────────────────────────────
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function formatMeaning(text) {
  return escapeHtml(text).replace(/\n/g, '<br>');
}

function buildCardResultHTML(card) {
  return `
    <img src="${escapeHtml(card.image)}" alt="${escapeHtml(card.tarot)}">
    <div class="result-details">
      <h2>${escapeHtml(card.tarot)}</h2>
      <p><strong>Playing Card:</strong> ${escapeHtml(card.playing)}</p>
      <p><strong>Upright:</strong> ${formatMeaning(card.upright)}</p>
      <p><strong>Reversed:</strong> ${formatMeaning(card.reversed)}</p>
    </div>
  `;
}

// ─── Populate table ──────────────────────────────────────────────
function populateTable() {
  const tbody = document.querySelector('#mappingTable tbody');
  const rows = cardData.map(card => `<tr>
    <td><img src="${escapeHtml(card.image)}" alt="${escapeHtml(card.tarot)}"></td>
    <td>${escapeHtml(card.tarot)}</td>
    <td>${escapeHtml(card.playing)}</td>
    <td>${formatMeaning(card.upright)}</td>
    <td>${formatMeaning(card.reversed)}</td>
  </tr>`);
  tbody.innerHTML = rows.join('');
}

// ─── Populate grid ───────────────────────────────────────────────
function populateGrid() {
  if (gridPopulated) return;
  gridPopulated = true;
  const fragment = document.createDocumentFragment();
  cardData.forEach(card => {
    const cardDiv = document.createElement('div');
    cardDiv.classList.add('card');
    cardDiv.innerHTML = `
      <img src="${escapeHtml(card.image)}" alt="${escapeHtml(card.tarot)}">
      <div class="card-name">${escapeHtml(card.tarot)}</div>
      <div class="card-playing">${escapeHtml(card.playing)}</div>
      <div class="card-meaning">
        <strong>Upright:</strong> ${formatMeaning(card.upright)}<br>
        <strong>Reversed:</strong> ${formatMeaning(card.reversed)}
      </div>
    `;
    fragment.appendChild(cardDiv);
  });
  document.getElementById('gridContainer').appendChild(fragment);
}

// ─── Load data ───────────────────────────────────────────────────
fetch('data.json')
  .then(response => {
    if (!response.ok) throw new Error('Failed to load card data');
    return response.json();
  })
  .then(data => {
    cardData = data;
    populateTable();
  })
  .catch(err => {
    document.getElementById('cardResult').textContent = 'Error loading card data. Please refresh and try again.';
    console.error(err);
  });

// ─── Search ──────────────────────────────────────────────────────
document.getElementById('search').addEventListener('input', function () {
  const query = this.value.trim().toLowerCase();
  const cardResult = document.getElementById('cardResult');

  if (!query) {
    cardResult.innerHTML = '';
    return;
  }

  const result = cardData.find(card =>
    card.tarot.toLowerCase().includes(query) ||
    card.playing.toLowerCase().includes(query)
  );

  cardResult.innerHTML = result
    ? buildCardResultHTML(result)
    : '<p>No matching card found.</p>';
});

// ─── Random card ─────────────────────────────────────────────────
document.getElementById('randomBtn').addEventListener('click', function () {
  if (!cardData.length) return;
  const randomCard = cardData[Math.floor(Math.random() * cardData.length)];
  document.getElementById('cardResult').innerHTML = buildCardResultHTML(randomCard);
});

// ─── Theme toggle ────────────────────────────────────────────────
const themeBtn = document.getElementById('themeBtn');

function applyTheme(dark) {
  if (dark) {
    document.body.classList.add('dark');
  } else {
    document.body.classList.remove('dark');
  }
  themeBtn.textContent = dark ? '☀️ Switch to Light' : '🌙 Switch to Dark';
}

applyTheme(localStorage.getItem('theme') === 'dark');

themeBtn.addEventListener('click', function () {
  const isDark = document.body.classList.contains('dark');
  localStorage.setItem('theme', isDark ? 'light' : 'dark');
  applyTheme(!isDark);
});

// ─── Grid / Table toggle ─────────────────────────────────────────
const toggleBtn = document.getElementById('toggleViewBtn');
const table = document.getElementById('mappingTable');
const gridContainer = document.getElementById('gridContainer');

toggleBtn.addEventListener('click', () => {
  const showingGrid = gridContainer.style.display !== 'none';
  if (showingGrid) {
    table.style.display = 'table';
    gridContainer.style.display = 'none';
    toggleBtn.textContent = '⊞ Switch to Grid View';
  } else {
    table.style.display = 'none';
    gridContainer.style.display = 'grid';
    toggleBtn.textContent = '☰ Switch to Table View';
    populateGrid();
  }
});

// ─── Spread Reading ───────────────────────────────────────────
const SPREADS = {
  single: { label: 'Daily Draw', positions: ['Your Card'] },
  three:  { label: 'Past · Present · Future', positions: ['Past', 'Present', 'Future'] },
  five:   { label: 'Cross Spread', positions: ['Situation', 'Challenge', 'Foundation', 'Past', 'Future'] }
};

function drawReading(spreadKey) {
  const spread = SPREADS[spreadKey];
  const drawn = [...cardData]
    .sort(() => Math.random() - 0.5)
    .slice(0, spread.positions.length);

  const cardsHTML = drawn.map((card, i) => `
    <div class="reading-card">
      <div class="reading-position">${escapeHtml(spread.positions[i])}</div>
      <img src="${escapeHtml(card.image)}" alt="${escapeHtml(card.tarot)}">
      <div class="reading-card-name">${escapeHtml(card.tarot)}</div>
      <div class="reading-card-playing">${escapeHtml(card.playing)}</div>
      <div class="reading-card-meaning">
        <strong>Upright:</strong> ${formatMeaning(card.upright)}<br>
        <strong>Reversed:</strong> ${formatMeaning(card.reversed)}
      </div>
    </div>
  `).join('');

  document.getElementById('readingResult').innerHTML = `
    <p class="reading-title">${escapeHtml(spread.label)}</p>
    <div class="reading-spread">${cardsHTML}</div>
  `;
}

document.getElementById('readingBtn').addEventListener('click', function () {
  if (!cardData.length) return;
  drawReading(document.getElementById('spreadSelect').value);
});
