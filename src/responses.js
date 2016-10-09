'use strict';

const moment = require('moment');
const getRemainingTime = require('./getRemainingTime');

function isInPast(date) {
  return date.diff(moment().utcOffset(60)) < 0;
}

function hackTimeRemaining() {
  const hackEnd = moment('2016-10-09').utcOffset(60).startOf('day').add(13, 'hours');

  if (isInPast(hackEnd)) {
    return 'The hack has ended :(';
  }

  const timeRemaining = getRemainingTime(hackEnd);
  return `there are ${timeRemaining} left in the hackathon`;
}

function timeUntilBeer() {
  const baconTime = moment('2016-10-09').utcOffset(60).startOf('day').add(14, 'hours');

  if (isInPast(baconTime)) {
    return 'Beer is here! Go get some';
  }

  const timeRemaining = getRemainingTime(baconTime);
  return `Haven't you had enought? The bar opens in ${timeRemaining}`;
}

function timeUntilBreakfast() {
  const baconTime = moment('2016-10-09').utcOffset(60).startOf('day').add(8, 'hours');

  if (isInPast(baconTime)) {
    return 'It\'s here already!';
  }

  const timeRemaining = getRemainingTime(baconTime);
  return `Bacon butties will arrive in ${timeRemaining}`;
}

const responses = [
  { pattern: /(hello|hi|hey|hola)/gi, response: 'hi' },
  { pattern: /how long until (breakfast|food|bacon|lunch)/gi, response: timeUntilBreakfast() },
  { pattern: /how long until (beer|drinks|the bar opens)/gi, response: timeUntilBeer() },
  { pattern: /how long/gi, response: hackTimeRemaining() },
  { pattern: /should I go to sleep\?/gi, response: 'Probably' },
  { pattern: /server time/g, response: moment().format() }
];

function matchResponse(input) {
  for (let i = 0; i < responses.length; i++) {
    if (input.match(responses[i].pattern)) {
      return responses[i].response;
    }
  }
  return null;
}

module.exports = matchResponse;
