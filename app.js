/**
 * Created by jonathan.taylor on 10/3/2014.
 */
'use strict';

var express = require('express');
var hbs = require('hbs');
var path = require('path');

var app = express();

app.set('port', process.env.PORT || 1985);
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'hbs');
//app.use(express.favicon());
app.use(express.static(path.join(__dirname, 'public')));
//app.use(express.json());
app.use(express.urlencoded());
//app.use(express.methodOverride());
app.use(app.router);

hbs.registerPartials(__dirname + '/app/views/partials');

require('./app/utils/routes').addRoutes(app);

var server = require('http').createServer(app);

server.listen(app.get('port'));
console.log('Express server listening on port ' + app.get('port'));
