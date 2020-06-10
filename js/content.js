var worker = new Worker(chrome.runtime.getURL('js/worker.js'))

chrome.storage.sync.get(['isActive'], function (data) {
    var isActive = data.isActive

    if (isActive == 'true') {
        worker.postMessage('start')
    }
})

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

worker.addEventListener('message', function(event) {
    var data = event.data
    console.log('Worker: ' + data)
    if(data === 'ping') {
        ping()
    }
})

function ping() {
    var xmlHTTP = new XMLHttpRequest()
    xmlHTTP.open("GET", requestURL, true)
    xmlHTTP.send(null)
}