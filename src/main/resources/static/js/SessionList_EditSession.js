function returnSessionToEdit() {
    const id = idFecthedByGetSessionMarkdown;
    const form = document.getElementById("formEdit");
    const modalEditFormsH2 = document.getElementById("modalEditFormsH2");
    const formInputContent = document.getElementById("formInputContent");
    const formInputFeelings = document.getElementById("formInputFeelings");

    fetch("/getSessionToEdit/" + id)
        .then(response => response.json())
        .then(data => {
            const jsonFile = data;

            modalEditFormsH2.innerText = jsonFile.date + ' # ' + jsonFile.sessionNumber;

            $.each(jsonFile, function (key, value) {
                if (form.elements[key] != null) {
                    form.elements[key].value = value;
                }
            });

            /* revert value of textarea */
            formInputContent.value = revertIndentation("formInputContent");
            formInputFeelings.value = revertIndentation("formInputFeelings");
        });
}