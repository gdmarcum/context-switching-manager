const saveBtn = document.getElementById('saveBtn')!;
const restoreBtn = document.getElementById('restoreBtn')!;
const tabList = document.getElementById('tabList')!;

type SavedTab = {
  title: string;
  url: string;
};

// When the popup opens, load and display any previously saved tabs
chrome.storage.local.get(
  ['workspace'],
  (result: { workspace?: SavedTab[] }) => {
    if (result.workspace) {
      displayTabs(result.workspace);
    }
  }
);

// When the button is clicked, save current tabs
saveBtn.addEventListener('click', () => {
  chrome.tabs.query({ currentWindow: true }, (tabs) => {
    const savedTabs: SavedTab[] = tabs.map(tab => ({
      title: tab.title ?? 'Untitled',
      url: tab.url ?? ''
    }));

    chrome.storage.local.set({ workspace: savedTabs }, () => {
      displayTabs(savedTabs);
    });
  });
});

// Open a new tab for each saved URL
restoreBtn.addEventListener('click', () => {
  chrome.storage.local.get(
    ['workspace'],
    (result: { workspace?: SavedTab[] }) => {
      if (!result.workspace) return;

      result.workspace.forEach((tab: SavedTab) => {
        chrome.tabs.create({ url: tab.url });
      });
    }
  );
});

// Render the saved tabs as a list
function displayTabs(tabs: SavedTab[]) {
  tabList.innerHTML = '';

  tabs.forEach(tab => {
    const li = document.createElement('li');
    li.textContent = tab.title;
    tabList.appendChild(li);
  });
}