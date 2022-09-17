function processStatusCell(statusCell) {
    statusCell.dataset.oldInnerHTML = statusCell.innerHTML;
    testNumber = statusCell.querySelector(".verdict-format-judged");
    if (testNumber) {
        testNumber.innerHTML = "";
    }
    statusCell.innerHTML = statusCell.innerHTML.replace("на тесте", "").replace("on test", "");
}

function callback() {
    chrome.storage.sync.get("enabled", ({ enabled }) => {
        if (enabled) {
            statusCells = document.querySelectorAll(".status-cell");
            for (i = 0; i < statusCells.length; i++) {
                processStatusCell(statusCells[i]);
            }
        }
    });
}

const observer = new MutationObserver((mutationList, observer) => {callback();});
observer.observe(document, { attributes: true, childList: true, subtree: true });
