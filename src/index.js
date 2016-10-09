const express = require('express');
const proxy = require('express-http-proxy');
const bodyParser = require('body-parser');
const config = require('./config');
const clojure = require('./commands/clojure');

const bot = require('./bot');

const app = express();

if (config('PROXY_URI')) {
  app.use(proxy(config('PROXY_URI'), {
    forwardPath: (req) => { return require('url').parse(req.url).path; }
  }));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => { res.send('\n 👋 🌍 \n'); });

app.post('/commands/clojure', (req, res) => {
  const payload = req.body;
  console.log('/commands/clojure => req => ', req);
  console.log('/commands/clojure => payload => ', payload);

  if (!payload || payload.token !== config('CLOJURE_COMMAND_TOKEN')) {
    const err = '✋  An invalid slash token was provided\n' +
              '   Is your Slack slash token correctly configured?';

    console.log(err);
    res.status(401).end(err);
    return;
  }

  clojure(payload, res);
});


app.listen(config('PORT'), (err) => {
  if (err) throw err;

  console.log(`\n🚀  Starbot LIVES on PORT ${config('PORT')} 🚀`);

  if (config('SLACK_TOKEN')) {
    console.log(`🤖  beep boop: @starbot is real-time\n`);
    bot.listen({ token: config('SLACK_TOKEN') });
  }
});
