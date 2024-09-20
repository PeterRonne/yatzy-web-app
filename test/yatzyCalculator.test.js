import { RaffleCup } from "../src/models/RaffleCup.js";
import { YatzyCalculator } from "../src/models/YatzyCalculator.js";
import { assert, Assertion } from "chai";

describe("Yatzy rules", () => {
    let raffleCup = new RaffleCup();
    let yatzyCalculator = new YatzyCalculator(raffleCup);

    beforeEach(() => {
        raffleCup = new RaffleCup();
        yatzyCalculator = new YatzyCalculator(raffleCup);
    });

    it("calculates the upper section score", () => {
        raffleCup.throwDice = () => [{ eyes: 3 }, { eyes: 1 }, { eyes: 3 }, { eyes: 3 }, { eyes: 1 }];
        yatzyCalculator.calculateResult();
        assert.equal(yatzyCalculator.upperSectionScore(1), 2);
        assert.equal(yatzyCalculator.upperSectionScore(2), 0);
        assert.equal(yatzyCalculator.upperSectionScore(3), 9);
    });

    it("calculates the score for the highest pair", () => {
        raffleCup.throwDice = () => [{ eyes: 3 }, { eyes: 6 }, { eyes: 3 }, { eyes: 2 }, { eyes: 1 }];
        yatzyCalculator.calculateResult();
        assert.equal(yatzyCalculator.onePairScore(), 6);

        raffleCup.throwDice = () => [{ eyes: 3 }, { eyes: 6 }, { eyes: 4 }, { eyes: 3 }, { eyes: 6 }];
        yatzyCalculator.calculateResult();
        assert.equal(yatzyCalculator.onePairScore(), 12);

        raffleCup.throwDice = () => [{ eyes: 3 }, { eyes: 6 }, { eyes: 4 }, { eyes: 1 }, { eyes: 5 }];
        yatzyCalculator.calculateResult();
        assert.equal(yatzyCalculator.onePairScore(), 0);
    });

    it("Calculates the highest possible score for two pairs", () => {
        raffleCup.throwDice = () => [{ eyes: 3 }, { eyes: 6 }, { eyes: 3 }, { eyes: 6 }, { eyes: 1 }];
        yatzyCalculator.calculateResult();
        assert.equal(yatzyCalculator.twoPairScore(), 18);

        raffleCup.throwDice = () => [{ eyes: 4 }, { eyes: 6 }, { eyes: 3 }, { eyes: 6 }, { eyes: 1 }];
        yatzyCalculator.calculateResult();
        assert.equal(yatzyCalculator.twoPairScore(), 0);
    });

    it("Calculates the score for three of a kind", () => {
        raffleCup.throwDice = () => [{ eyes: 4 }, { eyes: 4 }, { eyes: 3 }, { eyes: 4 }, { eyes: 1 }];
        yatzyCalculator.calculateResult();
        assert.equal(yatzyCalculator.threeOfAKindScore(), 12);

        raffleCup.throwDice = () => [{ eyes: 6 }, { eyes: 4 }, { eyes: 3 }, { eyes: 4 }, { eyes: 1 }];
        yatzyCalculator.calculateResult();
        assert.equal(yatzyCalculator.threeOfAKindScore(), 0);
    });

    it("calculates the score for four of a kind", () => {
        raffleCup.throwDice = () => [{ eyes: 4 }, { eyes: 4 }, { eyes: 4 }, { eyes: 4 }, { eyes: 1 }];
        yatzyCalculator.calculateResult();
        assert.equal(yatzyCalculator.fourOfAKindScore(), 16);

        raffleCup.throwDice = () => [{ eyes: 4 }, { eyes: 2 }, { eyes: 4 }, { eyes: 4 }, { eyes: 1 }];
        yatzyCalculator.calculateResult();
        assert.equal(yatzyCalculator.fourOfAKindScore(), 0);
    });

    it("Calculates the small straight score", () => {
        raffleCup.throwDice = () => [{ eyes: 1 }, { eyes: 4 }, { eyes: 5 }, { eyes: 3 }, { eyes: 2 }];
        yatzyCalculator.calculateResult();
        assert.equal(yatzyCalculator.smallStraight(), 15);

        raffleCup.throwDice = () => [{ eyes: 3 }, { eyes: 4 }, { eyes: 5 }, { eyes: 3 }, { eyes: 2 }];
        yatzyCalculator.calculateResult();
        assert.equal(yatzyCalculator.smallStraight(), 0);
    });

    it("Calculates the large straight score", () => {
        raffleCup.throwDice = () => [{ eyes: 6 }, { eyes: 4 }, { eyes: 5 }, { eyes: 3 }, { eyes: 2 }];
        yatzyCalculator.calculateResult();
        assert.equal(yatzyCalculator.largeStraight(), 20);

        raffleCup.throwDice = () => [{ eyes: 1 }, { eyes: 4 }, { eyes: 5 }, { eyes: 3 }, { eyes: 2 }];
        yatzyCalculator.calculateResult();
        assert.equal(yatzyCalculator.largeStraight(), 0);
    });

    it("Calculates the full house score", () => {
        raffleCup.throwDice = () => [{ eyes: 6 }, { eyes: 6 }, { eyes: 6 }, { eyes: 5 }, { eyes: 5 }];
        yatzyCalculator.calculateResult();
        assert.equal(yatzyCalculator.fullHouse(), 28);

        raffleCup.throwDice = () => [{ eyes: 6 }, { eyes: 6 }, { eyes: 5 }, { eyes: 5 }, { eyes: 5 }];
        yatzyCalculator.calculateResult();
        assert.equal(yatzyCalculator.fullHouse(), 27);

        raffleCup.throwDice = () => [{ eyes: 4 }, { eyes: 6 }, { eyes: 6 }, { eyes: 5 }, { eyes: 5 }];
        yatzyCalculator.calculateResult();
        assert.equal(yatzyCalculator.fullHouse(), 0);
    });

    it("Calculates the chance score", () => {
        raffleCup.dice = [{ eyes: 1 }, { eyes: 6 }, { eyes: 3 }, { eyes: 4 }, { eyes: 3 }];
        assert.equal(yatzyCalculator.chance(), 17);
    });

    it("Calculates the yatzy score", () => {
        raffleCup.throwDice = () => [{ eyes: 1 }, { eyes: 1 }, { eyes: 1 }, { eyes: 1 }, { eyes: 1 }];
        yatzyCalculator.calculateResult();
        assert.equal(yatzyCalculator.yatzy(), 50);

        raffleCup.throwDice = () => [{ eyes: 5 }, { eyes: 1 }, { eyes: 1 }, { eyes: 1 }, { eyes: 1 }];
        yatzyCalculator.calculateResult();
        assert.equal(yatzyCalculator.yatzy(), 0);
    });
});
