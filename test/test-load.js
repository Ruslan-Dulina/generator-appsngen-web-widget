/*global describe, beforeEach, it*/
'use strict';
var assert = require('assert');

describe('appsngen generator', function () {
  it('can be imported without blowing up', function () {
    var app = require('.');
    assert(app !== undefined);
  });
});
