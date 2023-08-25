// Define your symbols (Pokemon-themed images) here.
const symbols = [
    { image: "symbol1.png", name: "Lucky Seven", credits: 100 },
    { image: "symbol2.png", name: "Team Galaxy", credits: 100 },
    { image: "symbol3.png", name: "Replay", credits: 0 }, // Special symbol
    { image: "symbol4.png", name: "Pokeballs", credits: 2 },
    { image: "symbol5.png", name: "Pikachu", credits: 10 },
    { image: "symbol6.png", name: "Moon Stone", credits: 15 },
];

// Initialize variables
let spinning = false;
const reels = [
    Array(3).fill(null), // Column 1
    Array(3).fill(null), // Column 2
    Array(3).fill(null), // Column 3
];
const spinButton = document.getElementById("spin-button");
const resultDisplay = document.getElementById("result");
let coinBalance = 1000; // Starting coin balance

// Function to spin the reels
function spinReels() {
    if (spinning) return;

    spinning = true;
    spinButton.disabled = true;

    // Clear the reels
    for (let i = 0; i < reels.length; i++) {
        reels[i] = Array(3).fill(null);
    }

    // Simulate spinning by changing symbols after a delay
    setTimeout(() => {
        for (let i = 0; i < reels.length; i++) {
            const randomSymbols = getRandomUniqueSymbols(i); // Get unique symbols for each column
            reels[i] = randomSymbols;
            setReelSymbols(i, randomSymbols);
        }

        // Check for winning combinations and calculate payouts
        const winAmount = calculateWin();
        coinBalance += winAmount;

        resultDisplay.textContent = `Result: ${winAmount > 0 ? `You won ${winAmount} credits!` : "Try again!"}`;
        document.getElementById("coin-balance").textContent = `Coins: ${coinBalance}`;

        spinning = false;
        spinButton.disabled = false;
    }, 1000); // Adjust the delay to control the spinning speed
}

// Function to get unique symbols for each column
function getRandomUniqueSymbols(columnIndex) {
    const availableSymbols = symbols.slice(); // Create a copy of the symbols array
    const randomSymbols = [];

    for (let i = 0; i < 3; i++) {
        const randomIndex = Math.floor(Math.random() * availableSymbols.length);
        const randomSymbol = availableSymbols.splice(randomIndex, 1)[0];
        randomSymbols.push(randomSymbol);
    }

    return randomSymbols;
}

// Function to set symbols for a reel
function setReelSymbols(columnIndex, symbols) {
    for (let i = 0; i < 3; i++) {
        const symbolElement = document.getElementById(`reel${i + 1}-column${columnIndex + 1}`);
        symbolElement.style.backgroundImage = `url(${symbols[i].image})`;
    }
}

// Function to calculate winnings based on symbols
function calculateWin() {
    // Check for winning combinations - horizontal, vertical, and diagonal
    const winCombinations = [
        // Horizontal rows
        [[0, 0], [0, 1], [0, 2]],
        [[1, 0], [1, 1], [1, 2]],
        [[2, 0], [2, 1], [2, 2]],
        // Vertical columns
        [[0, 0], [1, 0], [2, 0]],
        [[0, 1], [1, 1], [2, 1]],
        [[0, 2], [1, 2], [2, 2]],
        // Diagonals
        [[0, 0], [1, 1], [2, 2]],
        [[0, 2], [1, 1], [2, 0]],
    ];

    for (const combination of winCombinations) {
        const [row1, col1] = combination[0];
        const [row2, col2] = combination[1];
        const [row3, col3] = combination[2];

        if (
            reels[col1][row1].image === reels[col2][row2].image &&
            reels[col2][row2].image === reels[col3][row3].image
        ) {
            // Find the winning symbol's credit value
            const winningSymbol = symbols.find(symbol => symbol.image === reels[col1][row1].image);
            if (winningSymbol) {
                return winningSymbol.credits; // Award the credits based on the winning symbol
            }
        }
    }

    return 0; // No win
}

// Add a click event listener to the "Spin" button
spinButton.addEventListener("click", spinReels);

// Initial setup to populate the reels with symbols
for (let i = 0; i < reels.length; i++) {
    const randomSymbols = getRandomUniqueSymbols(i);
    setReelSymbols(i, randomSymbols);
}
