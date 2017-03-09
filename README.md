# documentdbexport

Command-line utility to export a DocumentDB database/collection to a list of JSON documents.

## Installation

The *documentdbexport* package is installed via npm:

```sh
npm install -g documentdbexport
```

You may need to precede the above command with `sudo`, depending on your Node.js installation.

## Configuration

The *documentdbexport* is configured by setting your Azure Endpoint and URL asas environment variables:

```sh
export AZURE_ENDPOINT="https://mydocumentdb.documents.azure.com:443/"
export AZURE_KEY="GeIZysnonvgpk2"
```

## Command-line Usage

Use the *documentdbexport* tool to export an entire DocumentDB collection. The database is specified with `-d` and the collection with `-c`:

```sh
$ documentdbexport -d iot -c temperaturereadings
{"temperature":8391,"time":"2017-03-09T01:38:11+0000","id":"1489023491"}
{"temperature":29130,"time":"2017-03-09T02:35:37+0000","id":"1489026937"}
{"temperature":27650,"time":"2017-03-08T18:35:58+0000","id":"1488998158"}
Export complete { records: 3, time: 0.145 }
```

The data can be directed to a text file:

```sh
$ documentdbexport -d iot -c temperaturereadings > mydata.txt
Export complete { records: 3, time: 0.145 }
```

or piped elsewhere e.g. to [couchimport](https://www.npmjs.com/couchimport) to import the data into Apache CouchDB:

```sh
$ documentdbexport -d iot -c temperaturereadings | couchimport --db mycouchtable --type jsonl
Export complete { records: 3, time: 0.145 }
couchimport writecomplete { total: 3, totalfailed: 0 } +20ms
couchimport Import complete
```

## Programmatic Usage

You can also use the library within your own code:

```js
var documentdbexport = require('documentdbexport');
var endpoint = 'https://mydocumentdb.documents.azure.com:443/';
var key = 'GeIZysnonvgpk2';
var database = 'mydatabase';
var collection = 'mycollection';
documentdbexport.exportCollection(endpoint, key, database, collection, function(err, data) {
  if (err) {
    console.error('ERROR', err)
  } else {
    console.error('Export complete', data)
  }
});
```

## Options Reference

### Command-line parameters

* -d or --database - the database to work with (required)
* -c or --collection - the collection to export (required)

### Environment variables

* AZURE_ENDPOINT - the Azure endpoint URL key
* AZURE_KEY - the Azure primary API key
