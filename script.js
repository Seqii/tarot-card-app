let cardData = [];

// Load JSON data
fetch('data.json')
  .then(res => res.json())
  .then(data => {
    cardData = data;
    populateTable();
    populateGrid();
    loadTheme();
    loadView();
  });

// Populate Table
function populateTable() {
  const tbody = document.querySelector("#mappingTable tbody");
  tbody.innerHTML = "";
  cardData.forEach(card => {
    const row = `<tr>
      <td>${card.tarot} - ${card.playing}</td>
      <td><img src="${card.image}" alt="${card.tarot}" style="max-width:50px"></td>
      <td>${card.upright}</td>
      <td>${card.reversed}</td>
    </tr>`;
    tbody.innerHTML += row;
  });
}

// Populate Grid
function populateGrid() {
  const grid = document.getElementById('mappingGrid');
  grid.innerHTML = "";
  cardData.forEach(card => {
    grid.innerHTML += `
      <div class="cardItem">
        <img src="${card.image}" alt="${card.tarot}" style="max-width:80px">
        <strong>${card.tarot}</strong><br>
        <em>${card.playing}</em>
        <p class="meaning" style="display:none">${card.upright}</p>
      </div>
    `;
  });
}

// Search
document.getElementById('search').addEventListener('input', function() {
  const query = this.value.toLowerCase();
  const result = cardData.find(card =>
    card.tarot.toLowerCase() === query || card.playing.toLowerCase() === query
  );

  const cardResult = document.getElementById('cardResult');
  if(result){
    cardResult.innerHTML = `
      <img src="${result.image}" alt="${result.tarot}" style="max-width:150px"><br>
      <strong>Tarot:</strong> ${result.tarot}<br>
      <strong>Playing:</strong> ${result.playing}<br>
      <strong>Upright:</strong> ${result.upright}<br>
      <strong>Reversed:</strong> ${result.reversed}
    `;
  } else {
    cardResult.innerHTML = "No match found.";
  }
});

// Random
document.getElementById('randomBtn').addEventListener('click', function() {
  const randomCard = cardData[Math.floor(Math.random() * cardData.length)];
  document.getElementById('cardResult').innerHTML = `
    <img src="${randomCard.image}" alt="${randomCard.tarot}" style="max-width:150px"><br>
    <strong>Tarot:</strong> ${randomCard.tarot}<br>
    <strong>Playing:</strong> ${randomCard.playing}<br>
    <strong>Upright:</strong> ${randomCard.upright}<br>
    <strong>Reversed:</strong> ${randomCard.reversed}
  `;
});

// Theme Toggle
const themeBtn = document.getElementById('themeToggle');
themeBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
});
function loadTheme(){
  if(localStorage.getItem('theme') === 'dark'){
    document.body.classList.add('dark');
  }
}

// View Toggle
const viewBtn = document.getElementById('viewToggle');
viewBtn.addEventListener('click', () => {
  const table = document.getElementById('mappingTable');
  const grid = document.getElementById('mappingGrid');
  table.classList.toggle('hidden');
  grid.classList.toggle('hidden');
  localStorage.setItem('view', table.classList.contains('hidden') ? 'grid' : 'table');
});
function loadView(){
  if(localStorage.getItem('view') === 'grid'){
    document.getElementById('mappingTable').classList.add('hidden');
    document.getElementById('mappingGrid').classList.remove('hidden');
  }
}

// Reading Mode
function drawRandomCard(deckType, allowReversed){
  const randomCard = cardData[Math.floor(Math.random() * cardData.length)];
  const isReversed = allowReversed ? Math.random() < 0.5 : false;
  return {
    tarot: randomCard.tarot,
    playing: randomCard.playing,
    image: randomCard.image,
    uprightText: randomCard.upright,
    reversedText: randomCard.reversed,
    reversed: isReversed
  };
}

document.getElementById('drawSpreadBtn').addEventListener('click', function(){
  const spreadType = document.getElementById('spreadSelect').value;
  const deckType = document.getElementById('deckSelect').value;
  const allowReversed = document.getElementById('uprightCheck').checked;
  const spreadDiv = document.getElementById('spreadResult');
  spreadDiv.innerHTML = '';

  const numberOfCards = spreadType === '3' ? 3 : 10;
  for(let i=0;i<numberOfCards;i++){
    const card = drawRandomCard(deckType, allowReversed);
    const meaning = card.reversed ? card.reversedText : card.uprightText;
    spreadDiv.innerHTML += `
      <div class="spreadCard">
        <img src="${card.image}" alt="${card.tarot}" style="max-width:100px"><br>
        <strong>${deckType==='tarot'?card.tarot:card.playing}</strong><br>
        <em>${deckType==='tarot'?card.playing:card.tarot}</em><br>
        <p>${meaning}</p>
        ${card.reversed?'<small>(Reversed)</small>':''}
      </div>
    `;
  }
});
