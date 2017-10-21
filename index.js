require('dotenv').load();
var express = require('express');
var app = express();

app.use(express.static('public'));
var engine = require('consolidate');

app.set('views', __dirname + '/views');
app.engine('html', engine.mustache);
app.set('view engine', 'html');

app.get('/', function (req, res) {
  options = {
    clientId: process.env.CLIENT_ID,
    profileId: process.env.PROFILE_ID
  }
  res.render(__dirname + "/views/HelloAnalytics.html", options);
})

app.get('/realtime', function (req, res) {
  res.sendFile( __dirname + '/RealTime.html');
})

app.get('/test', function (req, res) {
  response = {
    first_name:req.query.first_name,
    last_name:req.query.last_name
  };
  res.end(JSON.stringify(response));
})

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port

   console.log("Example app listening at http://%s:%s", host, port)
})

// var ActionCable = require('actioncable')

app.get('/cable', function (req, res) {
  res.sendFile( __dirname + '/cable.html');
})
