/**
 * Created by jonathan.taylor on 10/4/2014.
 */
'use strict';

var request = require('request');

function findStock(stockId, callback) {
  //var url = 'http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20(%22' + stockId + '%22)%0A%09%09&env=http%3A%2F%2Fdatatables.org%2Falltables.env&format=json';
  //var url = 'http://query.yahooapis.com/v1/public/yql?q=select%20symbol%2CAsk%20from%20yahoo.finance.quotes%20where%20symbol%20in%20(%22' + stockId + '%22)%0A%09%09&env=http%3A%2F%2Fdatatables.org%2Falltables.env&format=json';
  var url = 'http://dev.markitondemand.com/Api/v2/Quote/json?symbol=' + stockId;
  request(url, function findStockCallback(err, data) {
    return callback(err, data);
  });
}

exports.findStock = findStock;

//q=select * from yahoo.finance.quotes where symbol in ("YHOO","AAPL","GOOG","MSFT")&format=json