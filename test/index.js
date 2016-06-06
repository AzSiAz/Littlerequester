"use strict";

var assert = require('chai').assert;
var should = require('chai').should;
var querystring = require("querystring");
var littlerequester = require("../lib/index");
var parser = require("../lib/parseobject");
var object = {};
var partialObject = {};
var incorrectObject = {};
var postObject = {};
var putObject = {};
var delObject = {};


describe('Test littlerequester', function () {

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

        it("should not pass if not object", function () {
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

        it("should pass even if only url is correct", function (done) {
            this.timeout(10000);
            littlerequester(partialObject).then(function(data) {
                assert.equal(!!/this domain/gi.test(data.data), true);
                done();
            });
        });

        it("should not pass if incorrect object", function () {
            assert.throws(function() { parser(incorrectObject) }, Error, /url/);
        });

    });

    describe('Test HTTP & HTTPS', function () {

        it("should support http requests", function (done) {
            this.timeout(10000);
            littlerequester({url: "http://example.com", type: "raw"}).then(function(data) {
                assert.equal(!!/this domain/gi.test(data.data), true);
                done();
            });
        });

        it("should support https requests", function (done) {
            this.timeout(10000);
            littlerequester({url: "https://github.com", type: "raw"}).then(function(data) {
                assert.equal(!!/GitHub/gi.test(data.data), true);
                done();
            });
        });
    });
    describe('GET Method', function () {
        it('Should return JSON', function (done) {
            this.timeout(10000);
            littlerequester({url: "http://jsonplaceholder.typicode.com/posts/1", type: "json"}).then(function(data) {
                assert.equal(typeof data.data, "object");
                assert.equal(data.data.id, 1);
                done();
            });
        });

        it('Should return Raw Data', function (done) {
            this.timeout(10000);
            littlerequester({url: "http://monip.org", type: "raw"}).then(function(data) {
                assert.equal(typeof data.data, "string");
                // console.log(data.res);
                assert.equal(!!/IP/gi.test(data.data), true);
                done();
            });
        });

        it("Should return littlerequest header", function (done) {
            this.timeout(10000);
            littlerequester({url: "http://headers.jsontest.com", type: "json", headers: {"User-Agent": 'testAgent', test: "test"}}).then(function(data) {
                assert.equal(typeof data.data, "object");
                assert.equal(data.data["User-Agent"], "testAgent");
                assert.equal(data.data['test'], "test");
                done();
            }).catch(function (e) {
                console.log(e);
            })
        });

    });

    describe("POST Request", function () {

        it("Should make a post request", function (done) {
            this.timeout(10000);
            littlerequester({url: "http://reqres.in/api/users", type: "json", method: "POST", data: {"name": "morpheus", "job": "leader"}}).then(function(data) {
                assert.equal(typeof data.data, "object");
                assert.equal(data.data.job, "leader");
                done();
            });
        });

    });

    describe("PUT Request", function () {

        it("Should make a put request", function (done) {
            this.timeout(10000);
            littlerequester({url: "http://reqres.in/api/users/2", type: "json", method: "PUT", data: {"name": "morpheus", "job": "zion resident"}}).then(function(data) {
                assert.equal(typeof data.data, "object");
                assert.equal(data.data.job, "zion resident");
                done();
            });
        });

    });

    describe("PATCH Request", function () {

        it("Should make a patch request", function (done) {
            this.timeout(10000);
            littlerequester({url: "http://reqres.in/api/users/2", type: "json", method: "PATCH", data: {"name": "morpheus", "job": "zion"}}).then(function(data) {
                assert.equal(typeof data.data, "object");
                assert.equal(data.data.job, "zion");
                done();
            }, function (e) {
                console.log(e);
            });
        });

    });

    describe("DELETE Request", function () {

        it("Should make a delete request", function (done) {
            this.timeout(10000);
            littlerequester({url: "http://reqres.in/api/users/2", type: "raw", method: "DELETE"}).then(function(data) {
                assert.equal(data.res.statusCode, 204);
                done();
            });
        });

    });

});
