var util = require('util');
var BaseRouter = require('./base');

function StaticRouter(){
    return BaseRouter.apply(this, arguments);
}
util.inherits(StaticRouter, BaseRouter);

var $$ = StaticRouter.prototype;
$$.getRoutes = function getRoutes(){
    return {
        get: [
            BaseRouter.Route(/.*/, this.controller.serve)
        ]
    };
};

module.exports = StaticRouter;
