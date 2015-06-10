module.exports = {
    connection: {},
    command: {},
    message: {},
    startSignature: '//',
    signatureCount: 2,

    init: function(message) {
        this.message = message;
    },

    isCommand: function() {
        if (this.message.text && this.message.text.substr(0,this.signatureCount) === this.startSignature) {
            this.command = this.parseCommand(this.message);
            return true;
        }

        return false;
    },

    parseCommand: function(message) {
        var separator = /\s/;
        var parameters = message.text.substr(this.signatureCount).split(separator);
        var action = parameters[1];
        parameters.shift();

        return {
            action: action,
            parameters: parameters
        };
    },

    process: function() {
        if (this.actions[this.command.action]) {
            this.actions[this.command.action](this.message, this.command.parameters);
        }
    },

    actions: {

    }
};
