"use strict";

var assert = require('chai').assert;
var should = require('chai').should;
var littlerequester = require("../lib/index");
var parser = require("../lib/parseobject");
var object = {};
var partialObject = {};
var incorrectObject = {};

describe('Test littlerequester', function () {
    
    describe('ParseObject function', function () {
        before(function () {
            object = {
                url: "http://example.com/",
                type: "raw",
                headers: {
                   'User-Agent': 'LittleRequester'
                }
            };
            partialObject = {
                url: "http://example.com/"
            };
            incorrectObject = {
                url: "test",
                type: "raw"
            }
        });
        it("should return a correct object", function () {
            var parsedObject = parser(object);
            assert.equal(parsedObject.type, object.type);
            assert.equal(parsedObject.request.headers['User-Agent'], object.headers['User-Agent']);
            assert.equal(object.url.includes(parsedObject.request.hostname), true);
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
            littlerequester({url: "https://api.azsiaz.tech/ln/english", type: "json"}).then(function(data) {
                assert.equal(typeof data.data, "object");
                assert.equal(data.data.type, "Light_novel");
                done();
            })
        });
        it('Should return Raw Data', function (done) {
            this.timeout(10000);
            littlerequester({url: "http://monip.org", type: "raw"}).then(function(data) {
                // console.log(data.res);
                assert.equal(typeof data.data, "string");
                assert.equal(!!/IP/gi.test(data.data), true);
                done();
            })
        });
        it("Should return littlerequest header", function (done) {
            this.timeout(10000);
            littlerequester({url: "http://headers.jsontest.com", type: "json", headers: {"User-Agent":"LittleRequester", "test":"test"}}).then(function(data) {
                assert.equal(typeof data.data, "object");
                assert.equal(data.data['User-Agent'], "LittleRequester");
                assert.equal(data.data['test'], "test");
                done();
            })
        })
    });
});