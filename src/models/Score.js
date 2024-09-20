export class Score {
    constructor() {
        this.value = 0;
        this.saved = false;
    }

    setScore(score) {
        this.value = score;
    }

    saveScore() {
        this.saved = true;
    }
}
