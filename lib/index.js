"use strict";

/**
littlerequester

@name littlerequester
@function
@param {String}

@return {Promise} Return a promise
**/

function littlerequester(options) {
  if (typeof options === "string") {
    options = {
      url: options
    }
  }
}

module.exports = littlerequester;
