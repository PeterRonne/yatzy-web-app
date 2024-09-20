import { Die } from "../src/models/Die.js";
import { assert } from "chai";

describe("dice logic", () => {
    it("should return a number between 1 and 6", () => {
        const die = new Die();
        die.roll();
        console.log(die.eyes);
        assert.isTrue(die.eyes >= 1 && die.eyes <= 6);
    });
});
