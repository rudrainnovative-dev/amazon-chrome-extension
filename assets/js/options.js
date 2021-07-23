document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('saveOptions').addEventListener('click', save_options);
document.getElementById('phrase_length').addEventListener('change', numValidate);

function restore_options() {
  chrome.storage.sync.get({
    includedRatings: 'all_stars',
    phraseLength: '10'
  },
  function(items) {
    document.getElementById('ratings').value = items.includedRatings;
    document.getElementById('phrase_length').value = items.phraseLength;
  });
}

function save_options() {
  var rating = document.getElementById('ratings').value;
  var phrase_length = document.getElementById('phrase_length').value;
  chrome.storage.sync.set({
    includedRatings: rating,
    phraseLength: phrase_length
  },
  function() {
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 1000);
  });
}

function numValidate(){
  var num = document.getElementById('phrase_length').value;
  if(num > 15) {
    document.getElementById('phrase_length').value = 15;
  }
}