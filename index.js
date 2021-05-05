/*
Draft detector
JS for Totara Learn, detects if the user is currently in an unedited assessment submission window and warns them of such.

Izzy MG, TCA LMS Admin
*/

(function() {
    const TTL_KEY = "tca-draft-nevershow";
    const KEY_TTL = 24 * 60 * 60 * 1000;

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

        // Mark expiry time when popup is dismissed
        document.querySelector(".tca-draft-ok").addEventListener("click", function() {
            popup.style.display = "none";
            window.localStorage.setItem(TTL_KEY, new Date().getTime() + KEY_TTL);
        });

        popup.style.display = "block";
    }

    /** Returns true if it's been a day since local storage records dismissal of the popup */
    function shouldShowPopup() {
        const expiry = window.localStorage.getItem(TTL_KEY);
        if(!expiry) {
            return true;
        }
        if(new Date().getTime() > expiry) {
            localStorage.removeItem(TTL_KEY);
            return true;
        }
        return false;
    }

    if(!isDraftSubmission() || !shouldShowPopup()) {
        return;
    }

    try {
        showPopup();
    } catch(err) {
        console.error(err);
    }
})();