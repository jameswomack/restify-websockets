var util = require('util');
var BaseRouter = require('./base');

function HelloRouter(){
    return BaseRouter.apply(this, arguments);
}
util.inherits(HelloRouter, BaseRouter);

var $$ = HelloRouter.prototype;
$$.getRoutes = function getRoutes(){
    return {
        get: [
            BaseRouter.Route('/hello/:name', this.controller.respond)
        ],
        head: [
            BaseRouter.Route('/hello/:name', this.controller.respond)
        ]
    };
};

module.exports = HelloRouter;
