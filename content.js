function httpGet() {
    var xmlHTTP = new XMLHttpRequest()
    xmlHTTP.open("GET", requestURL, true)
    xmlHTTP.send(null)
}

var requestURL = "/itspaces/ping"
var intervalTime = 60000
var pingInterval

chrome.storage.sync.get(['isActive'], function (data) {
    var isActive = data.isActive

    if (isActive == 'true') {
        startPingInterval()
    }
})

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.isActive == 'true') {
            sendResponse('Starting Interval...')
            startPingInterval()
        } else if (request.isActive == 'false') {
            sendResponse('Stopping Interval...')
            stopPingInterval()
        }
    }
);

function stopPingInterval() {
    clearInterval(pingInterval)
}

function startPingInterval() {
    pingInterval = setInterval(httpGet, intervalTime)
}