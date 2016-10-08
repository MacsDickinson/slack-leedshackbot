'use strict';

const moment = require('moment');
const getRemainingTime = require('./getRemainingTime');
require('moment-timezone');

const responses = [
  { pattern: /hello/g, response: 'hi' },
  { pattern: /how long/g, response: getRemainingTime(moment('2016-10-09').startOf('day').add(13, 'hours')) }
];

function matchResponse(input) {
  for (let i = 0; i < responses.length; i++) {
    if (input.match(responses[i].pattern)) {
      return responses[i].response;
    }
  }
  return 'beep boop: I hear you but I do not understand you.';
}

module.exports = matchResponse;
