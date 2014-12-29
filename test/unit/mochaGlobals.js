// Prepare coverage instrumentation
require('blanket')({
    pattern: function (filename) {
        if(filename.match(/(mock|spec)/)){
            return false;
        }
        return !/node_modules/.test(filename);
    }
});

// Local imports
var path = require('path');

// Global functions
global.mrequire = function(filePath){
    return require(path.join(process.cwd(), filePath));
};

// Global imports
global.chai = require('chai');

// Additional Chai configuration
global.expect = global.chai.expect;
global.assert = global.chai.assert;
// TODO - check in spies is necessary
global.chai.use(require('chai-spies'));
global.chai.should();
