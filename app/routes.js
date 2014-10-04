/**
 * Created by jonathan.taylor on 10/4/2014.
 */
'use strict';
var requireDir = require('require-dir');
var controllers = requireDir('../app/controllers');

function addRoutes(app) {
  app.get('/', controllers.homeController.home);
};

exports.addRoutes = addRoutes;
