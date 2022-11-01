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
    const previewAndSaveBtn = document.getElementById("previewAndSaveBtn");
    const goToSessionListBtn = document.getElementById("goToSessionListBtn");
    const previewModalCloseBtn = document.getElementById("previewModalCloseBtn");
    const currentSessionStateHidden = document.getElementById("currentSessionStateHidden");
    const createNewSessionBtn = document.getElementById("createNewSessionBtn");

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
    previewAndSaveBtn.addEventListener("click", function (){
        const markdownDiv = document.getElementById("markdownPreview");
        markdownDiv.innerHTML = "";
        document.getElementById("textarea-hidden").value = "";

        let isValidated = validateAndIdentTextArea("sessionContent", true);
        if (isValidated) { isValidated = validateAndIdentTextArea("sessionFeelings", false); }
        if (isValidated) {showModalPreview();}
    });

    //Close Indentation Modal and set textarea.value to original values
    previewModalCloseBtn.addEventListener("click", function (){
       if (originalTextAreaValues !== null) {
           originalTextAreaValues.forEach((value, key) => {
                document.getElementById(key).value = value;
           });
       }
    });

    //Open Session List page
    //Submit form with parameters
    goToSessionListBtn.addEventListener("click", function (){
        currentSessionStateHidden.setAttribute("value", currentSessionState);
        sessionForm.action = "/sessionList";
        sessionForm.submit();
    });

    //Invalidate Session and Redirects "/"
    createNewSessionBtn.addEventListener("click", function (){
        returnNewSession();
    });
}

