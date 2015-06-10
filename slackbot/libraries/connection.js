var config = require('./../config/config.js');
var websocket = require('websocket');
var request = require('request');

module.exports = {
    events: {},

    run: function(events) {
        var self = this;
        this.events = events;

        request(config.slackbotUrl + 'rtm.start' + this.token(), function (error, response, body) {
            if (!error) {
                body = JSON.parse(body);
                self.runWebSocket(body.url);
            }
        });
    },

    runWebSocket: function(url) {
        var self = this;
        var client = new websocket.client();

        client.on('connectFailed', function(error) {
            console.log('Connect Error: ' + error.toString());
        });

        client.on('connect', function(connection) {
            console.log('WebSocket Client Connected');

            connection.on('error', function (error) {
                console.log("Connection Error: " + error.toString());
            });

            connection.on('close', function () {
                console.log('Connection Closed');
            });

            connection.on('message', function(message) {
                if (message.type !== 'utf8') {
                    return;
                }

                var parsedMessage = JSON.parse(message.utf8Data);

                if (self.events[parsedMessage.type]) {
                    self.events[parsedMessage.type](parsedMessage);
                }

            });
        });


        client.connect(url);
    },

    response: function(message, channel) {
        var url = config.slackbotUrl
            + "/chat.postMessage"
            + this.token()
            + "&channel="
            + channel
            + "&text="
            + message;

        request(url);
    },

    token: function() {
        return '?token=' + config.slackbotToken;
    }

};
