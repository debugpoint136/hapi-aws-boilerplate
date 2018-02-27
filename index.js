'use strict';

const hapiLambda = require('hapi-lambda');
const api = require('./api');

hapiLambda.configure([api]);
exports.handler = hapiLambda.handler;
