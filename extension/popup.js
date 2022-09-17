const input = document.getElementById("cf-icpc-wf-enabled");

chrome.storage.sync.get("enabled", ({ enabled }) => { input.checked = enabled; });
input.addEventListener("change", () => { chrome.storage.sync.set({ 'enabled' : input.checked }); });
