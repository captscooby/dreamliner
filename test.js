'use strict';

var mongo = require('mongodb');
var Server = mongo.Server;
var DB = mongo.Db;

var server = new Server('localhost', 27017, {auto_reconnect:true});
var db = new DB('dreamlinerDb', server);

db.open(function(err, db) {
  if(err) {
    console.log(err);
  } else {
    db.collection('users', function(err, collectionref) { 
	  /**
      var newUser = {
	    userName: 'clafferty',
	    firstName: 'Cory',
	    lastName: 'Lafferty',
	    password: 'dreamliner',
	  };
	  collectionref.insert(newUser, function(err, result) {
	    if(err) {
	    console.log(err);
	    } else {
	      console.log('result' + result);
          collectionref.findOne({userName:"clafferty"}, function(err, doc) {
	        if(err) {
		      console.log(err);
		    } else {
		      console.log('doc' + JSON.stringify(doc));
			  db.close();
		    }
		  });
        }		
	  });
	  **/
      var cursor = collectionref.find();
      cursor.each(function(err, doc) {
          console.log(JSON.stringify(doc));
		  db.close();
      });	  
    });
    console.log('hello there mongo');
  }
});
  

function closeDb(db) {
};
