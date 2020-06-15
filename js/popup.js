/**
 * Popup Extension Menu to
 * activate or deactivate pings
 */
(function () {
    /**
     * Wait for Content loaded then initialise.
     */
    document.addEventListener('DOMContentLoaded', function () {
        var checkbox = document.querySelector('#isActiveSwitch')

        chrome.storage.sync.get(['isActive'], function (data) {
            var isActive = data.isActive
            setInitialState(isActive, checkbox)
        })

        checkbox.addEventListener('change', function () {
            if (this.checked) {
                isActive = 'true'
                chrome.storage.sync.set({ 'isActive': 'true' })
                sendState(isActive)
            } else {
                isActive = 'false'
                chrome.storage.sync.set({ 'isActive': 'false' })
                sendState(isActive)
            }
        })
    }, false)

    /**
     * Set initial State of Extension.
     * 
     * @param {boolean} isActive - Current State
     * @param {DOM Element} checkbox - Checkbox DOM Element of popup.html
     */
    function setInitialState(isActive, checkbox) {
        if (isActive === undefined) {
            isActive = 'true'
            chrome.storage.sync.set({ 'isActive': 'true' })
        } else {
            if (isActive == 'true') {
                checkbox.checked = true
            } else if (isActive == 'false') {
                checkbox.checked = false
            }
        }
    }

    /**
     * Send Current State to all CPI tabs.
     * 
     * @param {boolean} state - Current State
     */
    function sendState(state) {
        chrome.tabs.query({ url: 'https://*.hana.ondemand.com/itspaces/*' },
            function (tabs) {
                for (var i = 0; i < tabs.length; i++) {
                    chrome.tabs.sendMessage(tabs[i].id, { 'isActive': state }, function (response) {
                        console.log(response)
                    })
                }
            }
        )
    }
})();