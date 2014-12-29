/* global describe:true, it:true, mrequire:true, beforeEach:true, expect:true  */
var path = require('path');
var _    = require('lodash');

describe(path.basename(module.filename), function(){
    var StaticRouter = mrequire('servers/http/routes/static');
    var serverMock  = require('../../../../mocks/server');
    var staticRouter;

    beforeEach(function(){
        staticRouter = new StaticRouter(serverMock);
    });

    describe('controller', function(){
        it('should be an object', function(){
            staticRouter.controller.should.not.be.a('null');
            staticRouter.controller.should.be.an('object' );
        });
    });

    describe('routes', function(){
        it('should be an object', function(){
            staticRouter.routes.should.not.be.a('null');
            staticRouter.routes.should.be.an('object' );
        });
        it('should contain only non-null methods', function(){
            _.each(staticRouter.routes, function(routes){
                routes.forEach(function(route){
                    route.matcher.should.not.be.a('null');
                    expect(route.method).to.be.a('function');
                });
            });
        });
    });
});
