import { RaffleCup } from "./RaffleCup.js";

export class YatzyCalculator {
    constructor(raffleCup) {
        this.raffleCup = raffleCup;
        this.eyeCount = [0, 0, 0, 0, 0, 0];
    }

    calculateResult() {
        this.eyeCount.fill(0);
        const dice = this.raffleCup.throwDice();
        for (let i = 0; i < dice.length; i++) {
            let eyes = dice[i].eyes;
            if (eyes !== 0) {
                this.eyeCount[eyes - 1]++;
            }
        }
    }

    upperSectionScore(eyes) {
        return eyes * this.eyeCount[eyes - 1];
    }

    // kan bruges i stedet for onepairScore, threeOfAKind og fourOfAKind
    OfAKindScore(num) {
        let score = 0;
        for (let i = 0; i < this.eyeCount.length; i++) {
            if (this.eyeCount[i] >= num) score = (i + 1) * num;
        }
        return score;
    }

    onePairScore() {
        let onePair = 0;
        for (let i = 0; i < this.eyeCount.length; i++) {
            if (this.eyeCount[i] >= 2) {
                onePair = (i + 1) * 2;
            }
        }
        return onePair;
    }

    twoPairScore() {
        let firstPair = this.onePairScore();
        let firstPairIndex = firstPair / 2 - 1;
        let secondPair = 0;
        for (let i = 0; i < firstPairIndex; i++) {
            if (this.eyeCount[i] >= 2) {
                secondPair = (i + 1) * 2;
            }
        }

        if (firstPair !== 0 && secondPair !== 0) {
            return firstPair + secondPair;
        }
        return 0;
    }

    threeOfAKindScore() {
        for (let i = 0; i < this.eyeCount.length; i++) {
            if (this.eyeCount[i] >= 3) {
                return (i + 1) * 3;
            }
        }
        return 0;
    }

    fourOfAKindScore() {
        let score = 0;
        for (let i = 0; i < this.eyeCount.length; i++) {
            if (this.eyeCount[i] >= 4) score = (i + 1) * 4;
        }
        return score;
    }

    smallStraight() {
        let count = 0;
        for (let i = 0; i < this.eyeCount.length - 1; i++) {
            if (this.eyeCount[i] == 1) count++;
        }
        if (count == 5) return 15;
        return 0;
    }

    largeStraight() {
        let count = 0;
        for (let i = 1; i < this.eyeCount.length; i++) {
            if (this.eyeCount[i] == 1) count++;
        }
        if (count == 5) return 20;
        return 0;
    }

    fullHouse() {
        let threeOfAKindScore = this.threeOfAKindScore();
        let onePairScore = 0;

        for (let i = 0; i < this.eyeCount.length; i++) {
            if ((i + 1) * 3 !== threeOfAKindScore && this.eyeCount[i] >= 2) {
                onePairScore = (i + 1) * 2;
            }
        }

        if (threeOfAKindScore !== 0 && onePairScore !== 0) {
            return threeOfAKindScore + onePairScore;
        }
        return 0;
    }

    chance() {
        return this.raffleCup.diceSum();
    }

    yatzy() {
        for (let i = 0; i < this.eyeCount.length; i++) {
            if (this.eyeCount[i] == 5) return 50;
        }
        return 0;
    }
}
