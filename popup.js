document.getElementById("viewSheets").addEventListener("click", viewSheets);

function viewSheets() {
  window.open(chrome.extension.getURL('savedJobs.html'), '_blank');
}
