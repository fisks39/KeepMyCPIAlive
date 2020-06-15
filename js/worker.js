/**
 * Web Worker Script for ping interval.
 * We cannot setInterval in content Script
 * since it only cares for the active tab.
 * Worker Scripts only purpose is to tell
 * content Script when to perform a ping.
 */
(function () {
    var intervalTime = 60000
    var pingInterval
    var running = false

    /**
     * Event Listener for state of worker.
     * Listenes on content Script post
     * message for change of checkbox state.
     */
    self.addEventListener('message', function (event) {
        var data = event.data

        switch (data) {
            case 'start':
                if (!running) {
                    startPingInterval()
                    self.postMessage('Worker started')
                    running = true
                } else {
                    self.postMessage('Worker is already running')
                }
                break
            case 'stop':
                stopPingInterval()
                self.postMessage('Worker stopped')
                running = false
                break
            default:
                self.postMessage('Unknown command: ' + data)
        }
    }, false)

    /**
     * Tell content Script a ping shouldhappen.
     */
    function pingMessage() {
        self.postMessage('ping')
    }

    /**
     * Invoke interval for pings
     */
    function startPingInterval() {
        pingInterval = setInterval(pingMessage, intervalTime)
    }

    /**
     * Revome interval for pings
     */
    function stopPingInterval() {
        clearInterval(pingInterval)
    }
})();