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
function currentTime() {
    const currentDate = new Date();

    let hourOfTheDay = currentDate.getHours();
    let minuteOfTheDay = currentDate.getMinutes();
    let secondOfTheDay = currentDate.getSeconds();

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

// Executes the function displayTime() every second
function continuousExecution(){
    var refresh=1000; // Refresh rate in milli seconds
    setTimeout('displayTime()',refresh);
}

// Updates the front-end element
function displayTime() {
    document.getElementById("top_timeDisplay").innerHTML = currentTime();
    continuousExecution();
}

/**
 * START, PAUSE, RESUME, STOP functionality
 */

function setStartTimeOfStudySession() {
    document.getElementById("labelStartTime").textContent = currentTime();

    document.getElementById("btnSetSessionPauseTime").removeAttribute("disabled");
    document.getElementById("btnSetSessionStopTime").removeAttribute("disabled");

    document.getElementById("btnSetSessionStartTime").setAttribute("disabled","");
}
function setPauseTimeOfStudySession() {
    document.getElementById("labelPauseTime").textContent = currentTime();

    document.getElementById("btnSetSessionResumeTime").removeAttribute("disabled");

    document.getElementById("btnSetSessionPauseTime").setAttribute("disabled","");
    document.getElementById("btnSetSessionStopTime").setAttribute("disabled","");
}
function setResumeTimeOfStudySession() {
    document.getElementById("labelResumeTime").textContent = currentTime();

    document.getElementById("btnSetSessionStopTime").removeAttribute("disabled");

    document.getElementById("btnSetSessionResumeTime").setAttribute("disabled","");


}
function setStopTimeOfStudySession() {
    document.getElementById("labelStopTime").textContent = currentTime();

    document.getElementById("btnSetSessionStopTime").setAttribute("disabled","");
}