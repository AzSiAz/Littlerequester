"use strict";

var assert = require('chai').assert;
var should = require('chai').should;
var querystring = require("querystring");
var parser = require("../dist/parseobject");
var object = {};
var partialObject = {};
var incorrectObject = {};
var postObject = {};
var putObject = {};
var delObject = {};


describe('ParseObject function', function () {
    before(function () {
        object = {
            url: "http://example.com/",
            type: "raw",
            headers: {
               'User-Agent': 'testAgent'
            }
        };
        partialObject = {
            url: "http://example.com/"
        };
        incorrectObject = {
            url: "test",
            type: "raw"
        };
        postObject = {
          url: "http://example.com/",
          type: "raw",
          data: {
            test: "test2"
          },
          method: "POST"
        };
        delObject = {
          url: "http://example.com/",
          type: "raw",
          data: {
            test: "test2"
          },
          method: "DELETE"
        };
        putObject = {
          url: "http://example.com/",
          type: "raw",
          data: {
            test: "test2"
          },
          method: "PUT"
        };
    });

    it("should not pass if not an url", function () {
        assert.throws(function() { parser("test") }, Error, /Object/);
    });

    it("should return a correct object", function () {
        var parsedObject = parser(object);
        assert.equal(parsedObject.type, object.type);
        assert.equal(parsedObject.request.headers['User-Agent'], object.headers['User-Agent']);
        assert.equal(object.url.includes(parsedObject.request.hostname), true);
    });

    it("should return a correct object for POST request", function () {
        var parsedObject = parser(postObject);
        assert.equal(parsedObject.request.method, postObject.method);
        assert.equal(parsedObject.request.headers['Content-Type'], "application/x-www-form-urlencoded");
        assert.equal(parsedObject.request.headers['Content-Length'], querystring.stringify(postObject.data).length);
    });
    it("should return a correct object for PUT request", function () {
        var parsedObject = parser(putObject);
        assert.equal(parsedObject.request.method, putObject.method);
        assert.equal(parsedObject.request.headers['Content-Type'], "application/x-www-form-urlencoded");
        assert.equal(parsedObject.request.headers['Content-Length'], querystring.stringify(putObject.data).length);
    });
    it("should return a correct object for DELETE request", function () {
        var parsedObject = parser(delObject);
        assert.equal(parsedObject.request.method, delObject.method);
    });

    it("should pass even if only url is correct", function () {
        var parsedObject = parser(partialObject);
        assert.equal(parsedObject.type, "raw");
        assert.equal(parsedObject.request.headers['User-Agent'], "LittleRequester");
        assert.equal(parsedObject.request.href, partialObject.url);
    });

    it("should not pass if incorrect object", function () {
        assert.throws(function() { parser(incorrectObject) }, Error, /url/);
    });

});
