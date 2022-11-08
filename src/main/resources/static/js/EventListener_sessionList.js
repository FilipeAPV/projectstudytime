window.onload = function () {

    const saveBtnForEditModal = document.getElementById("saveBtnForEditModal");
    const formEdit = document.getElementById("formEdit");
    const formInputContent = document.getElementById("formInputContent");
    const formInputFeelings = document.getElementById("formInputFeelings");
    const saveBtn = document.getElementById("saveBtn");

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

            showModalPreview();
        }
    });

    // Save Session from Modal for Editing
    saveBtn.addEventListener("click", function (){
       formEdit.submit();
    });
}

