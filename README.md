# Sentinel 🛡️: Password Leak Monitor

**A privacy-first browser extension that stops you from using compromised passwords before you click submit.**

Sentinel acts as a real-time bodyguard for your online accounts. Whenever you type a password into a login or registration field, Sentinel instantly checks it against the database of over 600 million breached passwords (via HaveIBeenPwned). If the password is unsafe, a warning overlay blocks the screen.

## 🔐 How it works (Privacy & Security)
**Your password never leaves your computer.**

This extension uses a technique called **k-Anonymity** to ensure privacy:
1.  When you type a password, the extension creates a **SHA-1 hash** locally (e.g., `5BAA6...`).
2.  It sends **only the first 5 characters** of that hash (e.g., `5BAA6`) to the API.
3.  The API returns a list of hundreds of compromised hashes that start with `5BAA6`.
4.  The extension compares the full hash locally on your machine.
5.  If there is a match, the warning is triggered.

This ensures that neither the developer nor the API provider ever knows your real password.

## 🚀 Features
*   **Real-time Detection:** Checks passwords the moment you click out of the input field.
*   **Intrusive Warning System:** A full-screen overlay prevents accidental submission of weak credentials.
*   **Privacy First:** Uses the HaveIBeenPwned k-Anonymity API model.
*   **Impact Tracker:** Dashboard popup tracks how many times the tool has saved you from a breach.

## 🛠️ Tech Stack
*   **Core:** JavaScript (ES6+), HTML5, CSS3
*   **Platform:** Chrome Extension API (Manifest V3)
*   **Cryptography:** Web Crypto API (for local SHA-1 hashing)
*   **Data Source:** HaveIBeenPwned API

## 📦 How to Install (Developer Mode)
Since this is a portfolio project, you can install it manually:

1.  Download this repository as a ZIP file and extract it.
2.  Open Chrome/Edge and navigate to `chrome://extensions`.
3.  Enable **Developer Mode** (top right toggle).
4.  Click **Load Unpacked**.
5.  Select the folder containing `manifest.json`.
6.  Go to any login page and type `password123` to test the warning!


## 📄 License
This project is open source and available under the [MIT License](LICENSE).
