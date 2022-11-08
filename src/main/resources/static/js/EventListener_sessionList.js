window.onload = function () {

    /* DUPLICATED CODE ON BOTH EVENT LISTENERS */
    displayTime();
    displayDayMonthYear();

    const saveBtnForEditModal = document.getElementById("saveBtnForEditModal");
    const formEdit = document.getElementById("formEdit");



    // Save Session from Modal for Editing
    saveBtnForEditModal.addEventListener("click", function (){
        formEdit.submit();
        console.log("saveBtnForEditModal pressed");
    });







}

