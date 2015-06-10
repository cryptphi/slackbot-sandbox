var extend = require('node.extend');
var googleImages = require('google-images');
var slackbotConnection = require('./../libraries/connection.js');
var coreCtrl = require('./../libraries/controller.js');

var boloCtrl = {
    startSignature: 'bolo',
    signatureCount: 4,
    actions: {
        show: function(message, parameters) {
            var self = this;
            googleImages.search(parameters[1], function(error, images) {
                if(!error) {
                    var index = Math.floor((Math.random() * (images.length - 1)) + 1);
                    var image = images[index];
                    slackbotConnection.response(image.url, message.channel);
                }
            });
        }
    }
};

module.exports = extend(coreCtrl, boloCtrl);
