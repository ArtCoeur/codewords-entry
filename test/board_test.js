var board = require('../lib/board'),
    assert = require('assert');

describe('board', function() {
    describe('create', function() {
        it('should push a new-board fact onto the queue with json', function() {

            var body = '[[1,16,6,4,22,x,5,13,4,6,14,14,17,6,2]]';
            var type = 'application/vnd.artcoeur.com-v1+json';

            var context = {
                on: function(event, cb){
                    assert('ready' == event);
                    cb();
                },
                socket: function(name){
                    return {
                        connect: function(queue, cb){
                            assert('events' == queue);
                            cb();
                        },
                        write: function(data, format){
                            // assert that the board.create method generates the expected json object
                            // and writes it to the message queue
                            fact = JSON.parse(data);
                            assert(fact.name == 'board.new');
                            assert(fact.data.type == type);
                            assert(fact.data.body == body);
                        }
                    };
                }
            };

            var cb = function(err, result){
                console.log(result);
            }

            board.create(context, body, type, cb);
        });

        it('should push a new-board fact onto the queue with xml', function() {

            var body = '<?xml version="1.0" encoding="UTF-8"?><cell x="1" y="1" type="block"></cell>';
            var type = 'application/vnd.bestpuzzles.com-v1+xml';

            var context = {
                on: function(event, cb){
                    assert('ready' == event);
                    cb();
                },
                socket: function(name){
                    return {
                        connect: function(queue, cb){
                            assert('events' == queue);
                            cb();
                        },
                        write: function(data, format){
                            // assert that the board.create method generates the expected json object
                            // and writes it to the message queue
                            fact = JSON.parse(data);
                            assert(fact.name == 'board.new');
                            assert(fact.data.type == type);
                            assert(fact.data.body == body);
                        }
                    };
                }
            };

            var cb = function(err, result){
                console.log(result);
            }

            board.create(context, body, type, cb);
        });
    });
});

