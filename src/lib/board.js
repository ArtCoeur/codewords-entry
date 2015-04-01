var uniqid = require('uniquid');

/*
 * pushes a new fact onto the queue
 */
exports.create = function(context, data, type, callback) {

    // generate a board id
    var id = uniqid();

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
        var json = JSON.stringify(fact);
        pub.write(json, 'utf8');
        callback(null, 'Posted fact: ' + json);

        pub.connect('facts', function() {

        });
    });
};
