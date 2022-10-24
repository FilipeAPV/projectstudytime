/**
 * Global Variables
 */

let isSessionOngoing = false;

/**
 * Display Date as: Mon Oct 24 2022
 */

function displayDayMonthYear() {
    const currentDate = new Date();
    const dateToShow = currentDate.toDateString();
    document.getElementById('top_dateMonthYearDisplay').innerHTML = dateToShow;
}

/**
 * Display Time
 *  Display Time as: 10:23:44
 *  Updates every second
 */

// "0" are added in order for the backend to correctly parse Date from String
function formatTime(hourOfTheDay, minuteOfTheDay, secondOfTheDay) {
    if (hourOfTheDay >= 0 && hourOfTheDay <= 9) {
        hourOfTheDay = "0" + hourOfTheDay;
    }

    if (minuteOfTheDay >= 0 && minuteOfTheDay <=9) {
        minuteOfTheDay = "0" + minuteOfTheDay;
    }

    if (secondOfTheDay >= 0 && secondOfTheDay <= 9) {
        secondOfTheDay = "0" + secondOfTheDay;
    }

    const currentTime = hourOfTheDay + ":" + minuteOfTheDay + ":" + secondOfTheDay;

    return currentTime;
}

// Get current time
function currentTime() {
    const currentDate = new Date();

    let hourOfTheDay = currentDate.getHours();
    let minuteOfTheDay = currentDate.getMinutes();
    let secondOfTheDay = currentDate.getSeconds();

    const currentTime = formatTime(hourOfTheDay, minuteOfTheDay, secondOfTheDay);

    return currentTime;
}

// Executes the function displayTime() every second
function continuousExecution(){
    var refresh=1000; // Refresh rate in milli seconds
    setTimeout('displayTime()',refresh);
}

// Updates the front-end element
function displayTime() {
    document.getElementById("top_timeDisplay").innerHTML = currentTime();

    if (isSessionOngoing) {
        calcStudySessionTimer();
        document.getElementById("divCurrentStudySessionTimer").removeAttribute("hidden");
    }

    continuousExecution();
}

/**
 * START, PAUSE, RESUME, STOP functionality
 */

function setStartTimeOfStudySession() {
    isSessionOngoing = true;

    document.getElementById("labelStartTime").value = currentTime();

    document.getElementById("btnSetSessionPauseTime").removeAttribute("disabled");
    document.getElementById("btnSetSessionStopTime").removeAttribute("disabled");

    document.getElementById("btnSetSessionStartTime").setAttribute("disabled","");

    showStudySessionTimer();
}

function setPauseTimeOfStudySession() {
    isSessionOngoing = false;

    document.getElementById("labelPauseTime").value = currentTime();

    document.getElementById("btnSetSessionResumeTime").removeAttribute("disabled");

    document.getElementById("btnSetSessionPauseTime").setAttribute("disabled","");
    document.getElementById("btnSetSessionStopTime").setAttribute("disabled","");
}

function setResumeTimeOfStudySession() {
    isSessionOngoing = true;

    document.getElementById("labelResumeTime").value = currentTime();

    document.getElementById("btnSetSessionStopTime").removeAttribute("disabled");

    document.getElementById("btnSetSessionResumeTime").setAttribute("disabled","");
}

function setStopTimeOfStudySession() {
    isSessionOngoing = false;

    document.getElementById("labelStopTime").value = currentTime();

    document.getElementById("btnSetSessionStopTime").setAttribute("disabled","");
}

/**
 * Study Session Timer
 * Time elapsed since the start of the study session
 */

let seconds = 0;
let minutes = 0;
let hours = 0;

function calcStudySessionTimer() {
    if (!isSessionOngoing) {
        return;
    }

    seconds++;

    if (seconds === 60) {
        minutes++;
        seconds = 0;
    }

    if (minutes === 60) {
        hours++;
        minutes = 0;
    }

    let timeElapsed = formatTime(hours, minutes, seconds);

    document.getElementById("textCurrentStudySessionTimer").textContent = timeElapsed;
}

/**
 * Session Form
 */

// Set content of the hidden field
function setDateToHiddenValue() {
    const date = new Date();

    let month = date.getMonth() + 1;
    if (month < 10) {month = '0' + month;}

    let day = date.getDate();
    if (day < 10) {day = '0' + day;}

    const formattedDate = date.getFullYear() + '-' + month + '-' + day;
    document.getElementById("sessionDate").setAttribute("value", formattedDate);
}

/*Allow Tab inside textAreas*/
function allowTabInsideTextArea(elementId) {
    const textAreaField = document.getElementById(elementId);

    textAreaField.addEventListener('keydown', (key) => {
        if (key.code === "Tab") {
            key.preventDefault();
            textAreaField.setRangeText(
                '      ', // 6 empty spaces
                textAreaField.selectionStart,
                textAreaField.selectionStart,
                'end'
            )
        }
    });
}

// TODO: Line Validation