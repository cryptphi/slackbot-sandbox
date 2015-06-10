module.exports = {
    events: {},

    registerEvent: function(on, callback) {
        this.events[on] = this.events[on] || [];
        this.events[on].push(callback);
    },

    registerController: function(on, controller) {
        this.registerEvent(on, function(response) {
            controller.init(response);

            if (controller.isCommand()) {
                controller.process();
            }
        });
    },

    message: function(message) {
        for(var event in this.events['message']) {
            this.events['message'][event](message);
        }
    }


};
