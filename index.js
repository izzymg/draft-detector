/*
Draft detector
JS for Totara Learn, detects if the user is currently in an unedited assessment submission window and warns them of such.

Izzy MG, TCA LMS Admin
*/

(function() {
    const NEVER_SHOW_KEY = "tca-draft-nevershow";

    /**
     * Returns true if current page has a draft submission on it.
    */
    function isDraftSubmission() {
        return document.querySelector(".submissionstatusdraft") ? true : false;
    }

    /**
     * Removes hidden attribute from the popup element placed in the page through Totara's extra HTML.
    */
    function showPopup() {
        const popup = document.querySelector(".tca-draft-popup");
        if(!popup) {
            throw "TCA Draft Popup element not found in page";
        }

        // Dismiss popup on OK
        document.querySelector(".tca-draft-ok").addEventListener("click", function() {
            popup.style.display = "none";
        });

        // Never show functionality
        document.querySelector(".tca-draft-nevershow").addEventListener("click", function() {
            popup.style.display = "none";
            window.localStorage.setItem(NEVER_SHOW_KEY, "true");
        });

        popup.style.display = "block";
    }

    /** Returns true if the popup is set to never show again */
    function isNeverShow() {
        return window.localStorage.getItem(NEVER_SHOW_KEY) ? true : false;
    }

    if(!isDraftSubmission() || isNeverShow()) {
        return;
    }

    try {
        showPopup();
    } catch(err) {
        console.error(err);
    }
})();