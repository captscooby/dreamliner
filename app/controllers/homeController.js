/**
 * Created by jonathan.taylor on 10/4/2014.
 */
var dataWrapper = require('../utils/dataWrapper');
var stockWrapper = require('../utils/stockWrapper');
var q = require('q');

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
  dataWrapper.findClub(req.params.id, function(err, clubData) {
    if(err) {
      res.render('viewclub', { error:err });
    } else {
      var returnData = {
        club:clubData
      };
      dataWrapper.findUsers(function(err, userOutData) {
        if(err) {
          res.render('viewclub', { error:err });
        } else {
          returnData.usersout = userOutData;
          dataWrapper.findUsersInClub(req.params.id, function(err, userInData) {
            if(err) {
              res.render('viewclub', { error:err });
            } else {
              returnData.usersin = userInData;
              dataWrapper.findClubStocks(req.params.id, function(err, stocksData) {
                if(err) {
                  res.render('viewclub', { error:err });
                } else {
                  q.fcall(function() {
                    stocksData.forEach(function (stock) {
                      stockWrapper.findStock(stock.stockSymbol, function (err, yahooStockData) {
                        if (err) {
                          res.render('viewclub', { error: err });
                        } else {
                          stock.rawData = yahooStockData.body;
                          console.log(stock);
                        }
                      });
                    });
                  }).then(function() {
                    returnData.stocks = stocksData;
                    //console.log(returnData);
                    res.render('viewclub', { data:returnData });
                  });
                }
              });
            }
          });
        }
      });
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
  stockWrapper.findStock(req.body.stockId, function(err, data) {
    if(err) {
      res.render('stock', { error:err });
    } else {
      console.log(data.body);
      res.render('stock', { queryvalue:req.body.stockId, data:data.body });
    }
  });
}

function addUserToClub(req, res) {
  dataWrapper.addUserToClub(req.params.clubid, req.params.userid, function(err, data) {
    if(err) {
      res.render('home', { error:err });
    } else {
      res.redirect('viewclub/' + req.params.clubid);
    }
  });
}

function addStockToClub(req, res) {
  dataWrapper.addStockToClub(req.body.clubid, req.body.symbol, req.body.shares, function(err, data) {
    if(err) {
      res.render('home', { error:err });
    } else {
      res.redirect('viewclub/' + req.body.clubid);
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
exports.addUserToClub = addUserToClub;
exports.addStockToClub = addStockToClub;
