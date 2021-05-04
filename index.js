/*
Draft detector
JS for Totara Learn, detects if the user is currently in an unedited assessment submission window and warns them of such.

Izzy MG, TCA LMS Admin
*/

(function() {
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

        popup.style.display = "block";
    }

    if(!isDraftSubmission()) {
        return;
    }

    try {
        showPopup();
    } catch(err) {
        console.error(err);
    }
})();