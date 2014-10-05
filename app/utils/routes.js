/**
 * Created by jonathan.taylor on 10/4/2014.
 */
'use strict';
var requireDir = require('require-dir');
var controllers = requireDir('../../app/controllers');

function addRoutes(app) {
  app.get('/', controllers.homeController.home);
  app.get('/adduser', controllers.homeController.addUserGet);
  app.post('/adduser', controllers.homeController.addUserPost)
  app.get('/viewusers', controllers.homeController.viewUsers);
  app.get('/addclub', controllers.homeController.addClubGet);
  app.post('/addclub', controllers.homeController.addClubPost);
  app.get('/viewclubs', controllers.homeController.viewClubs);
  app.get('/stock', controllers.homeController.stockGet);
  app.post('/stock', controllers.homeController.stockPost);
};

exports.addRoutes = addRoutes;