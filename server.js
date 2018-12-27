// server.js

// BASE SETUP
// =============================================================================
// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var stockService = require('./service/stockService.js')();
var mongoose = require('mongoose');
mongoose.connect('mongodb://lvd-user:' + process.env.MONGO_DB_PW + process.env.MONGO_DB_LOCATION).catch(err => {
  console.log("Error while connecting to mongodb: "+ err);
});

var db = mongoose.connection;
db.on("connected", function () {
  console.log("Mongoose default connection open ");
});

console.log('mongodb://lvd-user:' + process.env.MONGO_DB_PW + process.env.MONGO_DB_LOCATION);

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

router.get('/stocks/', function(req, res) {
    stockService.getStock(function(err, result){
      if(err) {
        console.log(err)
      }
      res.json(result);
    });
});
router.put('/stocks/:stock_id', function(req,res){
  res.json(stockService.updateStock(req.body, function(err,result){
    if(err) {
      console.log("Update error: " + err);
    }
  }));
});

router.post('/stocks/', function(req,res){
  res.json(stockService.addNewStock(req.body));
});


// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/lvd/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
