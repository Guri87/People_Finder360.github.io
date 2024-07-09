document.getElementById('searchBar').addEventListener('input', filterTiles);

let peopleData = [];

document.addEventListener('DOMContentLoaded', () => {
  fetch('file2.csv')
    .then(response => response.text())
    .then(data => {
      peopleData = parseCSV(data);
      displayTiles(peopleData);
    })
    .catch(error => console.error('Error fetching the CSV file:', error));
});

function parseCSV(data) {
  const lines = data.trim().split('\n').slice(1); // Remove header line and trim any extra spaces
  return lines.map(line => {
    const [firstName, lastName, position, phone, email, department] = line.replace(/"/g, '').split(',');
    return { firstName, lastName, position, phone, email, department };
  }).filter(person => person.firstName); // Filter out empty rows
}

function displayTiles(data) {
  const tilesContainer = document.getElementById('tilesContainer');
  tilesContainer.innerHTML = ''; // Clear previous tiles
  data.forEach(person => {
    const tile = document.createElement('div');
    tile.className = 'tile';
    tile.innerHTML = `
      <h2>${person.firstName} ${person.lastName}</h2>
      <p><strong>Position:</strong> ${person.position}</p>
      <p><strong>Phone:</strong> ${person.phone}</p>
      <p><strong>Email:</strong> ${person.email}</p>
      <p><strong>Department:</strong> ${person.department}</p>
    `;
    tilesContainer.appendChild(tile);
  });
}

function filterTiles() {
  const query = document.getElementById('searchBar').value.toLowerCase();
  const filteredData = peopleData.filter(person =>
    `${person.firstName} ${person.lastName}`.toLowerCase().includes(query) ||
    person.position.toLowerCase().includes(query) ||
    person.phone.toLowerCase().includes(query) ||
    person.email.toLowerCase().includes(query) ||
    person.department.toLowerCase().includes(query)
  );
  displayTiles(filteredData);
}
