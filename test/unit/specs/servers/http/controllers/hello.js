/* global describe:true, it:true, mrequire:true, beforeEach:true, expect:true  */
var path = require('path');

describe(path.basename(module.filename), function(){
    var HelloController = mrequire('servers/http/controllers/hello');
    var helloController;

    beforeEach(function(){
        helloController = new HelloController();
    });

    describe('respond', function(){
        it('should contain only non-null methods', function(){
            expect(helloController.respond).to.be.a('function');
        });
    });
});
