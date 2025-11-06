// script.js

// --- Game Data ---
const tilesData = [
    { id: 0, title: "Start (Go)", type: "start", content: "Welcome to AI for Everyone! Roll the dice to begin your learning journey." },
    { id: 1, title: "What is AI?", type: "fact", content: "Artificial Intelligence (AI) is a broad field of computer science that gives computers the ability to perform human-like tasks." },
    { id: 2, title: "Machine Learning", type: "fact", content: "Machine Learning (ML) is a subset of AI that enables systems to learn from data without explicit programming." },
    { id: 3, title: "Supervised Learning", type: "question", content: "In Supervised Learning, models learn from labeled data. Can you name an application?", link: "https://www.cisco.com/c/en/us/solutions/artificial-intelligence/what-is-supervised-learning.html" },
    { id: 4, title: "Unsupervised Learning", type: "fact", content: "Unsupervised Learning works with unlabeled data to find patterns and structures, like clustering customer segments." },
    { id: 5, title: "Reinforcement Learning", type: "fact", content: "Reinforcement Learning involves an agent learning to make decisions by performing actions in an environment to maximize a reward." },
    { id: 6, title: "Neural Networks", type: "fact", content: "Inspired by the human brain, Neural Networks are at the core of deep learning, excelling at pattern recognition." },
    { id: 7, title: "Deep Learning", type: "fact", content: "Deep Learning is a subfield of ML that uses multi-layered neural networks to learn complex representations from data." },
    { id: 8, title: "Computer Vision", type: "challenge", content: "Computer Vision allows computers to 'see' and interpret visual information. Name a common use case!", link: "https://www.cisco.com/c/en/us/solutions/artificial-intelligence/what-is-computer-vision.html" },
    { id: 9, title: "Natural Language Processing (NLP)", type: "fact", content: "NLP enables computers to understand, interpret, and generate human language." },
    { id: 10, title: "Generative AI", type: "fact", content: "Generative AI creates new content like images, text, or music, based on patterns learned from existing data." },
    { id: 11, title: "Ethical AI", type: "question", content: "What are some ethical considerations when developing and deploying AI systems?", link: "https://www.cisco.com/c/en/us/solutions/artificial-intelligence/ethical-ai.html" },
    { id: 12, title: "AI in Cybersecurity", type: "fact", content: "AI helps detect and respond to cyber threats more efficiently by identifying anomalies and predicting attacks." },
    { id: 13, title: "AI in Healthcare", type: "fact", content: "AI assists in diagnosis, drug discovery, and personalized treatment plans, improving patient outcomes." },
    { id: 14, title: "AI in Customer Service", type: "fact", content: "Chatbots and virtual assistants powered by AI provide instant support and enhance customer experience." },
    { id: 15, title: "Robotics", type: "fact", content: "AI is crucial for robotics, enabling robots to perceive their environment, make decisions, and perform complex tasks." },
    { id: 16, title: "Edge AI", type: "fact", content: "Edge AI processes data locally on devices rather than in the cloud, improving speed and privacy." },
    { id: 17, title: "Cloud AI", type: "fact", content: "Cloud AI leverages cloud infrastructure to provide scalable AI services and powerful computing resources." },
    { id: 18, title: "Data Preprocessing", type: "fact", content: "Cleaning and preparing data is a critical step in any AI project, ensuring model accuracy." },
    { id: 19, title: "Feature Engineering", type: "fact", content: "Creating new features from existing data can significantly improve the performance of AI models." },
    { id: 20, title: "Model Training", type: "fact", content: "This phase involves feeding data to an AI algorithm so it can learn patterns and relationships." },
    { id: 21, title: "Model Evaluation", type: "question", content: "How do you typically evaluate the performance of a machine learning model?", link: "https://www.cisco.com/c/en/us/solutions/artificial-intelligence/what-is-model-evaluation.html" },
    { id: 22, title: "Bias in AI", type: "fact", content: "AI models can inherit biases present in their training data, leading to unfair or discriminatory outcomes." },
    { id: 23, title: "Explainable AI (XAI)", type: "fact", content: "XAI aims to make AI models more transparent and understandable, especially in critical applications." },
    { id: 24, title: "AI in IoT", type: "fact", content: "AI enhances IoT devices by enabling them to analyze data at the source and make intelligent decisions." },
    { id: 25, title: "Predictive Analytics", type: "fact", content: "AI uses historical data to predict future outcomes, like market trends or equipment failures." },
    { id: 26, title: "Anomaly Detection", type: "fact", content: "AI can identify unusual patterns or outliers in data, useful for fraud detection or system monitoring." },
    { id: 27, title: "Recommender Systems", type: "fact", content: "AI-powered recommender systems suggest products, movies, or content based on user preferences." },
    { id: 28, title: "AI in Education", type: "fact", content: "AI personalizes learning experiences, automates grading, and provides intelligent tutoring systems." },
    { id: 29, title: "AI in Finance", type: "fact", content: "AI aids in algorithmic trading, fraud detection, risk assessment, and personalized financial advice." },
    { id: 30, title: "Transfer Learning", type: "fact", content: "Transfer learning reuses a pre-trained model on a new, related task, saving time and resources." },
    { id: 31, title: "Data Augmentation", type: "fact", content: "Techniques to increase the amount of data by adding slightly modified copies of already existing data." },
    { id: 32, title: "Overfitting", type: "question", content: "What is overfitting in machine learning and how can it be mitigated?", link: "https://www.cisco.com/c/en/us/solutions/artificial-intelligence/what-is-overfitting.html" },
    { id: 33, title: "Underfitting", type: "fact", content: "Underfitting occurs when a model is too simple to capture the underlying patterns in the data." },
    { id: 34, title: "Hyperparameter Tuning", type: "fact", content: "Optimizing the parameters that control the learning process of an AI model." },
    { id: 35, title: "Generative Adversarial Networks (GANs)", type: "fact", content: "GANs consist of two neural networks competing against each other to generate realistic data." },
    { id: 36, title: "AI and Quantum Computing", type: "fact", content: "Quantum computing has the potential to revolutionize AI by solving complex problems currently intractable for classical computers." },
    { id: 37, title: "Federated Learning", type: "fact", content: "A distributed machine learning approach that trains models on decentralized datasets without sharing raw data." },
    { id: 38, title: "AI in Smart Cities", type: "fact", content: "AI optimizes traffic flow, manages energy consumption, and enhances public safety in urban environments." },
    { id: 39, title: "Responsible AI", type: "fact", content: "Developing and deploying AI systems in a way that is fair, accountable, and transparent." },
    { id: 40, title: "AI Future Trends", type: "fact", content: "AI is constantly evolving, with new breakthroughs in areas like multimodal AI and foundation models." },
    { id: 41, title: "Finish!", type: "finish", content: "Congratulations! You've completed your AI learning journey. You're now an 'AI for Everyone' champion!" },
];

// --- Game State Variables ---
let currentTileId = 0;
let lastRoll = null;
let isRolling = false;
let gameWon = false;
const totalTiles = tilesData.length;
const finishTileId = totalTiles - 1;

// --- DOM Elements ---
const boardSection = document.getElementById('board-section');
const currentTileInfoDisplay = document.getElementById('current-tile-info');
const rollDiceBtn = document.getElementById('roll-dice-btn');
const lastRollDisplay = document.getElementById('last-roll-display');
const gameWonMessage = document.getElementById('game-won-message');
const playAgainBtn = document.getElementById('play-again-btn');
const restartGameBtn = document.getElementById('restart-game-btn');

const modal = document.getElementById('modal');
const modalCloseBtn = document.getElementById('modal-close-btn');
const modalContinueBtn = document.getElementById('modal-continue-btn');
const modalTitle = document.getElementById('modal-title');
const modalContent = document.getElementById('modal-content');
const modalLink = document.getElementById('modal-link');

let playerToken; // Will be created dynamically

// --- Helper Functions ---

/**
 * Calculates the grid position (x, y) for a given tile ID
 * to simulate a square board layout.
 * @param {number} tileId
 * @returns {{x: number, y: number}}
 */
function getTileGridPosition(tileId) {
    const sideLength = Math.floor((totalTiles - 1) / 4) + 1; // Tiles per side (including corners)
    let x = 0, y = 0;

    if (tileId <= sideLength) { // Top row (rightward)
        x = tileId;
        y = 0;
    } else if (tileId <= 2 * sideLength) { // Right column (downward)
        x = sideLength;
        y = tileId - sideLength;
    } else if (tileId <= 3 * sideLength) { // Bottom row (leftward)
        x = sideLength - (tileId - 2 * sideLength);
        y = sideLength;
    } else { // Left column (upward)
        x = 0;
        y = sideLength - (tileId - 3 * sideLength);
    }
    return { x, y };
}

/**
 * Renders or updates the game board and player token.
 */
function renderBoard() {
    boardSection.innerHTML = ''; // Clear existing tiles
    const maxSide = Math.max(...tilesData.map(t => {
        const { x, y } = getTileGridPosition(t.id);
        return Math.max(x, y);
    })) + 1;

    boardSection.style.gridTemplateColumns = `repeat(${maxSide}, minmax(0, 1fr))`;
    boardSection.style.gridTemplateRows = `repeat(${maxSide}, minmax(0, 1fr))`;

    tilesData.forEach(tileData => {
        const tileElement = document.createElement('div');
        tileElement.classList.add('tile');
        tileElement.id = `tile-${tileData.id}`;

        if (tileData.id === currentTileId) {
            tileElement.classList.add('current');
        }

        const tileIdSpan = document.createElement('span');
        tileIdSpan.classList.add('tile-id');
        tileIdSpan.textContent = tileData.id;

        const tileTitleP = document.createElement('p');
        tileTitleP.textContent = tileData.title;

        tileElement.appendChild(tileIdSpan);
        tileElement.appendChild(tileTitleP);

        const { x, y } = getTileGridPosition(tileData.id);
        tileElement.style.gridColumn = x + 1;
        tileElement.style.gridRow = y + 1;

        boardSection.appendChild(tileElement);
    });

    // Render player token
    if (!playerToken) {
        playerToken = document.createElement('div');
        playerToken.classList.add('player-token');
        playerToken.textContent = 'P';
        boardSection.appendChild(playerToken);
    }
    updatePlayerTokenPosition();
    updateCurrentTileInfo();
}

/**
 * Updates the visual position of the player token.
 */
function updatePlayerTokenPosition() {
    const currentTileElement = document.getElementById(`tile-${currentTileId}`);
    if (currentTileElement && playerToken) {
        // Calculate the center of the current tile element relative to the board section
        const boardRect = boardSection.getBoundingClientRect();
        const tileRect = currentTileElement.getBoundingClientRect();

        const tokenSize = 24; // Player token width/height
        const left = (tileRect.left - boardRect.left) + (tileRect.width / 2) - (tokenSize / 2);
        const top = (tileRect.top - boardRect.top) + (tileRect.height / 2) - (tokenSize / 2);

        playerToken.style.left = `${left}px`;
        playerToken.style.top = `${top}px`;
    }
}

/**
 * Updates the current tile information display.
 */
function updateCurrentTileInfo() {
    currentTileInfoDisplay.textContent = `${currentTileId} - ${tilesData[currentTileId]?.title}`;
}

/**
 * Displays the modal with tile content.
 * @param {object} content - The tile content to display.
 */
function showModal(content) {
    modalTitle.textContent = content.title;
    modalContent.textContent = content.content;
    if (content.link) {
        modalLink.href = content.link;
        modalLink.classList.remove('hidden');
    } else {
        modalLink.classList.add('hidden');
    }
    modal.classList.remove('hidden');
    rollDiceBtn.disabled = true; // Disable dice roll while modal is open
    modalContinueBtn.focus(); // Focus continue button for accessibility
}

/**
 * Hides the modal.
 */
function closeModal() {
    modal.classList.add('hidden');
    rollDiceBtn.disabled = isRolling; // Re-enable dice roll if not currently rolling
}

/**
 * Handles the dice roll action.
 */
function handleRollDice() {
    if (isRolling || gameWon) return;

    isRolling = true;
    rollDiceBtn.disabled = true;
    rollDiceBtn.textContent = 'Rolling...';
    lastRollDisplay.textContent = ''; // Clear previous roll

    let rollCount = 0;
    const animationInterval = setInterval(() => {
        lastRoll = Math.floor(Math.random() * 6) + 1;
        lastRollDisplay.textContent = lastRoll;
        rollCount++;
        if (rollCount > 10) { // Simulate 10 quick rolls
            clearInterval(animationInterval);
            const finalRoll = Math.floor(Math.random() * 6) + 1;
            lastRoll = finalRoll;
            lastRollDisplay.textContent = finalRoll;

            let newTileId = currentTileId + finalRoll;
            if (newTileId >= totalTiles) {
                newTileId = finishTileId; // Land exactly on the finish tile
                gameWon = true;
            }

            // Remove 'current' class from old tile
            const oldTileElement = document.getElementById(`tile-${currentTileId}`);
            if (oldTileElement) oldTileElement.classList.remove('current');

            currentTileId = newTileId;

            // Add 'current' class to new tile
            const newTileElement = document.getElementById(`tile-${currentTileId}`);
            if (newTileElement) newTileElement.classList.add('current');

            updatePlayerTokenPosition(); // Move token to new position

            const tileContent = tilesData[currentTileId];
            showModal(tileContent);
            
            isRolling = false;
            rollDiceBtn.textContent = 'Roll Dice';

            if (gameWon) {
                rollDiceBtn.disabled = true;
                gameWonMessage.classList.remove('hidden');
                restartGameBtn.classList.add('hidden'); // Hide general restart button
            }
        }
    }, 100); // Fast animation frames
}

/**
 * Resets the game to its initial state.
 */
function restartGame() {
    currentTileId = 0;
    lastRoll = null;
    isRolling = false;
    gameWon = false;
    lastRollDisplay.textContent = '';
    rollDiceBtn.disabled = false;
    rollDiceBtn.textContent = 'Roll Dice';
    gameWonMessage.classList.add('hidden');
    restartGameBtn.classList.remove('hidden'); // Show general restart button
    closeModal();
    renderBoard(); // Re-render board to reset current tile highlighting
}

// --- Event Listeners ---
rollDiceBtn.addEventListener('click', handleRollDice);
modalCloseBtn.addEventListener('click', closeModal);
modalContinueBtn.addEventListener('click', closeModal); // Continue button also closes modal
playAgainBtn.addEventListener('click', restartGame); // For game won message
restartGameBtn.addEventListener('click', restartGame); // For general restart button

// --- Initial Game Setup ---
document.addEventListener('DOMContentLoaded', () => {
    renderBoard();
    updatePlayerTokenPosition(); // Initial token position
});

// Update token position on window resize to keep it centered on the tile
window.addEventListener('resize', () => {
    updatePlayerTokenPosition();
});
