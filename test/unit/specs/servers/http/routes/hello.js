/* global describe:true, it:true, mrequire:true, beforeEach:true, expect:true  */
var path = require('path');
var _    = require('lodash');

describe(path.basename(module.filename), function(){
    var HelloRouter = mrequire('servers/http/routes/hello');
    var serverMock  = require('../../../../mocks/server');
    var helloRouter;

    beforeEach(function(){
        helloRouter = new HelloRouter(serverMock);
    });

    describe('controller', function(){
        it('should be an object', function(){
            helloRouter.controller.should.not.be.a('null');
            helloRouter.controller.should.be.an('object' );
        });
    });

    describe('routes', function(){
        it('should be an object', function(){
            helloRouter.routes.should.not.be.a('null');
            helloRouter.routes.should.be.an('object' );
        });
        it('should contain only non-null methods', function(){
            _.each(helloRouter.routes, function(routes){
                routes.forEach(function(route){
                    route.matcher.should.not.be.a('null');
                    expect(route.method).to.be.a('function');
                });
            });
        });
    });
});
