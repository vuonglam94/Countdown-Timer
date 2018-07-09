function Timer(count, interval) {
    this.count = count ? count : 0;
    this.interval = interval ? interval : 0;
    this.isPaused = false;
    this.intervalID = 0;
    this.outputMinID = "min";
    this.outputSecID = "sec";
    this.callback = null;
}

// init function
Timer.prototype.init = function() {
    console.log('init');
    this.alert();
};

// alert the properties
Timer.prototype.alert = function() {
    alert(this.count + ":" + this.interval + ":" + this.isPaused + ":" + this.intervalID);
};

// print time
Timer.prototype.printTime = function() {
    if (Math.floor(this.count / 60) < 10) {
        document.getElementById(this.outputMinID).innerHTML = "0" + Math.floor(this.count / 60);
    } else {
        document.getElementById(this.outputMinID).innerHTML = Math.floor(this.count / 60);
    }
    
    if (Math.round(this.count % 60) < 10) {
        document.getElementById(this.outputSecID).innerHTML = "0" + Math.round(this.count % 60);
    } else {
        document.getElementById(this.outputSecID).innerHTML = Math.round(this.count % 60);
    }
};

// start the timer
Timer.prototype.start = function(e) {

    //clear interval
    if (this.intervalID != 0) {
        clearInterval(this.intervalID);
    }

    //print time
    this.removeRedFont();
    this.printTime();

    var self = this;

    //setInterval method sets the interval for repeating the function
    this.intervalID = setInterval(function() {
        self.count -= 1;
        if (self.count >= 0) {
            self.removeRedFont();
            self.printTime();
        } else {
            self.stop();
        }
    }, self.interval);
};

// stop timer
Timer.prototype.stop = function() {
    //this.alert();
    clearInterval(this.intervalID);
    this.count = 0;
    this.interval = 0;
    this.isPaused = false;
    this.addRedFont();
    this.printTime();
    if(this.callback) {
        this.callback();
    }
};

// pause timer
Timer.prototype.pause = function() {
    //this.alert();
    clearInterval(this.intervalID);
    this.isPaused = true;
};

// unpause timer
Timer.prototype.unpause = function(e) {
    //this.alert();
    this.start();
    this.isPaused = false;
};

// add red font
Timer.prototype.addRedFont = function() {
    document.getElementById(this.outputMinID).classList.add('red-font');
    document.getElementById(this.outputSecID).classList.add('red-font'); 
}

// remove red font
Timer.prototype.removeRedFont = function() {
    document.getElementById(this.outputMinID).classList.remove('red-font');
    document.getElementById(this.outputSecID).classList.remove('red-font'); 
}

/**
 * init method
 */
function init() {

    // get new instance of timer
    var timer = new Timer();
    timer.outputMinID = "min-countdown";
    timer.outputSecID = "sec-countdown";

    /* get the buttons and attach eventhandlers */
    var startBtn = document.getElementById("start-btn");
    var stopBtn = document.getElementById("stop-btn");

    startBtn.onclick = function() {
        timer.count = document.getElementById("min-select").value * 60;
        timer.interval = 1000;
        timer.start();
        if (timer.isPaused === true) {
            pauseBtn.innerHTML = "pause";
        }
    };
    
    stopBtn.onclick = function() {
        timer.stop();
    };
}

window.onload = init;