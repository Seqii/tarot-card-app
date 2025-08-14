let cardData = [];

// Load JSON data
fetch('data.json')
  .then(response => response.json())
  .then(data => {
    cardData = data;
    populateTable();
  });

// Populate the full mapping table
function populateTable() {
  const tbody = document.querySelector("#mappingTable tbody");
  tbody.innerHTML = "";
  cardData.forEach(card => {
    const row = `<tr>
      <td>
        <img src="${card.image}" alt="${card.tarot}" style="max-width:50px">
        ${card.tarot} / ${card.playing}
      </td>
      <td>—</td>
      <td>${card.upright}</td>
      <td>${card.reversed}</td>
    </tr>`;
    tbody.innerHTML += row;
  });
}

// Display a card in the result area
function showCard(card) {
  document.getElementById('cardResult').innerHTML = `
    <img src="${card.image}" alt="${card.tarot}" style="max-width:150px"><br>
    <strong>Card:</strong> ${card.tarot} / ${card.playing} <br>
    <strong>Upright:</strong> ${card.upright} <br>
    <strong>Reversed:</strong> ${card.reversed}
  `;
}

// Search functionality
document.getElementById('search').addEventListener('input', function() {
  const query = this.value.toLowerCase();
  const result = cardData.find(card =>
    card.tarot.toLowerCase() === query ||
    card.playing.toLowerCase() === query
  );

  if (result) showCard(result);
  else document.getElementById('cardResult').innerHTML = "No match found.";
});

// Random card button
document.getElementById('randomBtn').addEventListener('click', function() {
  const randomCard = cardData[Math.floor(Math.random() * cardData.length)];
  showCard(randomCard);
});
