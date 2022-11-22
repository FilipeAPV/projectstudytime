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
    const previewModalEditBtn = document.getElementById("previewModalEditBtn");
    const previewModalDeleteBtn = document.getElementById("previewModalDeleteBtn");
    const labelStartTime = document.getElementById("labelStartTime");
    const labelStopTime = document.getElementById("labelStopTime");
    const currentPauseStartTimeHidden = document.getElementById("currentPauseStartTimeHidden");
    const currentStartTimeHidden = document.getElementById("currentStartTimeHidden");
    const previewModalFooter = document.getElementById("previewModalFooter");
    const previewModalFooterInvalidMessage = document.getElementById("previewModalFooterInvalidMessage");

    /* DUPLICATED CODE ON BOTH EVENT LISTENERS */
    displayTime();
    displayDayMonthYear();

    allowTabInsideTextArea(sessionContent);
    allowTabInsideTextArea(sessionFeelings);

    //Textarea validation
    previewAndSaveBtn.addEventListener("click", function (){
        const markdownDiv = document.getElementById("markdownPreview");
        const previewModalEditBtn = document.getElementById("previewModalEditBtn");
        const saveBtn = document.getElementById("previewModalEditBtn");

        markdownDiv.innerHTML = "";
        document.getElementById("textarea-hidden").value = "";
        previewModalEditBtn.setAttribute("hidden","");
        previewModalDeleteBtn.setAttribute("hidden", "");

        let isValidated = validateAndIdentTextArea("sessionContent", true);
        if (isValidated) { isValidated = validateAndIdentTextArea("sessionFeelings", false); }
        if (isValidated) {showModalPreview();}
    });

    //Open Session List page
    //Submit form with parameters to be saved in the Session
    goToSessionListBtn.addEventListener("click", function (){
        currentSessionStateHidden.setAttribute("value", currentSessionState);
        currentPauseStartTimeHidden.setAttribute("value", sessionPauseStartTime);
        currentStartTimeHidden.setAttribute("value", sessionStartTime);

        sessionForm.action = "/sessionList";
        sessionForm.submit();
    });

    //Invalidate Session and Redirects "/"
    createNewSessionBtn.addEventListener("click", function (){
        returnNewSession();
    });

    // Save Session from Modal for Preview
    saveBtn.addEventListener("click", function (){

        const hasStartTime = labelStartTime.value;
        const hasStopTime = labelStopTime.value;

        if (hasStartTime && hasStopTime) {
            setDateToHiddenValue();
            sessionForm.submit();
        } else {
            console.log("Invalid Session Time.")
            previewModalFooterInvalidMessageAction("showMsg");
        }

    });

    //Close Indentation Modal and set textarea.value to original values
    previewModalCloseBtn.addEventListener("click", function (){
        restoreOriginalTextAreaValues();
        previewModalFooterInvalidMessageAction("removeMsg");
    });

    function previewModalFooterInvalidMessageAction(action) {

        let flexJustifyToAdd = "", flexJustifyToRemove= "", visibilityStatus= "";

        if (action === "showMsg") {
            flexJustifyToAdd = "justify-content-between";
            flexJustifyToRemove = "justify-content-end";
            visibilityStatus = "visible"
        } else if (action === "removeMsg") {
            flexJustifyToRemove = "justify-content-between";
            flexJustifyToAdd = "justify-content-end";
            visibilityStatus = "hidden";
        }

        previewModalFooter.classList.add(flexJustifyToAdd);
        previewModalFooter.classList.remove(flexJustifyToRemove);
        previewModalFooterInvalidMessage.style.visibility = visibilityStatus;
    }



}