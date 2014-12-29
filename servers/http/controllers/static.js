var restify = require('restify');

var serve = function serveStatic(){
    return restify.serveStatic({
        directory: './public',
        default:   'index.html'
    }).apply(this, arguments);
};

function StaticController(){}

StaticController.prototype.serve = serve;

module.exports = StaticController;
