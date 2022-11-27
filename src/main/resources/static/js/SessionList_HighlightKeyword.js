// Iterate over all <p>
function iterateOverAllP() {
    const cells = document.querySelectorAll('p');
    cells.forEach(function (cell) {
        cell.innerHTML = highLightKeyWord(cell.innerText, keyword);
    })
}

// Highlight text in the <td> if equal to the keyword
function highLightKeyWord(rowValue, keyword) {
    let replacement = "<span style=\"background-color:#f0ad4e\n;font-weight: bold;\">"
        + keyword
        + "</span>";

    /*return rowValue.replaceAll(keyword, replacement);*/

    let regex = new RegExp(keyword, 'gi');
    return rowValue.replaceAll(regex, replacement);
}