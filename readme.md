# Littlerequester

[![Build Status](https://travis-ci.org/AzSiAz/Littlerequester.svg?branch=master)](https://travis-ci.org/AzSiAz/Littlerequester)
[![npm version](https://badge.fury.io/js/littlerequester.svg)](https://badge.fury.io/js/littlerequester)

## Test
Tested for NodeJS 4, 5 and 6        
## Installation
```sh
$ npm i littlerequester --save
```

## Usage
```js
const littlerequester = require("littlerequester");

// Make a request to example.com
littlerequester({url: "http://example.com/", type: "raw"}).then(data => {
    console.log(data);
}, e => {
    console.log(e);
})
```
Or
```js
const littlerequester = require("littlerequester");

littlerequester({url: "http://example.com/", type: "json"}).then(data => {
    console.log(data);
}, e => {
    console.log(e);
});
```

## littlerequester argument doc

param - Object : options An object with the following fields:        
- url - String : Request url       
- type - String : Return data type either json or raw      
- headers - Object : Object with header to use in request (ex: user-agent)         

## Release History

* 0.2.0 Add headers support
* 0.1.0 Initial release
