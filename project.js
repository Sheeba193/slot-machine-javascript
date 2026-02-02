// Slot Machine Game steps
//1. deposit some money
//2. determine the number of lines to bet on
//3. collect a bet amount
//4. spin the slot machine
//5. check if the user won
//6. give the user their winnings
//7. play again or quit

const prompt = require('prompt-sync')();

const ROWS = 3;
const COLS = 3; 

const SYMBOLS_COUNT = {
    "A": 2,
    "B": 4,
    "C": 6,
    "D": 8
}

const SYMBOLS_VALUES = {
    "A": 5,
    "B": 4,
    "C": 3,
    "D": 2  
};


const deposit = () => {
    // code for depositing money
    while (true) {
        const depositAmount = prompt("Enter the amount to deposit: ");
        const numberDepositAmount = parseFloat(depositAmount); // Convert input to a number
        if (isNaN(numberDepositAmount) || numberDepositAmount <= 0) {
            console.log("Invalid deposit amount. Please enter a positive number.");
        } else {
            return numberDepositAmount;
        };
    };
    
};

const getNumberOfLines = () => {
    // code for getting number of lines to bet on
    while (true) {
        const lines = prompt("Enter the number of lines to bet on (1-3): ");
        const numberOfLines = parseFloat(lines); // Convert input to a number
        if (isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines > 3) {
            console.log("Invalid number of lines. Please enter a number between 1 and 3.");
        } else {
            return numberOfLines;
        };
    };
};

const getBet = (balance, lines) => {
    // code for getting bet amount
    while (true) {
        const bet = prompt("Enter the bet amount per line: ");
        const numberBet = parseFloat(bet); // Convert input to a number

        if (isNaN(numberBet) || numberBet <= 0 || numberBet > balance / lines) {
            console.log("Invalid bet amount. Please enter a positive number less than or equal to your balance.");
        } else {
            return numberBet;
        };
    };
};

const spin = () => {
    // code for spinning the slot machine
    const symbols = [];
    for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)){
        for(let i = 0; i < count; i++){
            symbols.push(symbol);
        }
        
    };

    const reels = [];
    for (let i = 0; i < COLS; i++){
        reels.push([]);
        const reelSymbols = [...symbols]; // Create a copy of the symbols array              
        for (let j = 0; j < ROWS; j++){
            const randomIndex = Math.floor(Math.random() * reelSymbols.length); // Get a random index
            const selectedSymbol = reelSymbols[randomIndex]; // Select the symbol at the random index
            reels[i].push(selectedSymbol);// Add the selected symbol to the reel
            reelSymbols.splice(randomIndex, 1); // Remove the selected symbol to avoid duplicates
        }
    };
    return reels;
};


const transpose = (reels) => {
    const rows = [];
    for(let i= 0; i < ROWS; i++){
        rows.push([]);
        for(let j = 0; j < COLS; j++){
            rows[i].push(reels[j][i]);
        }
    }
    return rows;
};

const printRows = (rows) => {   
    for (const row of rows){
        let rowString = "";     
        for (const [i, symbol] of row.entries()){
            rowString += symbol;                        
            if (i != row.length - 1){
                rowString += " | ";
            }
        }
        console.log(rowString);
    }
};

const getWinnings = (rows, bet, lines) => {
    let winnings = 0;
    
    for (let row = 0; row < lines; row++){
        const symbols = rows[row];
        let allSame = true;
        for (const symbol of symbols){
            if (symbol != symbols[0]){
                allSame = false;
                break;
            }
        }
        if (allSame){
            winnings += bet * SYMBOLS_VALUES[symbols[0]];
        }
    }    
    return winnings;
};


const game = () => {
    let balance = deposit();
    while (true){
        console.log("Current balance: $" + balance);
        const numberOfLines = getNumberOfLines();
        const bet = getBet(balance, numberOfLines);
        balance -= bet * numberOfLines;
        const reels = spin();
        const rows = transpose(reels);
        printRows(rows);
        const winnings = getWinnings(rows, bet, numberOfLines);
        balance += winnings;
        console.log("You won, $" + winnings.toString());

        if (balance <= 0){
            console.log("You ran out of money!");
            break;
        }
        const playAgain = prompt("Do you want to play again? (y/n): "); 
        if (playAgain !== "y")break;
    }
};
game();


let balance = deposit();
const numberOfLines = getNumberOfLines();
const bet = getBet(balance, numberOfLines);
const reels = spin();
const rows = transpose(reels);
printRows(rows);
const winnings = getWinnings(rows, bet, lines);
console.log("You won, $" + winnings.toString());
