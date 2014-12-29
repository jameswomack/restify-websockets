var fs   = require('fs');
var path = require('path');

function RouteCollector(server){
    server.routers = [];
    var routesPath = __dirname + '/routes';
    fs.readdirSync(routesPath).forEach(function (curFile) {
        if(curFile.substr(-3) === '.js' && curFile.substr(0,4) !== 'base') {
            var Router = require(path.join(routesPath, curFile));
            server.routers.push(new Router(server));
        }
    });
}

module.exports = RouteCollector;
