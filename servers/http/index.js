//var util = require('util');
var restify = require('restify');
var config = require('./config');

var server = restify.createServer({
    name: config.api.name,
    formatters: {
        'application/json': function(req, res, body){
            return JSON.stringify(body);
        }
    }
});

['./middlewareInjector','./routeCollector','../ws']
  .forEach(function(path){
    require(path)(server);
  });

restify.defaultResponseHeaders = function(){
  this.header('Server', 'Noble Gesture Server');
};

/*server.use(function requestInspector(req, res, next){
    util.puts(req);
    next();
});*/

server.listen(config.environment.port, function() {
  console.info('%s listening at %s', server.name, server.url);
});
