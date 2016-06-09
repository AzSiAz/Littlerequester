"use strict";

var assert = require('chai').assert;
var should = require('chai').should;
var littlerequester = require("../dist/index");


describe('Test littlerequester', function () {

    describe('Test HTTP & HTTPS string', function () {

        it("should support http requests", function (done) {
            this.timeout(10000);
            littlerequester("http://example.com").then(function(data) {
                assert.equal(!!/this domain/gi.test(data.data), true);
                done();
            });
        });

        it("should support https requests", function (done) {
            this.timeout(10000);
            littlerequester("https://github.com").then(function(data) {
                assert.equal(!!/GitHub/gi.test(data.data), true);
                done();
            });
        });
    });

    describe('Test HTTP & HTTPS object', function () {

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

});
