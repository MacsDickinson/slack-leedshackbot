'use strict';

const slack = require('slack');
const _ = require('lodash');
const config = require('./config');
const matchResponse = require('./responses');
const cljs = require('clojurescript');

const bot = slack.rtm.client();
let ctx = cljs.newContext();

function postResponse(response, channel) {
  console.log('response => ', response);

  slack.chat.postMessage({
    token: config('SLACK_TOKEN'),
    icon_emoji: config('ICON_EMOJI'),
    channel,
    username: config('USERNAME'),
    text: response
  }, (err, data) => {
    if (err) throw err;

    const txt = _.truncate(data.message.text);

    console.log(`🤖  beep boop: I responded with "${txt}"`);
  });
}

function executeClojure(msg) {
  try {
    const closure = msg.text.replace('cljs ', '');
    if (closure === 'reset') {
      ctx = cljs.newContext();
      postResponse('clojure context reset', msg.channel);
      return;
    }
    const result = cljs.eval(closure, ctx);
    console.log('result -> ', result);
    if (typeof result === 'string' || typeof result === 'number' || typeof result === 'boolean') {
      postResponse(`> ${result}`, msg.channel);
    }
  } catch (e) {
    postResponse('Fail => ' + e.message, msg.channel);
  }
}

bot.started((payload) => {
  this.self = payload.self;
});

bot.message((msg) => {
  if (!msg.user) return;
  if (msg.text.match(/^cljs /g)) {
    executeClojure(msg);
    return;
  }

  const response = matchResponse(msg.text);

  if (response) {
    postResponse(response, msg.channel);
    return;
  }

  // if (!_.includes(msg.text.match(/<@([A-Z0-9])+>/igm), `<@${this.self.id}>`)) return;
});

module.exports = bot;
