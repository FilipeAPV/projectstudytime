window.onload = function () {
    const saveBtn = document.getElementById("saveBtn");
    const sessionForm = document.getElementById("sessionForm");

    // Set value (date) of the hidden form field
    function setDateToHiddenValue() {
        const date = new Date();

        let month = date.getMonth() + 1;
        if (month < 10) {month = '0' + month;}

        let day = date.getDate();
        if (day < 10) {day = '0' + day;}

        const formattedDate = date.getFullYear() + '-' + month + '-' + day;
        document.getElementById("sessionDate").setAttribute("value", formattedDate);
    }

    // Save Session from Modal for Preview
    saveBtn.addEventListener("click", function (){
        setDateToHiddenValue();
        sessionForm.submit();
    });
}

