chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "checkPassword") {
        checkPassword(request.prefix, request.suffix).then(isPwned => {
            if (isPwned) {
                updateStats();
            }
            sendResponse({ isPwned: isPwned });
        });
        return true; 
    }
});

async function checkPassword(prefix, suffix) {
    try {
        const response = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`);
        const text = await response.text();
        
        // The API returns lines like: SUFFIX:COUNT
        
        const regex = new RegExp(`^${suffix}:`, "m");
        return regex.test(text);
    } catch (error) {
        console.error("API Error:", error);
        return false;
    }
}

function updateStats() {
    chrome.storage.local.get(['savedCount'], (result) => {
        const current = result.savedCount || 0;
        chrome.storage.local.set({ savedCount: current + 1 });
    });

}
