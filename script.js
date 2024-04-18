// Define the initial game state
let gameTimer;
let gamePaused = false;
let gameState = {
    playerName: '', // Added to store player name
    currentScore: 0,
    currentTime: 0,
    currentLevel: 1,
    isGameActive: false,
    difficulty: 'Normal' // Added to manage game difficulty
};

// Starts a new game
function startNewGame() {
    gameState.playerName = prompt("Please enter your name:", ""); // Prompting for player name
    gameState.currentScore = 0;
    gameState.currentTime = 0;
    gameState.currentLevel = 1;
    gameState.isGameActive = true;
    updateGameUI();
    clearTimeout(gameTimer); // Clear any existing timer
    startTimer(); // Start the game timer
}

// Continues the game where left off
function loadGame() {
    // Check if saved game state exists and load it
    if (localStorage.getItem('gameState')) {
        gameState = JSON.parse(localStorage.getItem('gameState'));
        updateGameUI();
        console.log("Game loaded successfully.");
        if (gameState.isGameActive) {
            startTimer();
        }
    } else {
        console.log("No saved game found.");
    }
}

// Saves current game state
function saveProgress() {
    localStorage.setItem('gameState', JSON.stringify(gameState));
    console.log("Progress saved.");
}

// Update the game UI to reflect the current state
function updateGameUI() {
    document.getElementById('score').textContent = gameState.currentScore;
    document.getElementById('time-spent').textContent = `${gameState.currentTime} minute${gameState.currentTime !== 1 ? 's' : ''}`;
    document.getElementById('level').textContent = gameState.currentLevel;
    // Handle visibility of pause and resume buttons based on game state
    document.getElementById('pause-game').hidden = !gameState.isGameActive || gamePaused;
    document.getElementById('resume-game').hidden = !gameState.isGameActive || !gamePaused;
}

// Starts the game timer, updating the time spent every minute
function startTimer() {
    if (!gamePaused && gameState.isGameActive) {
        gameState.currentTime++;
        updateGameUI();
    }
    gameTimer = setTimeout(startTimer, 60000); // Update time every minute
}

// Pauses the game
function pauseGame() {
    gamePaused = true;
    updateGameUI(); // Update UI to reflect the paused state
    console.log("Game paused");
}

// Resumes the game
function resumeGame() {
    gamePaused = false;
    updateGameUI(); // Update UI to reflect the resumed state
    console.log("Game resumed");
}

// Event listeners for game control buttons
document.getElementById('start-game').addEventListener('click', startNewGame);
document.getElementById('pause-game').addEventListener('click', pauseGame);
document.getElementById('resume-game').addEventListener('click', resumeGame);
document.getElementById('load-game').addEventListener('click', loadGame);

// Initial UI update
updateGameUI();

// Sets the game difficulty
function setDifficulty(level) {
    gameState.difficulty = level;
    console.log(`Difficulty set to ${level}`);
    // Additional functionality to adjust game parameters based on difficulty can be implemented here
}

// Ends the current game
function endGame() {
    gameState.isGameActive = false;
    clearTimeout(gameTimer); // Stop the game timer
    showEndGameStats(); // Display end game stats
    console.log("Game has ended.");
}

// Displays end game statistics
function showEndGameStats() {
    alert(`Game Over!\nScore: ${gameState.currentScore}\nTime Spent: ${gameState.currentTime} minutes`);
    // Here I could implement additional code to navigate to a different screen or update the UI to show end game options
}

// Attaches event listeners to difficulty buttons
document.getElementById('difficulty-easy').addEventListener('click', () => setDifficulty('Easy'));
document.getElementById('difficulty-normal').addEventListener('click', () => setDifficulty('Normal'));
document.getElementById('difficulty-hard').addEventListener('click', () => setDifficulty('Hard'));

// Attaches an event listener to an end game button
document.getElementById('end-game').addEventListener('click', endGame);

// Call this function when the document is fully loaded to ensure all UI elements are available
document.addEventListener('DOMContentLoaded', () => {
    updateGameUI(); // Ensure the UI is initialized with the correct values
});

