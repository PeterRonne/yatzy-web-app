import { Die } from "./Die.js";

export class RaffleCup {
    constructor() {
        this.dice = [new Die(), new Die(), new Die(), new Die(), new Die()];
    }

    throwDice() {
        for (let i = 0; i < this.dice.length; i++) {
            if (!this.dice[i].locked) {
                this.dice[i].roll();
            }
        }
        return this.dice;
    }

    diceSum() {
        let sum = 0;
        for (const die of this.dice) {
            sum += die.eyes;
        }
        return sum;
    }

    toggleLock(index) {
        let die = this.dice[index];
        if (!die.locked) {
            die.lock();
        } else {
            die.unlock();
        }
    }

    reset() {
        for (const die of this.dice) {
            die.unlock();
        }
    }

    getEyes() {
        let eyes = [];
        for (const die of this.dice) {
            eyes.push(die.eyes);
        }
        return eyes;
    }
}
