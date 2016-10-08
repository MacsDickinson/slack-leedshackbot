const config = require('../config');
const Botkit = require('botkit');
const moment = require('moment');

const controller = Botkit.slackbot({});
const bot = controller.spawn();

bot.configureIncomingWebhook({ url: config('WEBHOOK_URL') });

const end = moment('2016-10-09').startOf('day').add(13, 'hours');

const msg = {
  response_type: 'in_channel',
  username: config('USERNAME'),
  icon_emoji: config('ICON_EMOJI'),
  text: 'Hacking ends ' + end.fromNow()
};

bot.sendWebhook(msg, (error, res) => {
  if (error) throw error;

  console.log(`\n🚀  Starbot report delivered 🚀`);
});