let display = document.getElementById("display");
let historyList = document.getElementById("history-list");

// Load sound effect
const clickSound = new Audio("click.mp3");

// Play click sound
function playClickSound() {
    clickSound.currentTime = 0;
    clickSound.play();
}

// Add click sound to buttons
document.querySelectorAll("button").forEach(button => {
    button.addEventListener("click", playClickSound);
});

// Append values to display
function appendToDisplay(value) {
    display.value += value;
}

// Clear display
function clearDisplay() {
    display.value = "";
}

// Delete last character
function deleteLast() {
    display.value = display.value.slice(0, -1);
}

// Evaluate expression & store in history
function calculateResult() {
    try {
        let expression = display.value;
        let result = eval(expression);
        display.value = result;
        addToHistory(expression, result);
    } catch {
        display.value = "Error";
    }
}

// Add calculation to history
function addToHistory(expression, result) {
    let historyItem = document.createElement("li");
    historyItem.textContent = `${expression} = ${result}`;
    historyList.prepend(historyItem);

    // Limit history to 5 entries
    if (historyList.children.length > 5) {
        historyList.removeChild(historyList.lastChild);
    }
}

// Clear history
function clearHistory() {
    historyList.innerHTML = "";
}

// Keyboard support
document.addEventListener("keydown", function (event) {
    const key = event.key;
    if (!isNaN(key) || key === "." || "+-*/".includes(key)) {
        appendToDisplay(key);
    } else if (key === "Enter") {
        calculateResult();
    } else if (key === "Backspace") {
        deleteLast();
    } else if (key === "Escape") {
        clearDisplay();
    }
});

// Toggle theme
function toggleTheme() {
    document.body.classList.toggle("light-theme");
}
