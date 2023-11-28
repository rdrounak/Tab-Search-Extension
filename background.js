chrome.commands.onCommand.addListener(function (command) {
  if (command === 'toggle-extension') {
    chrome.tabs.create({ url: chrome.runtime.getURL('popup.html') })
  }
})
