const moment = require('moment');
require('moment-precise-range-plugin');

const getRemainingTime = (end) => {
  const london = end.tz('Europe/London');
  const diff = london.diff(moment());
  return moment.preciseDiff(0, diff);
};

module.exports = getRemainingTime;
