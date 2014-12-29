var serverMock  = {};

function noop(){}

['get','del','head','post','put'].forEach(function(httpVerb){
    serverMock[httpVerb] = noop;
});

module.exports = serverMock;
