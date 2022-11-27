// Preview in Modal
function returnMarkdownFromOneSession(id) {
    idFecthedByGetSessionMarkdown = id;
    let hiddenTextAreaSessionList = document.getElementById("textarea-hidden");
    const previewModalSaveBtn = document.getElementById("saveBtn");

    fetch("/getSessionMarkdown/" + id)
        .then(response => response.text())
        .then(data => {
            hiddenTextAreaSessionList.value = data;

            const markdownDivSessionList = document.getElementById("markdownPreview");
            markdownDivSessionList.innerHTML = "";

            const previewModal = new bootstrap.Modal(document.getElementById("previewModal"), {});

            const valueToAdd = "<md-block>" + hiddenTextAreaSessionList.value + "</md-block>";

            const markdownDiv = document.getElementById("markdownPreview");

            markdownDiv.insertAdjacentHTML("beforeend", valueToAdd);

            previewModalSaveBtn.setAttribute("hidden", "");

            previewModal.show();

        });
}