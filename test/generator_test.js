var generator = require('../src/lib/generator'),
    assert = require('assert');

describe('generator', function() {
    describe('create', function() {
        it('should push a new-board fact onto the queue', function() {
            var data = '';
            var type = 'text/csv';
            var cb = function(err, result){}
            generator.create(data, type, cb);

        });
    });
});

