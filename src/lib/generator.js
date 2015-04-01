var context = require('rabbit.js').createContext();

/*
 * pushes a new fact onto the queue
 */
exports.create = function(data, type, callback) {

    // generate a board id
    var id ='UNIQUE-ID-GOES-HERE';

    var fact = {
        board: id,
        name: 'new-board',
        data: {
            board: data,
            type: type
        }
    };

    // pop the new-board fact onto the queue
    context.on('ready', function() {
        var pub = context.socket('PUB');
        pub.connect('facts', function() {
            pub.write(JSON.stringify(fact), 'utf8');
        });
    });
};
