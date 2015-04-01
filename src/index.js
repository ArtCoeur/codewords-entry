var app = require('express')(),
    logger = require('./lib/logger'),
    bodyParser = require('body-parser'),
    generator = require('./lib/generator');

app.use(bodyParser.text({type : 'text/*', limit: '1024kb'}));
app.use(bodyParser.text({type : 'application/xml', limit: '1024kb'}));
app.use(bodyParser.json({limit: '1024kb'}));

app.get('/', function (req, res) {
    res.json({
        name : 'entry',
        description : "Post board data with the correct content-type"
    });
});

app.post('/boards', function(req, res) {
    generator.create(req.body, function(err, result) {
        if (!err){
            logger.log('info', 'Success');
            res.json(result);
        } else {
            logger.log('error', err);
            res.status(400).json(result);
        }
    });
});

var PORT = process.env.PORT || 80;
app.listen(PORT);
logger.log('info', 'Running codewords entry service on http://localhost:' + PORT);
