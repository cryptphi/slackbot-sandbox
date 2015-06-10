var slackbotConnection = require('./slackbot/libraries/connection.js');
var events = require('./slackbot/libraries/events.js');
var boloCtrl = require('./slackbot/controllers/bolo.js');

events.registerController('message', boloCtrl);

slackbotConnection.run(events);
