function processStatusCell(statusCell) {
    testNumber = statusCell.querySelector(".verdict-format-judged");
    if (testNumber) {
        testNumber.innerHTML = "";
    }
    statusCell.innerHTML = statusCell.innerHTML.replace("на тесте", "").replace("on test", "");
}

function callback() {
    console.log("callback() called");
    statusCells = document.querySelectorAll(".status-cell");
    for (i = 0; i < statusCells.length; i++) {
        processStatusCell(statusCells[i]);
    }
}

console.log("World Finals mode activated.");
callback();

const observer = new MutationObserver((mutationList, observer) => {callback();});

const datatables = document.querySelectorAll(".datatable");
for (i = 0; i < datatables.length; i++) {
    observer.observe(datatables[i], { attributes: true, childList: true, subtree: true });
}
