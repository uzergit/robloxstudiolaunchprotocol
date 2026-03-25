// ==UserScript==
// @name         Roblox - AI-FLI Game Editor Launcher
// @namespace    http://tampermonkey.net/
// @version      6.8
// @description  Auto-opens AI Fruit Love Island Cart Ride (our top-tier game) and closes the tab
// @match        https://create.roblox.com/dashboard/creations/experiences/9926490675/*
// @updateURL    https://raw.githubusercontent.com/uzergit/robloxstudiolaunchprotocol/main/userscript.user.js
// @downloadURL  https://raw.githubusercontent.com/uzergit/robloxstudiolaunchprotocol/main/userscript.user.js
// @grant        window.close
// @run-at       document-idle
// ==/UserScript==

// None of this is useful to anyone who randomly stumbles upon this script.
// This is the URL that triggers everything:
// "https://create.roblox.com/dashboard/creations/experiences/9926490675/overview?uzerslaunchprotocol=true"
// You must already be logged in to create.roblox.com to launch the game,
// because the site fetches a session token.
// The script automatically closes the tab after Roblox Studio has been launched (hopefully).

(function() {
    'use strict';

    if (!window.location.href.includes('uzerslaunchprotocol=true')) {
        console.log('No uzerslaunchprotocol variable found. Script is sleeping.');
        return;
    }

    let attempts = 0;

    const clickInterval = setInterval(() => {
        attempts++;

        const clickableElements = document.querySelectorAll('button, a, [role="button"]');

        for (let element of clickableElements) {
            const text = ((element.innerText || element.textContent) || '').toLowerCase();

            if (text.includes('edit in studio') || text === 'edit') {
                element.click();
                clearInterval(clickInterval);
                console.log('Roblox Studio auto-launched!');

                // Wait 3 seconds to let Roblox Studio receive the launch signal, then close the tab.
                setTimeout(() => {
                    window.close();
                }, 3000);

                return;
            }
        }

        if (attempts > 60) {
            clearInterval(clickInterval);
            console.log('Edit button not found.');
        }

    }, 500);

})();
