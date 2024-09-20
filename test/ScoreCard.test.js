import { ScoreCard } from "../src/models/ScoreCard.js";
import { assert } from "chai";

describe("ScoreCard logic", () => {
    it("calculates the score of the uppersection", () => {
        let scoreCard = new ScoreCard();
        scoreCard.uppersection = [1, 4, 9, 8, 15, 24];
        assert.deepEqual(scoreCard.calculateUpperSectionSum(), 61);
    });

    it("calculates the bonus score", () => {
        let scoreCard = new ScoreCard();
        scoreCard.uppersection = [1, 4, 9, 8, 15, 24];
        scoreCard.calculateUpperSectionSum();
        assert.equal(scoreCard.calculateBonus(), 0);

        scoreCard.uppersection = [1, 6, 9, 12, 15, 24];
        scoreCard.calculateUpperSectionSum();
        assert.equal(scoreCard.calculateBonus(), 50);
    });

    it("calculates the total score", () => {
        let scoreCard = new ScoreCard();
        scoreCard.uppersection = [1, 4, 9, 8, 15, 24];
        scoreCard.lowerSection = [10, 12, 15, 4, 0, 20, 11, 23, 0];
        scoreCard.calculateUpperSectionSum();
        scoreCard.calculateBonus();
        assert.equal(scoreCard.calculateTotal(), 156);

        scoreCard.uppersection = [1, 6, 9, 12, 15, 24];
        scoreCard.lowerSection = [10, 12, 15, 4, 0, 20, 11, 23, 0];
        scoreCard.calculateUpperSectionSum();
        scoreCard.calculateBonus();
        assert.equal(scoreCard.calculateTotal(), 212);
    });
});
