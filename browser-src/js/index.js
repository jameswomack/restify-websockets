window.document.addEventListener("DOMContentLoaded", function(/* event */) {
    // event.currentTarget = document
    var config    = require('../../servers/http/config');
    var host = window.document.location.host.replace(/:.*/, '');
    var ws = new WebSocket('ws://' + host + ':' + config.environment.port);
    ws.onmessage = function(event){
        console.log(event.type, event.data, event.timeStamp);
        document.body.children[0].value = event.data;
    };
    ws.onopen = function(){
        ws.send(JSON.stringify({time:Date.now()}));
    };
    window.ws = ws;
});
