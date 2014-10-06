/**
 * Created by jonathan.taylor on 10/4/2014.
 */
var dataWrapper = require('../utils/dataWrapper');
var stockWrapper = require('../utils/stockWrapper');

function home(req, res) {
  res.render('home', { data:'home' });
}

function addUserGet(req, res) {
  res.render('adduser');
}

function addUserPost(req, res) {
  var userName = req.body.userName;
  var password = req.body.password;
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  dataWrapper.addUser(userName, password, firstName, lastName, function(err, data) {
    if(err) {
      res.render('adduser', { error:err });
    } else {
      res.render('home', { data:data });
    }
  });
}

function viewUser(req, res) {
  dataWrapper.findUser(req.params.id, function(err, data) {
    if(err) {
      res.render('viewuser', { error:err });
    } else {
      res.render('viewuser', { data:data });
    }
  });
}

function viewUsers(req, res) {
  dataWrapper.findUsers(function(err, data) {
    if(err) {
      res.render('viewusers', { error:err });
    } else {
      res.render('viewusers', { data:data });
    }
  });
}

function addClubGet(req, res) {
  res.render('addclub');
}

function addClubPost(req, res) {
  var clubName = req.body.clubName;
  dataWrapper.addClub(clubName, function(err, data) {
    if(err) {
      res.render('addClub', { error:err });
    } else {
      res.render('home', { data:data });
    }
  });
}

function viewClub(req, res) {
  dataWrapper.findClub(req.params.id, function(err, data) {
    if(err) {
      res.render('viewclub', { error:err });
    } else {
      res.render('viewclub', { data:data });
    }
  });
}

function viewClubs(req, res) {
  dataWrapper.findClubs(function(err, data) {
    if(err) {
      res.render('viewclubs', { error:err });
    } else {
      res.render('viewclubs', { data:data });
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
      console.log(data.body);
      res.render('stock', { queryvalue:req.body.stockId, data:data.body });
    }
  });
}

exports.home = home;
exports.addUserGet = addUserGet;
exports.addUserPost = addUserPost;
exports.viewUser = viewUser;
exports.viewUsers = viewUsers;
exports.addClubGet = addClubGet;
exports.addClubPost = addClubPost;
exports.viewClub = viewClub;
exports.viewClubs = viewClubs;
exports.stockGet = stockGet;
exports.stockPost = stockPost;
