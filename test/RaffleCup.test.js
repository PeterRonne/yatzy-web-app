import { RaffleCup } from "../src/models/RaffleCup.js";
import { assert } from "chai";

describe("RaffleCup logic", () => {
    it("should return the sum all the dice", () => {
        const raffleCup = new RaffleCup();
        raffleCup.dice = [{ eyes: 2 }, { eyes: 4 }, { eyes: 3 }, { eyes: 2 }, { eyes: 4 }];
        assert.equal(raffleCup.diceSum(), 15);
    });

    it("Should return the all the eyes of the current dice", () => {
        const raffleCup = new RaffleCup();
        raffleCup.dice = [{ eyes: 2 }, { eyes: 4 }, { eyes: 3 }, { eyes: 2 }, { eyes: 4 }];
        assert.deepEqual(raffleCup.getEyes(), [2, 4, 3, 2, 4]);
    });
});
