import { RaffleCup } from "./RaffleCup.js";
import { Score } from "./Score.js";
import { YatzyCalculator } from "./YatzyCalculator.js";

export class Game {
    constructor() {
        this.scoreCard = Array.from({ length: 17 }, () => new Score());
        this.total = 0;
        this.raffleCup = new RaffleCup();
        this.yatzyCalculator = new YatzyCalculator(this.raffleCup);
        this.nrOfThrowsLeft = 3;
        this.gameOver = false;
    }

    throwDice() {
        if (this.nrOfThrowsLeft > 0) {
            this.yatzyCalculator.calculateResult();
            this.nrOfThrowsLeft--;
        }
        return this.raffleCup.getEyes();
    }

    toggleLock(index) {
        this.raffleCup.toggleLock(index);
    }

    resetDice() {
        this.raffleCup.reset();
        this.nrOfThrowsLeft = 3;
    }

    calculateScores() {
        const results = Array(18).fill(0);
        // Upper Section
        let upperSectionSum = 0;
        for (let index = 0; index <= 5; index++) {
            let currentScore = this.scoreCard[index];
            if (!currentScore.saved) {
                currentScore.setScore(this.yatzyCalculator.upperSectionScore(index + 1));
            }

            results[index] = currentScore.value;

            if (currentScore.saved) {
                upperSectionSum += currentScore.value;
            }
        }

        // Sum && Bonus
        this.scoreCard[6].setScore(upperSectionSum);
        this.scoreCard[6].saveScore();
        this.scoreCard[7].setScore(upperSectionSum >= 63 ? 50 : 0);
        this.scoreCard[7].saveScore();
        results[6] = this.scoreCard[6].value;
        results[7] = this.scoreCard[7].value;

        // Lower Section
        const lowerSectionScores = [
            this.yatzyCalculator.onePairScore,
            this.yatzyCalculator.twoPairScore,
            this.yatzyCalculator.threeOfAKindScore,
            this.yatzyCalculator.fourOfAKindScore,
            this.yatzyCalculator.fullHouse,
            this.yatzyCalculator.smallStraight,
            this.yatzyCalculator.largeStraight,
            this.yatzyCalculator.chance,
            this.yatzyCalculator.yatzy,
        ];

        for (let i = 0; i < lowerSectionScores.length; i++) {
            if (!this.scoreCard[8 + i].saved) {
                this.scoreCard[8 + i].setScore(lowerSectionScores[i].call(this.yatzyCalculator));
            }
            results[8 + i] = this.scoreCard[8 + i].value;
        }
        return results;
    }

    saveScore(index) {
        let score = this.scoreCard[index];
        score.saveScore();
        this.total += score.value;

        if (this.isGameOver()) {
            this.gameOver = true;
            console.log("Game Over");
        }
    }

    isGameOver() {
        return this.scoreCard.every((score) => score.saved);
    }

    getTotal() {
        return this.total + this.scoreCard[7].value;
    }

    getUppserSectionSum() {
        return this.scoreCard[6].value;
    }

    getBonus() {
        return this.scoreCard[7].value;
    }

    setGameOver() {
        this.scoreCard.forEach((score) => {
            score.saveScore();
        });
    }
}
