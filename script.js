let timer;
let timeLeft = 1500; // 25 minutes in seconds
let isRunning = false;
let currentMode = 'pomodoro';

const timeDisplay = document.getElementById('time');
const startBtn = document.getElementById('start');
const pauseBtn = document.getElementById('pause');
const resetBtn = document.getElementById('reset');
const pomodoroBtn = document.getElementById('pomodoro');
const shortBreakBtn = document.getElementById('shortBreak');
const longBreakBtn = document.getElementById('longBreak');

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timeDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        timer = setInterval(() => {
            timeLeft--;
            updateDisplay();
            if (timeLeft === 0) {
                clearInterval(timer);
                isRunning = false;
                alert('¡Tiempo terminado!');
            }
        }, 1000);
    }
}

function pauseTimer() {
    clearInterval(timer);
    isRunning = false;
}

function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    setTime(currentMode);
    updateDisplay();
}

function setTime(mode) {
    currentMode = mode;
    switch (mode) {
        case 'pomodoro':
            timeLeft = 1500; // 25 minutes
            break;
        case 'shortBreak':
            timeLeft = 300; // 5 minutes
            break;
        case 'longBreak':
            timeLeft = 900; // 15 minutes
            break;
    }
    updateDisplay();
}

startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);

pomodoroBtn.addEventListener('click', () => {
    setTime('pomodoro');
    pomodoroBtn.classList.add('active');
    shortBreakBtn.classList.remove('active');
    longBreakBtn.classList.remove('active');
});

shortBreakBtn.addEventListener('click', () => {
    setTime('shortBreak');
    shortBreakBtn.classList.add('active');
    pomodoroBtn.classList.remove('active');
    longBreakBtn.classList.remove('active');
});

longBreakBtn.addEventListener('click', () => {
    setTime('longBreak');
    longBreakBtn.classList.add('active');
    pomodoroBtn.classList.remove('active');
    shortBreakBtn.classList.remove('active');
});

updateDisplay();