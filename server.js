var express = require('express');

var app = express();

var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded());

app.use(bodyParser.json());

var route_setter = require('./server/config/routes.js');

route_setter(app);

app.listen(8080, function() {
    console.log("listening on port 8080");
})