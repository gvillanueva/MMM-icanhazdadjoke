const NodeHelper = require('node_helper');

module.exports = NodeHelper.create({
    start: function() {
    },

    getDadJoke: function() {
        fetch("https://icanhazdadjoke.com", {
            method: 'GET',
            headers: {
                "Accept": "text/plain",
                "User-Agent": "MMM-icanhazdadjoke (https://github.com/gvillanueva/MMM-icanhazdadjoke)"
            },            
        }).then((response) => response.text())
        .then((text) => this.sendSocketNotification('JOKE', text));
    },

    socketNotificationReceived: function(notification, payload) {
        if (notification === 'GET_JOKE') {
            this.getDadJoke();
        }
    }
});
