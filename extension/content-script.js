function processStatusCell(statusCell) {
    statusCell.dataset.oldInnerHTML = statusCell.innerHTML;
    testNumber = statusCell.querySelector(".verdict-format-judged");
    if (testNumber) {
        testNumber.innerHTML = "";
    }
    statusCell.innerHTML = statusCell.innerHTML.replace("на тесте", "").replace("on test", "");
}

function processResourceCell(resourceCell) {
    resourceCell.innerHTML = "";
}

function callback() {
    chrome.storage.sync.get("enabled", ({ enabled }) => {
        if (enabled) {
            statusCells = document.querySelectorAll(".status-cell");
            for (i = 0; i < statusCells.length; i++) {
                processStatusCell(statusCells[i]);
            }
            timeCells = document.querySelectorAll(".time-consumed-cell");
            for (i = 0; i < timeCells.length; i++) {
                processResourceCell(timeCells[i]);
            }
            memoryCells = document.querySelectorAll(".memory-consumed-cell");
            for (i = 0; i < memoryCells.length; i++) {
                processResourceCell(memoryCells[i]);
            }
        }
    });
}

const observer = new MutationObserver((mutationList, observer) => {callback();});
observer.observe(document, { attributes: true, childList: true, subtree: true });
