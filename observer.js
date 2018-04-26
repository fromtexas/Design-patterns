class Car {
    constructor () {
        this._currentSpeed = 0;
        this.speedObservers = [];
    }

    subscribeSpeedObserver (observer) {
        if(observer.notify) {
            this.speedObservers.push(observer);
        }
        else {
            throw new Error('Invalid observer. Notify implementation missing')
        }
    }

    unsubscribeSpeedObserver (observer) {
        let index = this.speedObservers.indexOf(observer);
        if(index > 0) {
            this.speedObservers.splice(index, 0);
        }
    }

    notifySpeedObservers (newVal, oldVal) {
        for(let observer of this.speedObservers){
            observer.notify(newVal, oldVal);
        }
    }

    get currentSpeed () {
        return this._currentSpeed;
    }

    set currentSpeed (value) {
        let oldVal = this._currentSpeed;
        this._currentSpeed = value;
        this._currentSpeed = value;
        if(this._currentSpeed != oldVal){
            this.notifySpeedObservers(this._currentSpeed, oldVal);
        }
    }
}

class CurrentSpeedConsoleObserver { 
    notify (newVal, oldVal) {
        console.log(`Current speed changed from ${oldVal} to ${newVal}`);
    }
}

let car = new Car();
let consoleObserver = new CurrentSpeedConsoleObserver();
car.subscribeSpeedObserver(consoleObserver);
car.currentSpeed += 10;
car.currentSpeed += 10;
car.currentSpeed += 10;
car.currentSpeed += 10;