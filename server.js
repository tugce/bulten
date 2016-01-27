// server.js

    // set up ========================
    var express  = require('express');
    var app      = express();                               // create our app w/ express
    var mongoose = require('mongoose');                     // mongoose for mongodb
    var morgan = require('morgan');             // log requests to the console (express4)
    var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
    var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)

    // configuration =================

    mongoose.connect('mongodb://localhost/local');     // connect to mongoDB database on modulus.io

    app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
    app.use(morgan('dev'));                                         // log every request to the console
    app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
    app.use(bodyParser.json());                                     // parse application/json
    app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
    app.use(methodOverride());

    var Bulten = mongoose.model('Bulten', {bultenAdi: String, bultenIcerik: String, sent: Boolean});
    var List = mongoose.model('List', {toList: String, ccList: String, bccList: String, _bulten: {type: mongoose.Schema.Types.ObjectId, ref: Bulten}});
app.get('/api/bultens', function(req, res) {

        // use mongoose to get all bultens in the database
        Bulten.find(function(err, bultens) {

            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err)

            res.json(bultens); // return all bultens in JSON format
        });
    });

app.post('/api/bultens', function(req, res) {

        // create a todo, information comes from AJAX request from Angular
        Bulten.create({
            bultenAdi : req.body.bultenAdi,
	    bultenIcerik: req.body.bultenIcerik,
	    sent: false
        }, function(err, todo) {
            if (err)
                res.send(err);

            // get and return all the bultens after you create another
            Bulten.find(function(err, bultens) {
                if (err)
                    res.send(err)
                res.json(bultens);
            });
        });

    });

app.delete('/api/bultens/:bulten_id', function(req, res) {
        Bulten.remove({
            _id : req.params.bulten_id
        }, function(err, todo) {
            if (err)
                res.send(err);

            // get and return all the bultens after you create another
            Bulten.find(function(err, bultens) {
                if (err)
                    res.send(err)
                res.json(bultens);
            });
        });
    });

app.get('*', function(req, res) {
        res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
    // listen (start app with node server.js) ======================================
    app.listen(8081);
    console.log("App listening on port 8081");


