function processStatusCell(statusCell) {
    testNumber = statusCell.querySelector(".verdict-format-judged");
    if (testNumber) {
        testNumber.innerHTML = "";
    }
    statusCell.innerHTML = statusCell.innerHTML.replace(" на тесте ", "").replace(" on test ", "");
}

function processResourceCell(resourceCell) {
    resourceCell.innerHTML = "";
}

function processMessage(message) {
    message.innerHTML = message.innerHTML.replace(/на тесте \d+/, "").replace(/on test \d+/, ""); 
}

function disconnect(observer) {
    observer.disconnect();
    observer.takeRecords();
}

function connect(observer) {
    observer.observe(document, { attributes: false, childList: true, subtree: true });
}

function withObserverDisabled(observer, action) {
    disconnect(observer);
    action();
    connect(observer);
}

function callback(observer) {
    chrome.storage.sync.get("enabled", ({ enabled }) => {
        if (enabled) {
            withObserverDisabled(observer, () => {
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
                messages = document.querySelectorAll(".message");
                for (i = 0; i < messages.length; i++) {
                    processMessage(messages[i]);
                }
                verdictMessages = document.querySelectorAll(".verdict-rejected");
                for (i = 0; i < verdictMessages.length; i++) {
                    processStatusCell(verdictMessages[i]);
                }
            });
        }
    });
}

const observer = new MutationObserver((mutationList, observer) => { callback(observer) });
connect(observer);
