window.onload = function () {

    const saveBtnForEditModal = document.getElementById("saveBtnForEditModal");
    const formEdit = document.getElementById("formEdit");
    const formInputContent = document.getElementById("formInputContent");
    const formInputFeelings = document.getElementById("formInputFeelings");
    const saveBtn = document.getElementById("saveBtn");
    const previewModalEditBtn = document.getElementById("previewModalEditBtn");
    const previewModal = document.getElementById("previewModal");
    const previewModalCloseBtn = document.getElementById("previewModalCloseBtn");
    const divPauseTime = document.getElementById("formEdit_pauseTime");
    const divResumeTime = document.getElementById("formEdit_resumeTime");
    const editModal = document.getElementById("editModal");
    const btnCalendarExport = document.getElementById("btnCalendarExport");
    const btnCalendarFilter = document.getElementById("btnCalendarFilter");
    const inputCalendarStartDate = document.getElementById("startDate");
    const inputCalendarEndDate = document.getElementById("endDate");



    /* DUPLICATED CODE ON BOTH EVENT LISTENERS */
    displayTime();
    displayDayMonthYear();
    /* */

    allowTabInsideTextArea(formInputContent);
    allowTabInsideTextArea(formInputFeelings)


    // Validate Session from Modal for Editing
    saveBtnForEditModal.addEventListener("click", function (){

        const markdownDiv = document.getElementById("markdownPreview");

        markdownDiv.innerHTML = "";
        document.getElementById("textarea-hidden").value = "";

        let isValidated = validateAndIdentTextArea("formInputContent", true);
        if (isValidated) { isValidated = validateAndIdentTextArea("formInputFeelings", false); }
        if (isValidated) {

            previewModalEditBtn.setAttribute("hidden","");
            saveBtn.removeAttribute("hidden");

            showModalPreview();
                    }
    });

    // Save Session from Modal for Editing
    saveBtn.addEventListener("click", function (){
       formEdit.submit();
    });

    // Revert hidden attribute from btns when Preview Modal is closed
    previewModal.addEventListener('hidden.bs.modal', function () {
        saveBtn.setAttribute("hidden","");
        previewModalEditBtn.removeAttribute("hidden");
    })

    // Revert hidden attribute from input text when Edit Modal is closed
    editModal.addEventListener('hidden.bs.modal', function () {
        divPauseTime.hidden = false;
        divResumeTime.hidden = false;
    })

    //Close Indentation Modal and set textarea.value to original values
    previewModalCloseBtn.addEventListener("click", function (){
        restoreOriginalTextAreaValues();
    });

    //
    inputCalendarStartDate.addEventListener("click", function (){

    });

    // Export session in data range as markdown
    btnCalendarExport.addEventListener("click", function (){
        const startDate = inputCalendarStartDate.value;
        const endDate = inputCalendarEndDate.value;

        if (startDate && endDate) {
            const link = "/export/" + startDate + "/" + endDate;
            btnCalendarExport.href = link;
        }
    });

    // Filter displayed sessions by date
    btnCalendarFilter.addEventListener("click", function (){
        const startDate = inputCalendarStartDate.value;
        const endDate = inputCalendarEndDate.value;

        if (startDate && endDate) {
            const link = "/sessionList/" + 1 + "?sortField=date&sortDir=dsc" + "&startDate=" + startDate + "&endDate=" + endDate;
            btnCalendarFilter.href = link;
        }
    });
}

