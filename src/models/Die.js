export class Die {
    constructor() {
        this.eyes = Math.floor(Math.random() * 6) + 1;
        this.locked = false;
    }

    roll() {
        this.eyes = Math.floor(Math.random() * 6) + 1;
    }

    lock() {
        this.locked = true;
    }

    unlock() {
        this.locked = false;
    }

    setEyes(eyes) {
        this.eyes = eyes;
    }
}
