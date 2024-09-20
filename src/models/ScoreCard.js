export class ScoreCard {
    constructor() {
        this.uppersection = [0, 0, 0, 0, 0, 0];
        this.upperSectionSum = 0;
        this.bonus = 0;
        this.lowerSection = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.total = 0;
    }

    calculateUpperSectionSum() {
        let newSum = 0;
        for (const score of this.uppersection) {
            newSum += score;
        }
        this.upperSectionSum = newSum;
        return this.upperSectionSum;
    }

    calculateBonus() {
        this.bonus = this.upperSectionSum >= 63 ? 50 : 0;
        return this.bonus;
    }

    calculateTotal() {
        let lowerSectionSum = 0;
        for (const score of this.lowerSection) {
            lowerSectionSum += score;
        }
        this.total = this.upperSectionSum + this.bonus + lowerSectionSum;
        return this.total;
    }
}
