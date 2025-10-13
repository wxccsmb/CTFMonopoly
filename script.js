// Total spaces on the board
const TOTAL_SPACES = 40;

// Cisco-themed insights or challenges for each space (simplified examples)
const ciscoInsights = [
  "Start your journey with Cisco Live insights!",
  "Did you know? Cisco's AI innovations are transforming networking.",
  "Challenge: Name one Cisco security product.",
  "Insight: Cisco DNA Center simplifies network management.",
  "Trivia: What year was Cisco founded?",
  "Tip: Use Cisco Webex for seamless collaboration.",
  "Challenge: Identify a Cisco certification path.",
  "Insight: Cisco Meraki offers cloud-managed IT solutions.",
  "Trivia: What does SD-WAN stand for?",
  "Tip: Leverage Cisco DevNet for developer resources.",
  "Community Chest replaced: Share a Cisco Live experience.",
  "Insight: Cisco's intent-based networking adapts in real-time.",
  "Challenge: What is Cisco ACI?",
  "Trivia: Name a Cisco data center solution.",
  "Tip: Use Cisco SecureX for integrated security.",
  "Insight: Cisco's Catalyst switches support high performance.",
  "Challenge: What is the purpose of Cisco Umbrella?",
  "Trivia: What protocol does Cisco TrustSec use?",
  "Tip: Explore Cisco ThousandEyes for network visibility.",
  "Insight: Cisco's AI Network Analytics predicts issues.",
  "Chance replaced: Describe a Cisco innovation you admire.",
  "Insight: Cisco's collaboration tools enhance productivity.",
  "Challenge: What is Cisco DNA Spaces?",
  "Trivia: Name a Cisco wireless solution.",
  "Tip: Use Cisco Packet Tracer for network simulation.",
  "Insight: Cisco's Secure Firewall protects your network.",
  "Challenge: What is Cisco ISE used for?",
  "Trivia: What is the Cisco IOS?",
  "Tip: Explore Cisco's cloud security offerings.",
  "Insight: Cisco's SD-Access automates network segmentation.",
  "Community Chest replaced: Share a tip for Cisco certification.",
  "Challenge: What is Cisco's DevNet?",
  "Trivia: Name a Cisco routing protocol.",
  "Tip: Use Cisco Talos for threat intelligence.",
  "Insight: Cisco's Webex integrates AI for meetings.",
  "Challenge: What is Cisco DNA Assurance?",
  "Trivia: What is the function of Cisco Nexus switches?",
  "Tip: Leverage Cisco's automation tools for efficiency.",
  "Insight: Cisco's SecureX platform unifies security management."
];

// Create the board spaces in the DOM
const board = document.getElementById("board");
const playerToken = document.createElement("div");
playerToken.id = "playerToken";
board.appendChild(playerToken);

// Array to hold space elements for positioning
const spaces = [];

// Function to create the 40 spaces around the board edges
function createBoardSpaces() {
  // The board is 11x11 grid, spaces are on the perimeter
  // Positions for spaces 0 to 39 around the edges clockwise starting bottom-right corner (Go)
  // We'll map each space to a grid cell (row, col)
  // Space 0 (Go) at bottom-right corner (row 10, col 10)
  // Spaces 1-9 along bottom row leftwards
  // Spaces 10-19 along left column upwards
  // Spaces 20-29 along top row rightwards
  // Spaces 30-39 along right column downwards

  for (let i = 0; i < TOTAL_SPACES; i++) {
    const space = document.createElement("div");
    space.classList.add("space");

    // Determine position on grid
    let row, col;
    if (i >= 0 && i <= 9) {
      // Bottom row, right to left
      row = 10;
      col = 10 - i;
    } else if (i >= 10 && i <= 19) {
      // Left column, bottom to top
      row = 10 - (i - 10);
      col = 0;
    } else if (i >= 20 && i <= 29) {
      // Top row, left to right
      row = 0;
      col = i - 20;
    } else {
      // Right column, top to bottom
      row = i - 30;
      col = 10;
    }

    // Mark corners with special class
    if (i % 10 === 0) {
      space.classList.add("corner");
    }

    // Add space number and insight preview
    space.innerHTML = `<div>Space ${i}</div><small>${ciscoInsights[i] ? ciscoInsights[i].substring(0, 20) : ''}...</small>`;

    // Position in grid
    space.style.gridRowStart = row + 1;
    space.style.gridColumnStart = col + 1;

    board.appendChild(space);
    spaces.push(space);
  }
}

// Player state
let playerPosition = 0;

// Update player token position on the board
function updatePlayerToken() {
  const space = spaces[playerPosition];
  const rect = space.getBoundingClientRect();
  const boardRect = board.getBoundingClientRect();

  // Calculate relative position inside board container
  const left = space.offsetLeft + space.offsetWidth / 2 - playerToken.offsetWidth / 2;
  const top = space.offsetTop + space.offsetHeight / 2 - playerToken.offsetHeight / 2;

  playerToken.style.left = `${left}px`;
  playerToken.style.top = `${top}px`;

  // Update position display
  document.getElementById("playerPosition").textContent = playerPosition;
}

// Show insight or challenge for current space
function showInsight() {
  const insightText = ciscoInsights[playerPosition];
  const insightBox = document.getElementById("insightText");
  insightBox.textContent = insightText;
}

// Roll dice and move player
function rollDice() {
  const diceRoll = Math.floor(Math.random() * 6) + 1;
  document.getElementById("diceResult").textContent = diceRoll;

  playerPosition = (playerPosition + diceRoll) % TOTAL_SPACES;
  updatePlayerToken();
  showInsight();
}

// Initialize game
function initGame() {
  createBoardSpaces();
  updatePlayerToken();

  const rollDiceBtn = document.getElementById("rollDiceBtn");
  rollDiceBtn.addEventListener("click", rollDice);
}

window.onload = initGame;
