/* VARIABLES */
const buttonDailyMin = document.getElementById('button-daily-min');
const buttonDailyMax = document.getElementById('button-daily-max');
const dailyPomValue1 = document.getElementById('Input-text');
const dailyPomValue2 = document.getElementById('Input-text2');
const doneBoxes = document.getElementById('done-boxes');
const doneBoxes2 = document.getElementById('done-boxes2');
const pomodoroBreak = document.getElementById('pomodoro-break');
const longBreak = document.getElementById('long-break');
const shortBreak = document.getElementById('short-break');
const firstPomBarElement = document.getElementById('123');
const secondPomBarElement = document.getElementById('1234');
const motivation = document.getElementById('motivation');
const motivationAuthor = document.getElementById('motivation-author');

let pomodoroCircles;
let previousAmount = 1;
let previousAmount2 = 1;
let firstPomBarElementCounter = false;
let secondPomBarElementCounter = false;

const tempArray = [];
const tempArray2 = [];

buttonDailyMin.addEventListener('click', dailyPomAmountMin);
buttonDailyMax.addEventListener('click', dailyPomAmountMax);

function updatePomodoroCircles(selector, className) {
    pomodoroCircles = document.querySelectorAll(selector);
    pomodoroCircles.forEach((element) => {
        element.addEventListener('click', () => {
            element.classList.toggle('fa-solid');
            element.classList.toggle('fa-regular');
        });
    });
}

function updateDoneBoxes(value, previousAmount, doneBoxes, className, array) {
    if (value <= 0) {
        alert('Invalid daily-min pomodoros value');
        previousAmount = 1;
    } else if (value < previousAmount) {
        for (let i = 0; i < previousAmount - value; i++) {
            doneBoxes.removeChild(doneBoxes.lastChild);
        }
        previousAmount = value;
    } else if (value >= previousAmount) {
        for (let i = 0; i < value - previousAmount; i++) {
            const ix = document.createElement('i');
            ix.className = `icon fa-regular fa-circle-check fa-lg icons ${className}`;
            ix.style = "color: #006d8f;";
            doneBoxes.appendChild(ix);
            array.push(ix);
        }
        previousAmount = value;
    }
    return previousAmount;
}

function dailyPomAmountMin() {
    previousAmount = updateDoneBoxes(dailyPomValue1.value, previousAmount, doneBoxes, 'document', tempArray);
    updatePomodoroCircles('.document', 'document');
}

function dailyPomAmountMax() {
    previousAmount2 = updateDoneBoxes(dailyPomValue2.value, previousAmount2, doneBoxes2, 'document2', tempArray2);
    updatePomodoroCircles('.document2', 'document2');
}

/* DAILY MOTIVATION SECTION */
fetch("https://type.fit/api/quotes")
    .then(response => response.json())
    .then(data => {
        const randomNumber = Math.floor(Math.random() * 50);
        motivation.innerHTML = `"${data[randomNumber].text}"`;
        motivationAuthor.innerHTML = `-${data[randomNumber].author || 'Anonymous'}`;
    });

/* POMODORO TIMER SECTION */
const pomodoroBreakProps = { disabled: true };
const longBreakProps = { disabled: false };
const shortBreakProps = { disabled: false };
const startButtonProps = { disabled: false };
const stopButtonProps = { disabled: false };

let session_seconds = 59;
let session_minutes = 24;
let cycleCounterForLongBreak = 0;
let counterForStartButton = 0;

document.getElementById('minutes').innerHTML = 25;
document.getElementById('seconds').innerHTML = '00';

pomodoroBreak.addEventListener('click', controlPomodoroButton);
shortBreak.addEventListener('click', controlShortButton);
longBreak.addEventListener('click', controlLongButton);

function controlButton(props, func) {
    if (stopButtonProps.disabled) {
        func();
    } else {
        alert('Your timer is currently running. Please stop the timer to switch.');
    }
}

function controlPomodoroButton() {
    controlButton(stopButtonProps, pomodoroBreakFunction);
}

function controlShortButton() {
    controlButton(stopButtonProps, shortBreakFunction);
}

function controlLongButton() {
    controlButton(stopButtonProps, longBreakFunction);
}

function updateBackgroundColor(color, button) {
    document.body.style.backgroundColor = color;
    pomodoroBreak.style.backgroundColor = 'transparent';
    shortBreak.style.backgroundColor = 'transparent';
    longBreak.style.backgroundColor = 'transparent';
    button.style.backgroundColor = '#012834';
}

function pomodoroBreakFunction() {
    updateBackgroundColor('#004d65', pomodoroBreak);
    session_seconds = 59;
    session_minutes = 24;
    document.getElementById('minutes').innerHTML = 25;
    document.getElementById('seconds').innerHTML = '00';
    pomodoroBreakProps.disabled = true;
}

function shortBreakFunction() {
    updateBackgroundColor('#01607d', shortBreak);
    session_seconds = 59;
    session_minutes = 4;
    document.getElementById('minutes').innerHTML = 5;
    document.getElementById('seconds').innerHTML = '00';
    shortBreakProps.disabled = true;
}

function longBreakFunction() {
    updateBackgroundColor('#007699', longBreak);
    session_seconds = 59;
    session_minutes = 14;
    document.getElementById('minutes').innerHTML = 15;
    document.getElementById('seconds').innerHTML = '00';
    longBreakProps.disabled = true;
}

function stop() {
    stopButtonProps.disabled = true;
    startButtonProps.disabled = false;
}

function start() {
    startButtonProps.disabled = true;
    stopButtonProps.disabled = false;

    if (++counterForStartButton === 1) {
        const minutes_interval = setInterval(minutesTimer, 60000);
        const seconds_interval = setInterval(secondsTimer, 1000);

        function minutesTimer() {
            session_minutes--;
            document.getElementById('minutes').innerHTML = session_minutes;
        }

        function secondsTimer() {
            session_seconds--;
            document.getElementById('seconds').innerHTML = session_seconds;

            if (stopButtonProps.disabled) {
                clearInterval(seconds_interval);
                counterForStartButton = 0;
                return;
            }

            if (session_seconds <= 0) {
                if (session_minutes <= 0) {
                    clearInterval(minutes_interval);
                    clearInterval(seconds_interval);

                    if (shortBreakProps.disabled) {
                        pomodoroBreakFunction();
                        start();
                    } else {
                        shortBreakFunction();
                        start();
                        if (++cycleCounterForLongBreak === 2) {
                            alert('Congratulations on completing 4 pomodoros. You can take a long break now.');
                            cycleCounterForLongBreak = 0;
                            longBreakFunction();
                        }
                    }
                    counterForStartButton = 0;
                }
                session_seconds = 60;
            }
        }
    }
}

document.getElementById('pomodoroButton').addEventListener('click', start);
document.getElementById('stopButton').addEventListener('click', stop);
stopButtonProps.disabled = true;
