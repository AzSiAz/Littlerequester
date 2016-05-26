"use strict";

const assert = require('chai').assert;
const littlerequester = require("../lib/");

describe('Test littlerequester', function () {

    describe('Test HTTP & HTTPS', function () {
        //HTTP
        it("should support http requests", function (done) {
            littlerequester({url: "http://example.com/", type: "raw"}).then((data) => {
                assert.equal(!!/this domain/gi.test(data), true);
                done();
            });
        });

        // HTTPS
        it("should support https requests", function (done) {
            littlerequester({url: "https://github.com", type: "raw"}).then((data) => {
                assert.equal(!!/GitHub/gi.test(data), true);
                done();
            });
        });
    });
    describe('GET Method', function () {
        it('Should return JSON', function (done) {
            // this.timeout(10000);
            littlerequester({url: "https://api.azsiaz.tech/ln/english", type: "json"}).then((data) => {
                assert.equal(typeof data, "object");
                assert.equal(data.type, "Light_novel");
                done();
            })
        })
        it('Should return Raw Data', function (done) {
            // this.timeout(10000);
            littlerequester({url: "https://api.azsiaz.tech/ln/english", type: "raw"}).then((data) => {
                assert.equal(typeof data, "string");
                assert.equal(!!/Light_novel/gi.test(data), true);
                done();
            })
        })
    });
});