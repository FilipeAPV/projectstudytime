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
 * TextArea
 */

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

// Return an Array of all the lines inside the text area
function getLines(textArea) {
    return textArea.value.split("\n");
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
function isTheTextAreaEmpty(arrayWithLines) {
    return arrayWithLines.length === 1 && arrayWithLines[0] === "";
}

// Get text inside the label from field id
function getLabelFromFieldId(fieldId) {
    const labelId = fieldId + "Label";
    return document.getElementById(labelId).innerHTML;
}

// Return an Array of valid lines or sends a Modal message and stops execution.
function validateLines(arrayWithLines, textAreaId) {

    const nameToDisplay = getLabelFromFieldId(textAreaId);
    const modalTitle = "Validation Error: " + "<b>" + nameToDisplay + "</b>";

    let validLines = [];

    if (isTheTextAreaEmpty(arrayWithLines)) {
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

        console.log("Line: " + lineNumberForUser);
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
            line = line.substring(Math.abs(emptySpacesToAdd) + 1);
        }

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

function validateAndIdentTextArea(textAreaId, isMandatory) {
    const currentTextArea = document.getElementById(textAreaId);
    const hiddenTextArea = document.getElementById("textarea-hidden");

    let lines = getLines(currentTextArea);

    if (isTheTextAreaEmpty(lines) && !isMandatory) {
       return true;
    }

    let validLines = validateLines(lines, textAreaId);
    if (validLines !== false) {
        const indentedLines = indentAllTabs(validLines);
        const indentedLinesToString = convertArrayToString(indentedLines);

        hiddenTextArea.value += "      # " + getLabelFromFieldId(textAreaId);
        hiddenTextArea.value += "\n";
        hiddenTextArea.value += indentedLinesToString;
        return true;
    }

    return false;
}