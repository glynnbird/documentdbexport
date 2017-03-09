
var documentClient = require('documentdb').DocumentClient;
var async = require('async');

// export a whole collection
var exportCollection = function(endpoint, key, database, collection, callback) {

  // record start time
  var start = new Date().getTime();

  // initialise library
  var client = new documentClient(endpoint, { masterKey: key });

  // start the query
  var lastItem = null;
  var i = 0;
  var collection_url = 'dbs/' + database + '/colls/' + collection;
  var iterator = client.queryDocuments(collection_url);

  // iterate through the collection
  async.doUntil(function(cb) {

    // retrieve the next item
    iterator.nextItem(function(err, element) {

      // if it's valid
      if (element) {

        // remove the DocumentDB special bits
        delete element._ts;
        delete element._etag;
        delete element._attachments;
        delete element._self;
        delete element._rid;
        i++;

        // output the JSON
        console.log(JSON.stringify(element));
      }
      lastItem = element;
      cb(null, null);
    });
  },function() {
    // continue until we get 'undefined'
    return lastItem === undefined;
  }, function(err, results) {

    // call the callback with a summary
    var end = new Date().getTime();
    callback(err, { records: i, time: (end - start)/1000})
  });
};

module.exports = {
  exportCollection: exportCollection
}