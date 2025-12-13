chrome.storage.local.get(['savedCount'], (result) => {
    const count = result.savedCount || 0;
    document.getElementById('count').innerText = count;
});