// server.js

// BASE SETUP
// =============================================================================
// call the packages we need
let express = require('express');        // call express
let app = express();                 // define our app using express
let cors = require('cors');
let bodyParser = require('body-parser');
let stockService = require('./service/stockService.js')();
let mongoose = require('mongoose');
mongoose.connect('mongodb://lvd-user:' + process.env.MONGO_DB_PW + process.env.MONGO_DB_LOCATION);
let db = mongoose.connection;
db.on("connected", function () {
    console.log("Mongoose default connection open ");
});

console.log('mongodb://lvd-user:' + process.env.MONGO_DB_PW + process.env.MONGO_DB_LOCATION);

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

let port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
let router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function (req, res) {
    res.json({message: 'hooray! welcome to our api!'});
});

router.get('/stocks/', function (req, res) {
    stockService.getStock(function (err, result) {
        if (err) {
            console.log(err)
        }
        res.json(result);
    });
});
router.put('/stocks/:stock_id', function (req, res) {
    res.json(stockService.updateStock(req.body, function (err, result) {
        if (err) {
            console.log("Update error: " + err);
        }
    }));
});

router.post('/stocks/', function (req, res) {
    res.json(stockService.addNewStock(req.body));
});


// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api


let whitelist = ['https://lrdtnc.github.io', 'http://localhost:3000'];

let corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
};

app.use(cors(corsOptions));
app.use('/lvd/api', router);
// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
