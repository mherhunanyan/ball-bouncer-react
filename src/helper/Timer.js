export class Timer {
    run(miliSecond) {
        this.miliSecond = miliSecond;
    }

    stop(stopTime) {
        if (this.timerId !== undefined) {
            setTimeout(() => {
                clearInterval(this.timerId);
            }, stopTime);
        }
    }

    on(cb) {
        this.unSubscribe();
        this.subscribe(cb);
    }

    unSubscribe() {
        if (this.timerId !== undefined) {
            clearInterval(this.timerId);
        }
    }
    subscribe(cb) {
        this.timerId = setInterval(cb, this.miliSecond);
    }
}
