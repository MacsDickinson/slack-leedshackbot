const slack = require('slack');
const _ = require('lodash');
const config = require('./config');
const matchResponse = require('./responses');

const bot = slack.rtm.client();

bot.started((payload) => {
  this.self = payload.self;
});

bot.message((msg) => {
  if (!msg.user) return;
  if (!_.includes(msg.text.match(/<@([A-Z0-9])+>/igm), `<@${this.self.id}>`)) return;

  const response = matchResponse(msg.text);

  slack.chat.postMessage({
    token: config('SLACK_TOKEN'),
    icon_emoji: config('ICON_EMOJI'),
    channel: msg.channel,
    username: config('USERNAME'),
    text: response
  }, (err, data) => {
    if (err) throw err;

    const txt = _.truncate(data.message.text);

    console.log(`🤖  beep boop: I responded with "${txt}"`);
  });
});

module.exports = bot;
