export class Stats {
    private _score: number;
    private _highScore: number;
    private highScoreStorageKey: string;

    constructor(highScoreStorageKey) {
        // used as key for localStorage
        this.highScoreStorageKey = highScoreStorageKey;

        this._score = 0;
        this._highScore = Number(localStorage.getItem(this.highScoreStorageKey)) ?? 0;
    }

    incrementScore(value = 1) {
        this._score += value;

        this.checkHighScore;
    }

    resetScore(): void {
        this._score = 0;
    }

    updateScore(value) {
        this._score += value;

        this.checkHighScore;
    }

    private checkHighScore() {
        if (this._highScore < this._score) {
            this._highScore = this._score;
            localStorage.setItem(this.highScoreStorageKey, this._highScore.toString());
        }
    }

    get highScore(): number {
        return this._highScore;
    }

    get score(): number {
        return this._score;
    }
}