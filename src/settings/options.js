function saveOptions(e) {
  browser.storage.local.set({
    settings: {
      faviconDisplay:document.querySelector('input[name=favicon-display]:checked').value
    }
  });
  e.preventDefault();
}

function restoreOptions() {

  function setCurrentChoice(result) {
    if (!result.settings) {
      document.querySelector('input[value="favicon-display-on"]').checked = true;
    }else{
      document.querySelector('input[value="'+result.settings.faviconDisplay+'"]').checked = true;
    }
  }

  function onError(error) {
    console.log(`Error: ${error}`);
  }

  var getting = browser.storage.local.get("settings");
  getting.then(setCurrentChoice, onError);
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);