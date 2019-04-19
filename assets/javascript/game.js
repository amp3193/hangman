const maxGuesses = 6;
let guessCount = 0;
let answer = "";
let guessList = [];
let winCount = 0;
let lossCount = 0;
let playing = false;

const alpha = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

const words = [
    "puppy",
    "baseball",
    "superman",
    "swimming",
    "knife",
    "minecraft",
    "chores",
    "computer",
    "shoes",
    "shopping",
];

function display() {
    console.log('display');
    $("#wins").text("Wins: " + winCount);
    $("#losses").text("Losses: " + lossCount);
    $("#guessesLeft").text("Guesses Left: " + (maxGuesses - guessCount));
    $("#guessedLetters").text("Guess List:" + getIncorrectLetters());
    $("#revealedAnswer").text("The answer is: " + getRevealedAnswer())
}

function start() {
    console.log('start');
    //generates a random letter answer
    let index = Math.floor(Math.random() * words.length);
    answer = words[index];
    // alert("this answer " + answer);
    guessCount = 0;
    guessList = [];
    playing = true;
    display();
}

function guessTests(letter) {
    let result = false;

    if (isValidLetter(letter)) {
        if (!hasBeenGuessed(letter)) {
            result = true;
        } else {
            alert("You already guessed that letter!");
        }
    } else {
        alert("That's not a letter!");
    }

    return result;
}

function hasBeenGuessed(letter) {
    let index = guessList.indexOf(letter);
    let found = (index > -1);

    return found;
}

function isValidLetter(letter) {
    let index = alpha.indexOf(letter);
    let found = (index > -1);

    return found;
}

function handleUserInput(event) {
    if (playing) {
        let letter = event.key.toLowerCase();
        console.log(`processing key event: ${letter}`);
        if (guessTests(letter)) {
            console.log('user guessed a new letter');
            guessList.push(letter);
            if (!answer.includes(letter)) {
                guessCount++;
            }

            gameStatus();
        } else {
            console.log('ignoring guess, invalid or already tried');
        }
        display();
    } else {
        console.log('game not in progress, ignoring input');
    }
}

function gameStatus() {
    if (answerFound()) {
        console.log('winner!');
        winCount++;
        playing = false;
        display();
        alert(`You guessed '${answer}' correctly! You won!!!!`);
    } else if (guessCount >= maxGuesses) {
        console.log('loser!');
        lossCount++;
        playing = false;
        display();
        alert(`You did not guess '${answer}' correctly. You are a loser!!!!`);
    }
}

function getRevealedAnswer() {
    let result = "";
    for (let i = 0; i < answer.length; i++) {
        let letter = answer.charAt(i);
        if (hasBeenGuessed(letter)) {
            result += letter.toUpperCase() + " ";
        } else {
            result += "_ ";
        }
    }
    return result;
}

function getIncorrectLetters() {
    //TODO improve
    return guessList;
}

function answerFound() {
    for (let i = 0; i < answer.length; i++) {
        let letter = answer.charAt(i);
        if (!hasBeenGuessed(letter)) {
            return false;
        }
    }
    return true;
}

document.getElementById("startButton").onclick = start;
onkeypress = handleUserInput;

console.log('js loaded');