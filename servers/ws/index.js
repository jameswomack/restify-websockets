function WSServer(server){
    var WebSocketServer = require('ws').Server;
    var wss = new WebSocketServer({server: server});
    wss.broadcast = function broadcast(data, excludeId) {
        var recipients = [];
        for(var i in this.clients) {
            var client = this.clients[i];
            if(typeof excludeId === 'undefined' ||
                client._ultron.id !== excludeId){
                client.send(data);
                recipients.push(client._ultron.id);
            }
        }
        console.info('Dispatched '+data+' from sender "' + excludeId +
                     '" to recipients "' + recipients.join('", "') +'".');
    }.bind(wss);

    wss.on('connection', function(ws) {
        ws.on('close', function(data){
            console.info('STREAM_CLOSE_WS');
            console.dir(data);
        });

        // `data`: Buffer
        ws.on('message', function(data){
            wss.broadcast(data, this._ultron.id);
        });

        //ws.send('something');
    });
}

module.exports = WSServer;
