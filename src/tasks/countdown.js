const config = require('../config');
const Botkit = require('botkit');
const moment = require('moment');
const getRemainingTime = require('../getRemainingTime');

const controller = Botkit.slackbot({});
const bot = controller.spawn();

bot.configureIncomingWebhook({ url: config('WEBHOOK_URL') });

const end = moment('2016-10-09').utcOffset(60).startOf('day').add(13, 'hours');
const diff = getRemainingTime(end);

const msg = {
  response_type: 'in_channel',
  username: config('USERNAME'),
  icon_emoji: config('ICON_EMOJI'),
  text: diff + ' to go'
};

bot.sendWebhook(msg, (error, res) => {
  if (error) throw error;

  console.log(`\n🚀 Countdown delivered 🚀`);
});
