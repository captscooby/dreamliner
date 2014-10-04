/**
 * Created by jonathan.taylor on 10/4/2014.
 */
var dataWrapper = require('../../dataWrapper');

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
      res.render('adduser', { data:err });
    } else {
      res.render('home', { data:data });
    }
  });

}

function viewUsers(req, res) {
  res.render('viewUsers', { data: 'something' });
}

exports.home = home;
exports.addUserGet = addUserGet;
exports.addUserPost = addUserPost;
exports.viewUsers = viewUsers;
