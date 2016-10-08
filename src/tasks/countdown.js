const config = require('../config');
const Botkit = require('botkit');
const moment = require('moment');
require('moment-precise-range-plugin');

const controller = Botkit.slackbot({});
const bot = controller.spawn();

bot.configureIncomingWebhook({ url: config('WEBHOOK_URL') });

const end = moment('2016-10-09').startOf('day').add(13, 'hours');
const diff = end.diff(moment());
const preciseDiff = moment.preciseDiff(0, diff);

const msg = {
  response_type: 'in_channel',
  username: config('USERNAME'),
  icon_emoji: config('ICON_EMOJI'),
  text: preciseDiff + ' to go'
};

bot.sendWebhook(msg, (error, res) => {
  if (error) throw error;

  console.log(`\n🚀 Countdown delivered 🚀`);
});
