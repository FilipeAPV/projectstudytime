window.onload = function () {
    const previewAndSaveBtn = document.getElementById("previewAndSaveBtn");
    const sessionForm = document.getElementById("sessionForm");
    const goToSessionListBtn = document.getElementById("goToSessionListBtn");
    const currentSessionStateHidden = document.getElementById("currentSessionStateHidden");
    const createNewSessionBtn = document.getElementById("createNewSessionBtn");
    const saveBtn = document.getElementById("saveBtn");
    const previewModalCloseBtn = document.getElementById("previewModalCloseBtn");
    const sessionContent = document.getElementById("sessionContent");
    const sessionFeelings = document.getElementById("sessionFeelings");

    /* DUPLICATED CODE ON BOTH EVENT LISTENERS */
    displayTime();
    displayDayMonthYear();

    allowTabInsideTextArea(sessionContent);
    allowTabInsideTextArea(sessionFeelings);

    //Textarea validation
    previewAndSaveBtn.addEventListener("click", function (){
        const markdownDiv = document.getElementById("markdownPreview");
        markdownDiv.innerHTML = "";
        document.getElementById("textarea-hidden").value = "";

        let isValidated = validateAndIdentTextArea("sessionContent", true);
        if (isValidated) { isValidated = validateAndIdentTextArea("sessionFeelings", false); }
        if (isValidated) {showModalPreview();}
    });

    //Open Session List page
    //Submit form with parameters to be saved in the Session
    goToSessionListBtn.addEventListener("click", function (){
        currentSessionStateHidden.setAttribute("value", currentSessionState);
        sessionForm.action = "/sessionList";
        sessionForm.submit();
    });

    //Invalidate Session and Redirects "/"
    createNewSessionBtn.addEventListener("click", function (){
        returnNewSession();
    });

    // Save Session from Modal for Preview
    saveBtn.addEventListener("click", function (){
        setDateToHiddenValue();
        sessionForm.submit();
    });

    //Close Indentation Modal and set textarea.value to original values
    previewModalCloseBtn.addEventListener("click", function (){
        if (originalTextAreaValues !== null) {
            originalTextAreaValues.forEach((value, key) => {
                document.getElementById(key).value = value;
            });
        }
    });
}