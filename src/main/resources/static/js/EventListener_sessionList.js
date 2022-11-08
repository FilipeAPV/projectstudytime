window.onload = function () {

    const saveBtnForEditModal = document.getElementById("saveBtnForEditModal");
    const formEdit = document.getElementById("formEdit");
    const formInputContent = document.getElementById("formInputContent");
    const formInputFeelings = document.getElementById("formInputFeelings");

    /* DUPLICATED CODE ON BOTH EVENT LISTENERS */
    displayTime();
    displayDayMonthYear();

    //Textarea validation

    /* */

    allowTabInsideTextArea(formInputContent);
    allowTabInsideTextArea(formInputFeelings)


    // Save Session from Modal for Editing
    saveBtnForEditModal.addEventListener("click", function (){

        const markdownDiv = document.getElementById("markdownPreview");
        markdownDiv.innerHTML = "";
        document.getElementById("textarea-hidden").value = "";

        /* revert value of textarea */
        revertIndentation("formInputContent");

        let isValidated = validateAndIdentTextArea("formInputContent", true);
        if (isValidated) { isValidated = validateAndIdentTextArea("formInputFeelings", false); }
        if (isValidated) {
            showModalPreview();
            console.log("Form would have been saved");
        }

        //formEdit.submit();

    });







}

