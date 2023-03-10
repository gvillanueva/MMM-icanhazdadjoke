Module.register("MMM-icanhazdadjoke", {

    defaults: {
        text: "Have you checked your oil?",
        updateInterval: 60 * 60 * 1000,
        animationSpeed: 2.5 * 1000
    },

    start: function() {
        requiresVersion: "2.1.0";
        this.getJoke();
        this.scheduleUpdate();
    },

    scheduleUpdate: function() {
        setInterval(() => {
            this.getJoke();
        }, this.config.updateInterval);
    },

    getDom: function() {
        var wrapper = document.createElement("div");
        wrapper.innerHTML = this.config.text;
        return wrapper;
    },

    getJoke: function() {
        this.sendSocketNotification("GET_JOKE");
    },

    socketNotificationReceived: function(notification, payload) {
        if (notification === 'JOKE') {
            this.config.text = payload;
            this.updateDom(this.config.animationSpeed);
        }
    }
});
