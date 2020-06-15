/**
 * Content Script to setup workers and
 * performing the ping based on the
 * worker interval message
 */
(function () {
    var worker = new Worker(chrome.runtime.getURL('js/worker.js'))

    /**
     * Initial Worker setup.
     * Reads Storage and sets
     * corresponding state to worker
     */
    chrome.storage.sync.get(['isActive'], function (data) {
        var isActive = data.isActive

        if (isActive == 'true') {
            worker.postMessage('start')
        }
    })

    /**
     * Event Listener for Worker State.
     * Listenes for isActive Checkbox
     * and posts state to specific Worker.
     */
    chrome.runtime.onMessage.addListener(
        function (request, sender, sendResponse) {
            if (request.isActive == 'true') {
                sendResponse('Starting Interval...')
                worker.postMessage('start')
            } else if (request.isActive == 'false') {
                sendResponse('Stopping Interval...')
                worker.postMessage('stop')
            }
        }
    )
    
    /**
     * Event Listener for Web Worker.
     * Ping CPI after receive data from
     * Worker with payload 'ping'.
     */
    worker.addEventListener('message', function (event) {
        var data = event.data
        console.log('Worker: ' + data)
        if (data === 'ping') {
            ping()
        }
    })


    /**
     * Actual Ping to CPI
     */
    function ping() {
        var xmlHTTP = new XMLHttpRequest()
        xmlHTTP.open("GET", requestURL, true)
        xmlHTTP.send(null)
    }
})();