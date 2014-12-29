var util = require('util');
var _ = require('lodash');

function BaseRouter(server){
    this.server = server;
    this.attributes = {};
    this.loadRoutes();
    return this;
}

var $$ = BaseRouter.prototype;

Object.defineProperty($$, 'controller', {
    get: function controllerGetter(){
        if(!this.attributes.controller){
            var name = this.constructor.name.match(/^[A-Z][a-z]*/)[0];
            var path = '../controllers/' + name.toLowerCase();
            var Controller = require(path);
            this.attributes.controller = new Controller();
        }
        return this.attributes.controller;
    }
});

$$.toString = function toString(){
    var serialized = {
        controller: this.controller,
        routes:     this.routes
    };
    return util.inspect(serialized, {
        colors:     true,
        showHidden: true
    });
};

$$.getRoutes = function(){
    return {};
};

Object.defineProperty($$, 'routes', {
    get: function routesGetter(){
        if(!this.attributes.routes){
            this.attributes.routes = this.getRoutes();
        }
        return this.attributes.routes;
    }
});

$$.loadRoutes = function(){
    _.each(this.routes, function(routes, httpMethod){
        _.each(routes, function(route){
            var env = process.env.NODE_ENV || 'development';
            if ('development' === env) {

            }
            this.server[httpMethod](route.matcher, route.method);
        }, this);
    }, this);
};

module.exports = BaseRouter;
module.exports.Route = function Route(matcher, method){
    return {
        matcher: matcher,
        method:  method
    };
};
