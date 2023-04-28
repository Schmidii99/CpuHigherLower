export class Stats {
    #score: number;
    #highScore: number;
    #highScoreStorageKey: string;

    constructor(highScoreStorageKey) {
        // used as key for localStorage
        this.#highScoreStorageKey = highScoreStorageKey;

        this.#score = 0;
        this.#highScore = Number(localStorage.getItem(this.#highScoreStorageKey)) ?? 0;
    }

    incrementScore(value = 1) {
        this.#score += value;

        this.checkHighScore();
    }

    resetScore(): void {
        this.#score = 0;
    }

    updateScore(value) {
        this.#score += value;

        this.checkHighScore();
    }

    private checkHighScore() {
        console.log("Highscore: " + this.#highScore + " | Score: " + this.#score)
        if (this.#highScore < this.#score) {
            this.#highScore = this.#score;
            localStorage.setItem(this.#highScoreStorageKey, this.#highScore.toString());
        }
    }

    get highScore(): number {
        return this.#highScore;
    }

    get score(): number {
        return this.#score;
    }
}