/**
 * Global Variables
 */

let currentSessionState = "NOTSTARTED";
let isOnGoing = false;
let idFecthedByGetSessionMarkdown = 0;

let sessionPauseStartTime = 0;
let sessionPauseTempCounter = 0;
let totalSessionPauseTime = 0;

let sessionStartTime = 0;
let sessionTimeTempCounter = 0;
let totalSessionStudyTime = 0;

console.log("TimeAndDate.js - Session state by default is: " + currentSessionState);

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

// Get current time formatted as String
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

// Updates the front-end elements (pause time and study session time)
function displayTime() {
    document.getElementById("top_timeDisplay").innerHTML = currentTime();

    isOnGoing = (currentSessionState === "STARTED");
    const isPause = (currentSessionState === "PAUSED");

    if (isOnGoing) {
        sessionTimeTempCounter = Math.abs(new Date() - sessionStartTime);
        totalSessionStudyTime = sessionTimeTempCounter - totalSessionPauseTime;

        document.getElementById("textCurrentStudySessionTimer").textContent = msToTime(totalSessionStudyTime);
        document.getElementById("divCurrentStudySessionTimer").classList.remove("invisible");
    }

    if (isPause) {
        sessionPauseTempCounter = Math.abs(new Date() - sessionPauseStartTime);
        document.getElementById("labelPauseTime").value = msToTime(totalSessionPauseTime + sessionPauseTempCounter);


        console.log("\nif (isPause) {")
        console.log("sessionPauseStartTime - " + sessionPauseStartTime + " " + typeof sessionPauseStartTime);
        console.log("sessionPauseTempCounter - " + sessionPauseTempCounter + " " + typeof sessionPauseTempCounter);
        console.log("totalSessionPauseTime - " + totalSessionPauseTime + " " + typeof totalSessionPauseTime);
    }

    continuousExecution();
}

/**
 * START, PAUSE, RESUME, STOP functionality
 */

// Define BTN disabled and enabled state
function setBtnState(currentSessionState) {
    switch (currentSessionState) {
        case "STARTED" : {
            document.getElementById("btnSetSessionPauseTime").removeAttribute("disabled");
            document.getElementById("btnSetSessionStopTime").removeAttribute("disabled");

            document.getElementById("btnSetSessionStartTime").setAttribute("disabled","");
            document.getElementById("btnSetSessionPauseTime").textContent = "PAUSE";
        }
        break;
        case "PAUSED" : {

            document.getElementById("btnSetSessionStartTime").setAttribute("disabled","");
            document.getElementById("btnSetSessionStopTime").setAttribute("disabled","");
            document.getElementById("btnSetSessionPauseTime").removeAttribute("disabled");

            document.getElementById("btnSetSessionPauseTime").textContent = "RESUME";
        }
        break;
        case "STOPPED" : {
            document.getElementById("btnSetSessionStopTime").setAttribute("disabled","");
            document.getElementById("btnSetSessionStartTime").setAttribute("disabled","");
            document.getElementById("btnSetSessionPauseTime").setAttribute("disabled","");
        }
        break;
    }
}

function setStartTimeOfStudySession() {
    currentSessionState = "STARTED";

    document.getElementById("labelStartTime").value = currentTime();

    sessionStartTime = new Date().getTime();

    console.log("TimeAndDate.js - sessionStartTime: " + sessionStartTime + " " + typeof sessionStartTime);
    console.log("TimeAndDate.js - totalSessionPauseTime: " +  msToTime(totalSessionPauseTime) + " " + typeof totalSessionPauseTime);

    setBtnState(currentSessionState);
}

function setPauseTimeOfStudySession() {

    if (currentSessionState === "STARTED") {

        currentSessionState = "PAUSED";

        sessionPauseStartTime = new Date().getTime();

        setBtnState(currentSessionState);

        console.log("TimeAndDate.js - sessionPauseTempCounter: " + msToTime(sessionPauseTempCounter));
        console.log("TimeAndDate.js - totalSessionPauseTime: " +  msToTime(totalSessionPauseTime));
        console.log("TimeAndDate.js - sessionTimeTempCounter: " + msToTime(sessionTimeTempCounter) + "\n");


    } else {

        totalSessionPauseTime += sessionPauseTempCounter;
        sessionPauseTempCounter = 0;

        document.getElementById("labelPauseTime").value = msToTime( totalSessionPauseTime);

        currentSessionState = "STARTED";
        setBtnState(currentSessionState);

        console.log("totalSessionPauseTime: " + msToTime(totalSessionPauseTime))
        console.log("sessionPauseTempCounter: " + msToTime(sessionPauseTempCounter))
        console.log("sessionPauseStartTime: " + sessionPauseStartTime)

    }
}

function msToTime(milliseconds) {
    const hours = Math.floor(milliseconds / 3600000);
    const minutes = Math.floor((milliseconds % 3600000) / 60000);
    const seconds = Math.floor(((milliseconds % 3600000) % 60000) / 1000);
    return formatTime(hours, minutes, seconds);
}

function timeToMs(time) {
    const hours = Number(time.substring(0,2)) * 3600000;
    const minutes = Number(time.substring(3,5)) * 60000;
    const seconds = Number(time.substring(6) * 1000);
    const totalMs = hours + minutes + seconds;

    console.log("TimeAnDate.js | timeToMs(time) : " + msToTime(totalMs));

    return totalMs;
}

function setStopTimeOfStudySession() {
    currentSessionState = "STOPPED";

    document.getElementById("labelStopTime").value = currentTime();

    setBtnState(currentSessionState);
}

async function returnNewSession() {
    const response = await fetch("/deleteCurrentSessionAttribute");
    console.log(response);
    window.location="/";
}

/**
 * Session Form
 */

// Set value (date) of the hidden form field
function setDateToHiddenValue() {
    const date = new Date();

    let month = date.getMonth() + 1;
    if (month < 10) {month = '0' + month;}

    let day = date.getDate();
    if (day < 10) {day = '0' + day;}

    const formattedDate = date.getFullYear() + '-' + month + '-' + day;
    document.getElementById("sessionDate").setAttribute("value", formattedDate);
}

