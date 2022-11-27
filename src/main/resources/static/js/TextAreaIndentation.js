/************************
 ****** TextArea
 ************************/

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
 * @param textArea
 * @returns {*[]} Return an Array of non-empty lines inside the text area
 */
function getLines(textArea) {
    return removeEmptyLines(textArea.value.split("\n"));
}

/**
 * @param arrayWithLines
 * @returns {*[]} Return Array without Empty Lines
 */
function removeEmptyLines(arrayWithLines) {
    let arrayWithoutEmptyLines = []
    for (let i of arrayWithLines) {
        if (i.trim().length !== 0) {
            arrayWithoutEmptyLines.push(i);
        }
    }
    return arrayWithoutEmptyLines;
}

/**
 * @param line
 * @returns {number} Number of empty spaces between 0 and the index of the character '-'
 */
function countNumberOfEmptySpaces(line) {
    const index = line.indexOf('-');
    return line.substring(0, index).length;
}

/**
 * Algorithm to add or remove number of empty spaces
 * Created based on the observation of the number of spaces needed to have a correct indentation in Bitbucket
 * @param numberOfEmptySpacesPresentPerLine
 * @returns {number} Number of Empty spaces to add or remove
 */
function numberOfEmptySpacesToAddOrRemove(numberOfEmptySpacesPresentPerLine) {
    const numberOfEmptySpacesByDefault = 6;
    let numberOfEmptySpaces = 0;
    for (let i = numberOfEmptySpacesByDefault, k = 4; i <= numberOfEmptySpacesPresentPerLine; i += numberOfEmptySpacesByDefault, k-=2) {
        numberOfEmptySpaces = k;
    }
    return numberOfEmptySpaces;
}

/**
 * Show Modal for Indentation Alerts
 * @param title
 * @param message
 */
function showModalIndentation(title, message) {

    const indentationModal = new bootstrap.Modal(document.getElementById("indentationModal"), {});
    document.getElementById("indentationModalLabelTitle").innerHTML=title;
    document.getElementById("indentationModalLabelText").innerHTML=message;
    indentationModal.show();

}

/**
 * Show Modal for Preview as Markdown
 * @param title
 * @param message
 */
function showModalPreview() {
    const previewModal = new bootstrap.Modal(document.getElementById("previewModal"), {});

    const textareahidden = document.getElementById("textarea-hidden").value;

    const valueToAdd = "<md-block>" + textareahidden + "</md-block>";

    const markdownDiv = document.getElementById("markdownPreview");

    markdownDiv.insertAdjacentHTML("beforeend", valueToAdd);
    previewModal.show();
}

/**
 * Check if there are lines to validate
 * @param arrayWithLines
 * @returns {boolean} True if the array is empty
 */
function isTheArrayEmpty(arrayWithLines) {
    return arrayWithLines.length === 0;
}

/**
 * Ex: fieldId = formInputContent and label id = formInputContentLabel
 * @param fieldId
 * @returns {string} Text inside the <label></label> using field id
 */
function getLabelFromFieldId(fieldId) {
    const labelId = fieldId + "Label";
    return document.getElementById(labelId).innerHTML;
}

/**
 * @param arrayWithLines
 * @param textAreaId
 * @returns {boolean|*[]} Return an Array of valid lines OR Returns false (sends a Modal message and stops execution)
 */
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

/**
 * Indent each line by adding OR removing empty spaces
 * @param arrayWithValidLines
 * @returns {*[]} Array with indented lines
 */
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

/**
 * @param indentedArray
 * @returns {string} String of the indentedArray content
 */
function convertArrayToString(indentedArray) {
    let output = "";
    for (let i = 0; i < indentedArray.length; i++) {
        output += indentedArray[i] + "\n";
    }
    return output;
}

// Temporarily Store non-formatted textarea's values so we can close modal and still have non-formatted values
const originalTextAreaValues = new Map();

/**
 * Restore un-indented text from the textareas
 * Used if user decides not to save the session and close the modal
 * Without it, the user would have the indented text inside the textareas
 * and it would be impossible to re-save the session as the algorithm would try to indent it again.
 */
function restoreOriginalTextAreaValues()  {
    if (originalTextAreaValues !== null) {
        originalTextAreaValues.forEach((value, key) => {
            document.getElementById(key).value = value;
        });
    }
}

/**
 * Validate and Indent the TextAreas text
 * @param textAreaId
 * @param isMandatory
 * @returns {boolean}
 */
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

/**
 * Revert indentation from previously saved session
 * @param textAreaId
 * @returns {string}
 */
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