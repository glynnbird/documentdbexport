#!/usr/bin/env node

var commander = require('commander');
var package = require('../package.json');
var documentdbexport = require('..');

// parse command-line parameters
commander
  .version(package.version)
  .option('-d, --database [databasename]', 'The database to work with')
  .option('-c, --collection [collectionname]', 'The collection inside the database to export')
  .parse(process.argv);

// database/collection is mandatory
if (!commander.database || !commander.collection) {
  console.log('You must specify a database/collection pair');
  commander.outputHelp();
  process.exit(1);
}

// do the export
documentdbexport.exportCollection(process.env.AZURE_ENDPOINT, process.env.AZURE_KEY, commander.database, commander.collection, function(err, data) {
  if (err) {
    console.error('ERROR', err)
  } else {
    console.error('Export complete', data)
  }
});

