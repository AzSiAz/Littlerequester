# Littlerequester

[![Build Status](https://travis-ci.org/AzSiAz/Littlerequester.svg?branch=master)](https://travis-ci.org/AzSiAz/Littlerequester)
[![npm version](https://img.shields.io/npm/v/littlerequester.svg)](https://www.npmjs.com/package/littlerequester)
<!--[![Downloads](https://img.shields.io/npm/dt/littlerequester.svg)](https://www.npmjs.com/package/littlerequester)-->

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
With just a string
```js
const littlerequester = require("littlerequester");

// Make a request to example.com
littlerequester("http://example.com/").then(data => {
    // Get raw Data
    console.log(data.data);
    // Get node http response object
    console.log(data.res);
}, e => {
    console.log(e);
})
```
Or with a more complex object
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

2 params
- url - String : An url      
- type? - String : json or raw (default to raw) - Optional       

OR    

param - Object : options An object with the following fields :        
- url - String : Request url       
- type - String : Return data type either json or raw      
- headers - Object : Object with header to use in request (ex: user-agent)    
- method? - String : GET, POST, PUT, PATCH, DELETE default to GET if not provided - Optional     
- data? - Object : Valid Object for POST, PUT and PATCH request - Optional     

## Release History

* 0.5.0 add 2nd arg (type - Optional) for request with just a string
* 0.4.0 add request with just an url
* 0.3.0 add POST, PUT, PATCH, DELETE request type
* 0.2.0 Add headers support
* 0.1.0 Initial release
