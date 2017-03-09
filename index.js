
var documentClient = require('documentdb').DocumentClient;
var async = require('async');

var exportCollection = function(endpoint, key, database, collection, callback) {
  var start = new Date().getTime();
  var client = new documentClient(endpoint, { masterKey: key });
  var collection_url = 'dbs/' + database + '/colls/' + collection;
  var iterator = client.queryDocuments(collection_url);
  var lastItem = null;
  var i = 0;
  async.doUntil(function(cb) {
    iterator.nextItem(function(err, element) {
      if (element) {
        delete element._ts;
        delete element._etag;
        delete element._attachments;
        delete element._self;
        delete element._rid;
        console.log(JSON.stringify(element));
      }
      lastItem = element
      cb(null, null);
    });
  },function() {
    return lastItem === undefined;
  }, function(err, results) {
    var end = new Date().getTime();
    callback(err, { records: i, time: (end - start)/1000})
  });
};

module.exports = {
  exportCollection: exportCollection
}