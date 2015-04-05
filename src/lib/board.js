var uniqid = require('uniqid');

/*
 * pushes a new fact onto the queue
 */
exports.create = function(context, board_data, mime_type, callback) {

    // generate a board id
    var id = uniqid();

    var fact = {
        board: id,
        name: 'board.new',
        data: {
            body: board_data,
            type: mime_type
        }
    };

    // pop the new-board fact onto the queue
    context.on('ready', function() {
        var pub = context.socket('PUB');
        pub.connect('events', function(){
            var json = JSON.stringify(fact);
            pub.write(json, 'utf8');
            callback(null, 'Posted fact: ' + json);
        });
    });
};
