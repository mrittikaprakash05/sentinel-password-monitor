// Listen for when a user clicks out of a password field (blur)
document.addEventListener('blur', async (e) => {
    if (e.target.type === 'password' && e.target.value.length > 0) {
        const password = e.target.value;
        const hash = await sha1(password);
        const prefix = hash.substring(0, 5);
        const suffix = hash.substring(5);

        chrome.runtime.sendMessage({
            action: "checkPassword",
            prefix: prefix,
            suffix: suffix
        }, (response) => {
            if (response && response.isPwned) {
                showWarning(e.target);
            }
        });
    }
}, true); 

// SHA-1 Hashing Helper (Browser Native)
async function sha1(str) {
    const enc = new TextEncoder();
    const hashBuffer = await crypto.subtle.digest('SHA-1', enc.encode(str));
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('').toUpperCase();
}


function showWarning(inputElement) {
    
    const existing = document.getElementById('pwn-warning-overlay');
    if (existing) existing.remove();

    const overlay = document.createElement('div');
    overlay.id = 'pwn-warning-overlay';
    overlay.innerHTML = `
        <div class="pwn-box">
            <h2>⚠️ UNSAFE PASSWORD DETECTED</h2>
            <p>This password has appeared in a known data breach.</p>
            <p>Hackers likely already know this password.</p>
            <div class="pwn-buttons">
                <button id="pwn-change">I'll Change It</button>
                <button id="pwn-ignore">Use Anyway (Unsafe)</button>
            </div>
        </div>
    `;

    document.body.appendChild(overlay);

    // Button Logic
    document.getElementById('pwn-change').addEventListener('click', () => {
        inputElement.value = ''; // Clear the unsafe password
        inputElement.focus();
        overlay.remove();
    });

    document.getElementById('pwn-ignore').addEventListener('click', () => {
        overlay.remove();
    });

}
