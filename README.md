# slack hackbot

## Setup

This application requires a number of environment variables to be set to run locally (hooked up in `src/config.js`). Create a local `.env` file with relevant values.

    NODE_ENV=development
    PORT=3000
    WEBHOOK_URL='https://hooks.slack.com/services/WEBHOOK_URL'
    CLOJURE_COMMAND_TOKEN='oIk16X7evTJupV7sM1FSKoB9'
    SLACK_TOKEN='xoxb-slack-bot-key'
    ICON_EMOJI=':boom:'
    USERNAME='botname'

To start the server run

    npm start

## Functions

### Countdown

This requires that a valid `WEBHOOK_URL` is set.

run the countdown manually with

    npm run countdown

### Responses

If the server is running and a valid `SLACK_TOKEN` is present the responses configured in `src/responses.js` will trigger in slack when the pattern is matched.

### Clojure

There are two clojure implementations.

Messages in slack prefixed with cljs will execute and respond as per the responses above.

There is also a slash command configured. To hook this up create a new slash command in slack pointing to yoursite/commands/clojsure and set the `CLOJURE_COMMAND_TOKEN` variable. This will add the `/clojure` command to slack which can be used like `/clojure (+ 1 4)`. The output of this command would be

> 5
