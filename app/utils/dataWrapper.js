/**
 * Created by jonathan.taylor on 10/4/2014.
 */
'use strict';

var mongo = require('mongodb');
var Server = mongo.Server;
var DB = mongo.Db;

var server = new Server('localhost', 27017, {auto_reconnect:true});
var db = new DB('dreamlinerDb', server);

function addUser(userName, password, firstName, lastName, callback) {
  db.open(function(err, db) {
    if (err) {
      db.close();
      return callback(err, null);
    } else {
      db.collection('users', function (err, collectionref) {
        var newUser = {
          userName: userName,
          firstName: firstName,
          lastName: lastName,
          password: password
        };
        collectionref.count({userName:userName}, function (err, amount) {
          if (err) {
            db.close();
            return callback(err, null);
          } else {
            if (amount > 0) {
              db.close();
              return callback('user already exists', null);
            } else {
              collectionref.insert(newUser, function (err, result) {
                if (err) {
                  db.close();
                  return callback(err, null);
                } else {
                  db.close();
                  return callback(null, 'user added');
                }
              });
            }
          }
        });
      });
    }
  });
}

function viewUsers(callback) {
  db.open(function(err, db) {
    if (err) {
      db.close();
      return callback(err, null);
    } else {
      db.collection('users', function (err, collectionref) {
        var cursor = collectionref.find();
        cursor.toArray(function(err, docs) {
          if (err) {
            db.close();
            return callback(err, null);
          } else {
            db.close();
            return callback(null, docs);
          }
        });
      });
    }
  });
}

function addClub(clubName, callback) {
  db.open(function(err, db) {
    if (err) {
      db.close();
      return callback(err, null);
    } else {
      db.collection('clubs', function (err, collectionref) {
        var newClub = {
          clubName: clubName
        };
        collectionref.count({clubName: clubName}, function (err, amount) {
          if (err) {
            db.close();
            return callback(err, null);
          } else {
            if (amount > 0) {
              db.close();
              return callback('club already exists', null);
            } else {
              collectionref.insert(newClub, function (err, result) {
                if (err) {
                  db.close();
                  return callback(err, null);
                } else {
                  db.close();
                  return callback(null, 'club added');
                }
              });
            }
          }
        });
      });
    }
  });
}

function viewClubs(callback) {
  db.open(function(err, db) {
    if (err) {
      db.close();
      return callback(err, null);
    } else {
      db.collection('clubs', function (err, collectionref) {
        var cursor = collectionref.find();
        cursor.toArray(function(err, docs) {
          if (err) {
            db.close();
            return callback(err, null);
          } else {
            console.log(docs);
            db.close();
            return callback(null, docs);
          }
        });
      });
    }
  });
}

exports.addUser = addUser;
exports.viewUsers = viewUsers;
exports.addClub = addClub;
exports.viewClubs = viewClubs;