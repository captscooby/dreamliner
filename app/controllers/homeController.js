/**
 * Created by jonathan.taylor on 10/4/2014.
 */
var dataWrapper = require('../utils/dataWrapper');
var stockWrapper = require('../utils/stockWrapper');

function home(req, res) {
  res.render('home', { data:'home' });
}

function addUserGet(req, res) {
  res.render('adduser', { data:'adduser' });
}

function addUserPost(req, res) {
  var userName = req.body.userName;
  var password = req.body.password;
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  dataWrapper.addUser(userName, password, firstName, lastName, function(err, data) {
    if(err) {
      console.log(err);
      res.render('adduser', { error:err });
    } else {
      res.render('home', { data:data });
    }
  });
}

function viewUsers(req, res) {
  dataWrapper.viewUsers(function(err, data) {
    if(err) {
      console.log(err);
      res.render('viewusers', { error:err });
    } else {
      res.render('viewusers', { data:data });
    }
  });
}

function stockGet(req, res) {
  res.render('stock');
}

function stockPost(req, res) {
  stockWrapper.findStock(req.body.stockId, function stockPostCallback(err, data) {
    if(err) {
      res.render('stock', { error:err });
    } else {
      console.log(data.results);
      res.render('stock', { queryvalue:req.body.stockId, data:data.body });
    }
  });
}

exports.home = home;
exports.addUserGet = addUserGet;
exports.addUserPost = addUserPost;
exports.viewUsers = viewUsers;
exports.stockGet = stockGet;
exports.stockPost = stockPost;
