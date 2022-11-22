/**
 * Global Variables
 */

let currentSessionState = "NOTSTARTED";
let isOnGoing = false;
let idFecthedByGetSessionMarkdown = 0;

let sessionStudyCounter = zeroDateValues(new Date());

let sessionPauseStartTime = 0;
let sessionPauseTempCounter = 0;
let totalSessionPauseTime = 0;

let sessionStartTime = 0;
let sessionTimeTempCounter = 0;
let totalSessionTime = 0;

console.log("CommunScripts.js - Session state by default is: " + currentSessionState);

/**
 * Allow Tab inside textAreas
 */
function allowTabInsideTextArea(textAreaField) {

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

    isOnGoing = (currentSessionState === "STARTED");
    const isPause = (currentSessionState === "PAUSED");

    if (isOnGoing) {
/*      sessionPauseTempCounter = Math.abs(new Date() - sessionPauseStartTime);
        document.getElementById("textCurrentStudySessionTimer").textContent = calcStudySessionTimer(sessionStudyCounter);
        document.getElementById("divCurrentStudySessionTimer").removeAttribute("hidden");*/
    }

    if (isPause) {

        sessionPauseTempCounter = Math.abs(new Date() - sessionPauseStartTime);
        document.getElementById("labelPauseTime").value = msToTime(totalSessionPauseTime + sessionPauseTempCounter);

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

    setBtnState(currentSessionState);
}

function setPauseTimeOfStudySession() {

    if (currentSessionState === "STARTED") {

        currentSessionState = "PAUSED";

        sessionPauseStartTime = new Date().getTime();

        setBtnState(currentSessionState);


        console.log("totalSessionPauseTime: " + totalSessionPauseTime)
        console.log("sessionPauseTempCounter: " + sessionPauseTempCounter)
        console.log("sessionPauseStartTime: " + sessionPauseStartTime)


    } else {

        totalSessionPauseTime += sessionPauseTempCounter;
        sessionPauseTempCounter = 0;

        currentSessionState = "STARTED";
        setBtnState(currentSessionState);

        console.log("totalSessionPauseTime: " + totalSessionPauseTime)
        console.log("sessionPauseTempCounter: " + sessionPauseTempCounter)
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
 * Set Date Time to 0H, 0M, 0S
 */
function zeroDateValues(date) {
    date.setHours(0,0,0);
    return date;
    //sessionStudyCounter.setHours(sessionStudyCounter.getHours() + (sessionStudyCounter.getTimezoneOffset()/60));
}

/**
 * Study Session Timer
 * Time elapsed since the start of the study session
 */

/*function calcStudySessionTimer(counter) {
    let currentTime = new Date(counter.getTime());
    currentTime.setSeconds(currentTime.getSeconds() + 1);

    counter.setTime(currentTime.getTime());

    let timeElapsed = formatTime(currentTime.getHours(), currentTime.getMinutes(), currentTime.getSeconds());

    console.log(timeElapsed);
    return timeElapsed;
}*/

/*function calcStudySessionTimer(counter) {
    const now = new Date();
    const then = sessionStartTime;

    const hours = Math.abs(now.getHours() - then.getHours());
    const minutes = Math.abs(now.getMinutes() - then.getMinutes());
    const seconds = now.getSeconds();

    return hours + " H " + minutes + " m ";
}*/


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

/**
 * TextArea
 */


// Return an Array of non-empty lines inside the text area
function getLines(textArea) {
    return removeEmptyLines(textArea.value.split("\n"));
}

// Return Array without Empty Lines
function removeEmptyLines(arrayWithLines) {
    let arrayWithoutEmptyLines = []
    for (let i of arrayWithLines) {
        if (i.trim().length !== 0) {
            arrayWithoutEmptyLines.push(i);
        }
    }
    return arrayWithoutEmptyLines;
}

// Counts number of empty spaced between 0 and the index of the character '-'
function countNumberOfEmptySpaces(line) {
    const index = line.indexOf('-');
    return line.substring(0, index).length;
}

// Algorithm to add or remove number of empty spaces
// Created based on the observation of the number of spaced needed to have a correct indentation
function numberOfEmptySpacesToAddOrRemove(numberOfEmptySpacesPresentPerLine) {
    const numberOfEmptySpacesByDefault = 6;
    let numberOfEmptySpaces = 0;
    for (let i = numberOfEmptySpacesByDefault, k = 4; i <= numberOfEmptySpacesPresentPerLine; i += numberOfEmptySpacesByDefault, k-=2) {
        numberOfEmptySpaces = k;
    }
    return numberOfEmptySpaces;
}

// Show Modal for Indentation Alerts
function showModalIndentation(title, message) {

    const indentationModal = new bootstrap.Modal(document.getElementById("indentationModal"), {});
    document.getElementById("indentationModalLabelTitle").innerHTML=title;
    document.getElementById("indentationModalLabelText").innerHTML=message;
    indentationModal.show();

}

// Show Modal for Preview
function showModalPreview() {
    const previewModal = new bootstrap.Modal(document.getElementById("previewModal"), {});

    const textareahidden = document.getElementById("textarea-hidden").value;

    const valueToAdd = "<md-block>" + textareahidden + "</md-block>";

    const markdownDiv = document.getElementById("markdownPreview");

    markdownDiv.insertAdjacentHTML("beforeend", valueToAdd);
    previewModal.show();
}

// Check if there are lines to validate
function isTheArrayEmpty(arrayWithLines) {
    return arrayWithLines.length === 0;
}

// Get text inside the <label></label> using field id
// Ex: fieldId = formInputContent and label id = formInputContentLabel
function getLabelFromFieldId(fieldId) {
    const labelId = fieldId + "Label";
    return document.getElementById(labelId).innerHTML;
}

// Return an Array of valid lines or sends a Modal message and stops execution.
function validateLines(arrayWithLines, textAreaId) {

    const nameToDisplay = getLabelFromFieldId(textAreaId);
    const modalTitle = "Validation Error: " + "<b>" + nameToDisplay + "</b>";

    let validLines = [];

    if (isTheArrayEmpty(arrayWithLines)) {
        showModalIndentation(modalTitle, "Please fill the content field");
        return false;
    }

    for (let i = 0; i < arrayWithLines.length; i++) {
        let lineNumberForUser = i + 1;
        let currentLine = arrayWithLines[i];

        // If Line does not have '-', Then Line is invalid
        if (currentLine.indexOf('-') === -1) {
            console.log("Line " + lineNumberForUser + " has an invalid format. All lines must start with '-' but no such character was found");
            showModalIndentation(modalTitle, "Line " + lineNumberForUser + " has an invalid format. All lines must start with '-' but no such character was found");
            return false;
        }

        const index = currentLine.indexOf('-');
        let newString = currentLine.substring(0, index);

        // If between the Line's index 0 and the '-' there is something else than ' ' (empty space)
        // Then Line is invalid
        for (let k = 0; k < newString.length; k++) {
            if (newString.charAt(k) !== " ") {
                console.log("Line " + lineNumberForUser + " has an invalid format. All lines must start with '-' but other characters were found");
                showModalIndentation(modalTitle, "Line " + lineNumberForUser + " has an invalid format. All lines must start with '-' but other characters were found");
                return false;
            }
        }

        // If number of empty spaces is not a multiple of 6, Then Line is invalid
        const isNotMultipleOfSix = countNumberOfEmptySpaces(currentLine) % 6 !== 0;
        if (isNotMultipleOfSix) {
            console.log("Line " + lineNumberForUser + " is not multiple of 6. Please use tab to indent the lines");
            showModalIndentation(modalTitle, "Line " + lineNumberForUser + " is not multiple of 6. Please use tab to indent the lines");
            return false;
        }

        // If there is no ' ' (empty space) after the '-', Then we add one.
        // Otherwise, Markdown does not recognize the line.
        if (currentLine.charAt(index+1) !== ' ') {
            const linePartOne = currentLine.substring(0, index+1);
            const linePartTwo = currentLine.substring(index+1);
            currentLine = linePartOne + ' ' + linePartTwo;
            console.log("Line " + i + ": No space detected after '-', so a space has been added");
        }

        validLines.push(currentLine);
    }

    return validLines;
}

// Indent each line by adding empty spaces
function indentAllTabs(arrayWithValidLines) {
    const startingSpace = "      ";
    const oneEmptySpace = " ";
    let line;
    let numberOfEmptySpaces;
    let emptySpacesToAdd = 0;
    let indentedArray = [];

    for (let i = 0; i < arrayWithValidLines.length; i++) {
        let lineNumberForUser = i + 1;
        line = arrayWithValidLines[i];
        numberOfEmptySpaces = countNumberOfEmptySpaces(line);
        // If line has no empty space, add the default of 6 empty spaces
        if (numberOfEmptySpaces === 0) {
            line = startingSpace + line;
            indentedArray.push(line);
            continue;
        }

        emptySpacesToAdd = numberOfEmptySpacesToAddOrRemove(numberOfEmptySpaces);

        console.log("\nLine: " + lineNumberForUser);
        console.log("Number of empty spaces: " + numberOfEmptySpaces);
        console.log("Number of spaces to add: " + emptySpacesToAdd);

        if (emptySpacesToAdd >= 0) {
            // k = 1 because we want 1 based counting.
            // Ex: If emptySpacesToAdd = 6, we want only 6 iterations and not 7 (would happen if k = 0)
            for (let k = 1; k <= emptySpacesToAdd; k++) {
                line = oneEmptySpace + line;
            }
        } else {
            // Remove the number of empty spaces by creating a shorter String
            line = line.substring(Math.abs(emptySpacesToAdd));
        }

        console.log("Final number of Empty Spaces: " + countNumberOfEmptySpaces(line));

        indentedArray.push(line);
        emptySpacesToAdd = 0;
    }
    return indentedArray;
}

function convertArrayToString(indentedArray) {
    let output = "";
    for (let i = 0; i < indentedArray.length; i++) {
        output += indentedArray[i] + "\n";
    }
    return output;
}

// Temporarily Store non-formatted textarea's values so we can close modal and still have non-formatted values
const originalTextAreaValues = new Map();

function restoreOriginalTextAreaValues()  {
    if (originalTextAreaValues !== null) {
        originalTextAreaValues.forEach((value, key) => {
            document.getElementById(key).value = value;
        });
    }
}

function validateAndIdentTextArea(textAreaId, isMandatory) {
    const currentTextArea = document.getElementById(textAreaId);
    const hiddenTextArea = document.getElementById("textarea-hidden");

    // Save original (non-formatted) values from textareas
    originalTextAreaValues.set(textAreaId, currentTextArea.value);

    let lines = getLines(currentTextArea);

    if (isTheArrayEmpty(lines) && !isMandatory) {
       return true;
    }

    let validLines = validateLines(lines, textAreaId);

    if (validLines !== false) {
        const indentedLines = indentAllTabs(validLines);
        const indentedLinesToString = convertArrayToString(indentedLines);

        //Value to be saved in the DB
        currentTextArea.value = indentedLinesToString;

        hiddenTextArea.value += "      # " + getLabelFromFieldId(textAreaId);
        hiddenTextArea.value += "\n";
        hiddenTextArea.value += indentedLinesToString;
        return true;
    }

    return false;
}

/* Revert Indentation */
function revertIndentation(textAreaId) {
    const currentTextArea = document.getElementById(textAreaId);
    let lines = getLines(currentTextArea);
    let linesIndentationReversed = [];
    let currentLine;
    let lineNumber = 0;
    let numberToAdd = 0;

    for (let line of lines) {
        console.log("\n");
        lineNumber++;
        let emptySpaces = countNumberOfEmptySpaces(line);

        if (emptySpaces === 6) {
            console.log("Line " + lineNumber + " has " + emptySpaces + " empty spaces")
            currentLine = line.substring(6);
            linesIndentationReversed.push(currentLine);
            console.log("Final empty spaces number: " + countNumberOfEmptySpaces(currentLine));
            continue;
        }

        // Starts at 10 because is the first number of empty spaces after 6
        for (let i = 10, k = -4; i <= emptySpaces; i+=4, k+=2) {
            numberToAdd = k;
        }

        console.log("Line " + lineNumber + " has " + emptySpaces + " empty spaces")
        // 18 is the last number where we remove empty spaces. In fact we remove 0 empty spaces.
        if (numberToAdd <= 0) {
            // Remove empty spaces
            currentLine = line.substring(Math.abs(numberToAdd));
            console.log("Empty Spaces to Remove: " + numberToAdd);
        } else {
            // Add empty spaces
            currentLine = addEmptySpacesToLine(numberToAdd, line);
            console.log("Empty Spaces to Add: " + numberToAdd);
        }
        console.log("Final empty spaces number: " + countNumberOfEmptySpaces(currentLine));
        linesIndentationReversed.push(currentLine);
    }
    //console.log(linesIndentationReversed);
    return convertArrayToString(linesIndentationReversed);
}

/**
 *
 * @param emptySpaces - number of empty spaces to add
 * @param line
 * @returns {string}
 */
function addEmptySpacesToLine(emptySpaces, line) {
    let emptySpace = "";

    for (let i = 0; i < emptySpaces; i++) {
        emptySpace += " ";
    }

    return emptySpace + line;
}