var domain  = require('domain');
var restify = require('restify');

function MiddlewareInjector(server){
    server.pre(restify.pre.sanitizePath());

    server.use(restify.acceptParser(server.acceptable));
    server.use(restify.bodyParser());
    server.use(restify.queryParser());
    server.use(restify.authorizationParser());

    // CORS
    server.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        return next();
    });

    // Global error handler
    server.use(function(req, res, next) {
        var domainHandler = domain.create();

        domainHandler.on('error', function(err) {
            var errMsg = 'Request: \n' + req + '\n';
            errMsg += 'Response: \n' + res + '\n';
            errMsg += 'Context: \n' + err;
            errMsg += 'Trace: \n' + err.stack + '\n';

            console.error('ERROR');
            console.error(errMsg);
            domain.dispose();
        });

        domainHandler.enter();
        next();
    });
}

module.exports = MiddlewareInjector;
