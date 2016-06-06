# Littlerequester

[![Build Status](https://travis-ci.org/AzSiAz/Littlerequester.svg?branch=master)](https://travis-ci.org/AzSiAz/Littlerequester)
[![npm version](https://badge.fury.io/js/littlerequester.svg)](https://badge.fury.io/js/littlerequester)

## Description

Simple NodeJS HTTP/HTTPS request module with no dependency      
Support GET, POST, PUT, PATCH, DELETE request type      

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
    // Get raw Data
    console.log(data.data);
    // Get node http response object
    console.log(data.res);
}, e => {
    console.log(e);
})
```
Or
```js
const littlerequester = require("littlerequester");

littlerequester({url: "https://example.com/", type: "json"}).then(data => {
  // Get json Data
  console.log(data.data);
  // Get node http response object
  console.log(data.res);
}, e => {
    console.log(e);
});
```

## littlerequester argument doc

param - Object : options An object with the following fields:        
- url - String : Request url       
- type - String : Return data type either json or raw      
- headers - Object : Object with header to use in request (ex: user-agent)    
- method? - String : GET, POST, PUT, PATCH, DELETE default to GET if not provided
- data? - Object : Valid Object for POST, PUT and PATCH request      

## Release History

* 0.3.0 add POST, PUT, PATCH, DELETE request type
* 0.2.0 Add headers support
* 0.1.0 Initial release
