// Saves options to chrome.storage
function save_options() {
  var displayText = document.getElementById('display-text').value;
  chrome.storage.sync.set({
    displayText: displayText
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  chrome.storage.sync.get({
    displayText: "Don't get distracted by Facebook"
  }, function(items) {
    document.getElementById('display-text').value = items.displayText;
  });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
