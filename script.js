let cardData = [];

// Load JSON data
fetch('data.json')
  .then(response => response.json())
  .then(data => {
    cardData = data;
    populateTable();
  });

  function populateTable() {
    const tbody = document.querySelector("#mappingTable tbody");
    tbody.innerHTML = "";
    cardData.forEach(card => {
      const row = `<tr>
        <td>
          <img src="${card.image}" alt="${card.tarot}" style="max-width:50px; vertical-align:middle">
          ${card.tarot} / ${card.playing}
        </td>
        <td>—</td> <!-- Keep second column empty or remove it -->
        <td>${card.upright}</td>
        <td>${card.reversed}</td>
      </tr>`;
      tbody.innerHTML += row;
    });
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