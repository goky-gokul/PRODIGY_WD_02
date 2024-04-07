let timer;
let isRunning = false;
let startTime;
let pausedTime = 0; // Track paused time
let lapTimes = [];
let lapCounter = 1;

function startStop() {
    if (!isRunning) {
        if (pausedTime === 0) {
            startTime = new Date().getTime();
        } else {
            startTime = new Date().getTime() - pausedTime;
            pausedTime = 0;
        }
        timer = setInterval(updateTime, 10);
        document.getElementById("startStop").textContent = "Pause"; // Change button text to "Pause"
        isRunning = true;
    } else {
        clearInterval(timer);
        pausedTime = new Date().getTime() - startTime; // Calculate paused time
        document.getElementById("startStop").textContent = "Start"; // Change button text to "Start"
        isRunning = false;
    }
}

function updateTime() {
    let currentTime = new Date().getTime();
    let elapsedTime = currentTime - startTime;
    let formattedTime = formatTime(elapsedTime);
    document.getElementById("display").textContent = formattedTime;
}

// Other functions remain unchanged


function formatTime(milliseconds) {
    let totalSeconds = Math.floor(milliseconds / 1000);
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;
    let millisecondsDisplay = Math.floor((milliseconds % 1000) / 10);
    return (
        padTime(minutes) + ":" +
        padTime(seconds) + ":" +
        padTime(millisecondsDisplay)
    );
}

function padTime(value) {
    return value < 10 ? "0" + value : value;
}

function lapReset() {
    if (isRunning) {
        let lapTime = new Date().getTime() - startTime;
        lapTimes.push({
            lap: lapCounter++,
            time: formatTime(lapTime)
        });
        displayLaps();
    } else {
        document.getElementById("display").textContent = "00:00:00";
        lapTimes = [];
        lapCounter = 1;
        displayLaps();
    }
}

function displayLaps() {
    let lapsList = document.getElementById("laps");
    lapsList.innerHTML = "";
    lapTimes.forEach((lap, index) => {
        let li = document.createElement("li");
        li.textContent = "Lap " + lap.lap + ": " + lap.time;
        
        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.onclick = function() {
            deleteLap(index);
        };
        li.appendChild(deleteBtn);

        lapsList.appendChild(li);
    });
}

function deleteLap(index) {
    lapTimes.splice(index, 1);
    displayLaps();
}

function resetStopwatch() {
    clearInterval(timer);
    document.getElementById("display").textContent = "00:00:00";
    document.getElementById("startStop").textContent = "Start";
    isRunning = false;
    lapTimes = [];
    lapCounter = 1;
    displayLaps();
}
