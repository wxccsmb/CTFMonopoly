const NUM_TILES = 40;
const activities = Array.from({ length: NUM_TILES }, (_, i) => `Activity for tile ${i + 1}`);
let playerPosition = 0;
let laps = 0;
let gameOver = false;

// Board setup
const board = document.getElementById('board');
for (let i = 0; i < NUM_TILES; i++) {
  const tile = document.createElement('div');
  tile.className = 'tile';
  tile.id = `tile-${i}`;
  tile.textContent = (i === 0) ? 'Go' : i + 1;
  board.appendChild(tile);
}
placeToken(0);

function placeToken(pos) {
  // Remove old token
  document.querySelectorAll('.token').forEach(token => token.remove());
  // Place new token
  const token = document.createElement('div');
  token.className = 'token';
  document.getElementById(`tile-${pos}`).appendChild(token);
}

function rollDice() {
  if (gameOver) return;
  const dice = Math.floor(Math.random() * 6) + 1;
  document.getElementById('diceResult').textContent = `You rolled: ${dice}`;
  let newPosition = playerPosition + dice;
  if (newPosition >= NUM_TILES) {
    newPosition = newPosition % NUM_TILES;
    laps += 1;
    if (laps >= 1) {
      gameOver = true;
      showActivity("Congratulations! You've completed a lap. Game Over!");
      return;
    }
  }
  playerPosition = newPosition;
  placeToken(playerPosition);
  showActivity(activities[playerPosition]);
}

function showActivity(text) {
  const card = document.getElementById('activityCard');
  document.getElementById('activityText').textContent = text;
  card.classList.remove('hidden');
}

document.getElementById('rollDice').addEventListener('click', rollDice);
document.getElementById('closeCard').addEventListener('click', () => {
  document.getElementById('activityCard').classList.add('hidden');
});
document.getElementById('resetGame').addEventListener('click', () => {
  playerPosition = 0;
  laps = 0;
  gameOver = false;
  document.getElementById('diceResult').textContent = '';
  placeToken(0);
  document.getElementById('activityCard').classList.add('hidden');
});
