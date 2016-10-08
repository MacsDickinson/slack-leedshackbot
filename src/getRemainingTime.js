const moment = require('moment');
require('moment-precise-range-plugin');

const getRemainingTime = (end) => {
  const diff = end.diff(moment().utcOffset(60));
  return moment.preciseDiff(0, diff);
};

module.exports = getRemainingTime;
