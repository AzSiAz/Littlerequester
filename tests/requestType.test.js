"use strict";

var assert = require('chai').assert;
var should = require('chai').should;
var littlerequester = require("../dist/index");


describe('Test Request type', function() {

  describe('GET Method', function () {
      it('Should return JSON', function (done) {
          this.timeout(10000);
          littlerequester({url: "http://reqres.in/api/users/2", type: "json"}).then(function(data) {
              assert.equal(typeof data.data, "object");
              assert.equal(data.data.data.id, 2);
              done();
          });
      });

      it('Should return JSON (2 args)', function (done) {
          this.timeout(10000);
          littlerequester("http://reqres.in/api/users/2", "json").then(function(data) {
              assert.equal(typeof data.data, "object");
              assert.equal(data.data.data.id, 2);
              done();
          });
      });

      it('Should return Raw Data', function (done) {
          this.timeout(10000);
          littlerequester({url: "http://monip.org", type: "raw"}).then(function(data) {
              assert.equal(typeof data.data, "string");
              assert.equal(!!/IP/gi.test(data.data), true);
              done();
          });
      });

      it('Should return Raw Data (2 args)', function (done) {
          this.timeout(10000);
          littlerequester("http://monip.org", "raw").then(function(data) {
              assert.equal(typeof data.data, "string");
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
})
