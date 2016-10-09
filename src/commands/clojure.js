const cljs = require('clojurescript');
const config = require('../config');

let ctx = cljs.newContext();

function executeClojure(msg) {
  try {
    const closure = msg.text.replace('cljs ', '');
    if (closure === 'reset') {
      ctx = cljs.newContext();
      return 'clojure context reset';
    }
    const result = cljs.eval(closure, ctx);
    console.log('result -> ', result);
    return result;
  } catch (e) {
    return `Fail => ${e.message}`;
  }
}

const handler = (payload, res) => {
  const result = executeClojure(payload.text);

  if (typeof result === 'string' || typeof result === 'number' || typeof result === 'boolean') {
    const msg = {
      channel: payload.channel_name,
      username: config('ICON_EMOJI'),
      icon_emoji: config('ICON_EMOJI'),
      text: `> ${result}`
    };

    res.set('content-type', 'application/json');
    res.status(200).json(msg);
  }
};

module.exports = handler;