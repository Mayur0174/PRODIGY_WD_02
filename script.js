// DOM Elements
const timerDisplay = document.getElementById('timer-display');
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const resetBtn = document.getElementById('reset-btn');
const lapBtn = document.getElementById('lap-btn');
const lapsList = document.getElementById('laps-list');

// Stopwatch state
let startTime = 0;
let elapsedTime = 0;
let timerInterval = null;
let isRunning = false;
let lapCounter = 1;

// Format time to display as HH:MM:SS.ms
function formatTime(milliseconds) {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
    const minutes = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
    const seconds = (totalSeconds % 60).toString().padStart(2, '0');
    const ms = (milliseconds % 1000).toString().padStart(3, '0').slice(0, 2);
    return `${hours}:${minutes}:${seconds}.${ms}`;
}


// Update the timer display
function updateTimer() {
    const currentTime = Date.now();
    elapsedTime = currentTime - startTime;
    timerDisplay.textContent = formatTime(elapsedTime);
}

// Start the stopwatch
function startTimer() {
    if (!isRunning) {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(updateTimer, 10); // Update every 10ms for accuracy
        isRunning = true;
        startBtn.disabled = true;
        pauseBtn.disabled = false;
        lapBtn.disabled = false;
        resetBtn.disabled = false;
    }
}

// Pause the stopwatch
function pauseTimer() {
    if (isRunning) {
        clearInterval(timerInterval);
        isRunning = false;
        startBtn.disabled = false;
        startBtn.textContent = 'Resume';
        pauseBtn.disabled = true;
    }
}

// Reset the stopwatch
function resetTimer() {
    clearInterval(timerInterval);
    isRunning = false;
    elapsedTime = 0;
    timerDisplay.textContent = '00:00:00.00';
    startBtn.disabled = false;
    startBtn.textContent = 'Start';
    pauseBtn.disabled = true;
    lapBtn.disabled = true;
    resetBtn.disabled = true;
    lapsList.innerHTML = '';
    lapCounter = 1;
}

// Record a lap time
function recordLap() {
    if (isRunning) {
        const lapTime = formatTime(elapsedTime);
        const li = document.createElement('li');
        li.className = 'flex justify-between items-center bg-white/10 p-3 rounded-lg';
        li.innerHTML = `
            <span class="font-medium">Lap ${lapCounter}</span>
            <span class="font-mono">${lapTime}</span>
        `;
        lapsList.prepend(li); // Add new laps to the top
        lapCounter++;
    }
}

// Event Listeners
startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);
lapBtn.addEventListener('click', recordLap);

// Initial button states
pauseBtn.disabled = true;
lapBtn.disabled = true;
resetBtn.disabled = true;