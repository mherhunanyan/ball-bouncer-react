class Timer {
    run(miliSecond) {
        this.miliSecond = miliSecond;
    }
    stop(miliSecond) {
        if (this.timerId) {
            setTimeout(() => {
                clearInterval(this.timerId);
            }, miliSecond);
        }
    }
    on(cb) {
        this.timerId = setInterval(cb, this.miliSecond);
    }
}

const timer = new Timer();
timer.run(1000);
timer.on(() => {
    console.log(2);
});
timer.stop(5000);
