var requestURL = "/itspaces/ping"
var intervalTime = 60000
var pingInterval
var running = false

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

function pingMessage() {
    self.postMessage('ping')
}

function startPingInterval() {
    pingInterval = setInterval(pingMessage, intervalTime)
}

function stopPingInterval() {
    clearInterval(pingInterval)
}