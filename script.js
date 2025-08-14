fetch('cards.json')
  .then(response => response.json())
  .then(cards => {
    const container = document.getElementById('card-container');

    cards.forEach(card => {
      const row = document.createElement('div');
      row.className = 'card-row';

      const img = document.createElement('img');
      img.src = 'images/' + card.image; // make sure this matches your PNG filenames
      img.alt = card.tarot;
      img.className = 'card-image';

      const info = document.createElement('div');
      info.className = 'card-info';

      const names = document.createElement('p');
      names.className = 'card-names';
      names.textContent = `${card.tarot} / ${card.playing}`;

      const meaning = document.createElement('p');
      meaning.className = 'card-meaning';
      meaning.textContent = card.upright.split('\n')[0]; // first line of upright meaning

      info.appendChild(names);
      info.appendChild(meaning);

      row.appendChild(img);
      row.appendChild(info);

      container.appendChild(row);
    });
  })
  .catch(err => console.error('Error loading JSON:', err));
