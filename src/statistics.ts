export class Stats {
    #score;
    #highScore;
    #highScoreStorageKey;

    constructor(highScoreStorageKey) {
        // used as key for localStorage
        
        this.#highScoreStorageKey = highScoreStorageKey;

        this.#score = 0;
        this.#highScore = localStorage.getItem(this.#highScoreStorageKey) ?? 0;
    }

    incrementScore(value = 1) {
        this.#score += value;

        if (this.#highScore < this.#score) {
            this.#highScore = this.#score;
            localStorage.setItem(this.#highScoreStorageKey, this.#highScore);
        }
    }

    resetScore() {
        this.#score = 0;
    }

    get highScore() {
        return this.#highScore;
    }

    get score() {
        return this.#score;
    }
}