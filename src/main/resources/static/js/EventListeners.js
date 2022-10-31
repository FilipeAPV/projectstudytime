/*Allow Tab inside textAreas*/
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

window.onload = function () {
    const saveBtn = document.getElementById("saveBtn");
    const sessionForm = document.getElementById("sessionForm");
    const sessionContent = document.getElementById("sessionContent");
    const sessionFeelings = document.getElementById("sessionFeelings");
    const testBtn2 = document.getElementById("testbtn2");


    displayTime();
    displayDayMonthYear();
    allowTabInsideTextArea(sessionContent);
    allowTabInsideTextArea(sessionFeelings);

    // Save Session from Modal for Preview
    saveBtn.addEventListener("click", function (){
        setDateToHiddenValue();
        sessionForm.submit();
    });

    //Textarea validation
    testBtn2.addEventListener("click", function (){
        const markdownDiv = document.getElementById("markdownPreview");
        markdownDiv.innerHTML = "";
        document.getElementById("textarea-hidden").value = "";

        let isValidated = validateAndIdentTextArea("sessionContent", true);
        if (isValidated) { isValidated = validateAndIdentTextArea("sessionFeelings", false); }
        if (isValidated) {showModalPreview();}
    });
}

