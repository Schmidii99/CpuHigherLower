import { CountUp } from "https://cdnjs.cloudflare.com/ajax/libs/countup.js/2.6.0/countUp.min.js";

class Ui {
    model;

    scoreEl;
    highscoreEl;
    
    currCpuTitleEl;
    currCpuScoreEl;

    nextCpuTitleEl;
    nextCpuScoreEl;

    nextCpuStyle;

    btnHigher;
    btnLower;

    constructor() {
        this.model = new Model();
    }

    async init() {
        await this.model.init();

        this.scoreEl = document.getElementById("score");
        this.highscoreEl = document.getElementById("highscore");
        this.currCpuTitleEl = document.getElementById("currentCpuTitle");
        this.currCpuScoreEl = document.getElementById("currentCpuScore");
        this.nextCpuTitleEl = document.getElementById("nextCpuTitle");
        this.nextCpuScoreEl = document.getElementById("nextCpuScore");
        this.nextCpuStyle = document.getElementById("nextCpuCol").style;

        this.btnHigher = document.getElementById("btnHigher");
        this.btnLower = document.getElementById("btnLower");
        this.btnHigher.onclick = () => this.handleHigherPress();
        this.btnLower.onclick = () => this.handleLowerPress();

        this.updateUiFromModel();
    }

    handleHigherPress() {
        let result = this.model.postAnswer('higher');
        this.animateTransition(result);
    }

    handleLowerPress() {
        let result = this.model.postAnswer('lower');
        this.animateTransition(result);
    }

    updateUiFromModel() {
        this.scoreEl.innerText = this.model.score;
        this.highscoreEl.innerText = this.model.highscore;
        this.currCpuTitleEl.innerText = this.model.currentCpu.name;
        this.currCpuScoreEl.innerText = new Intl.NumberFormat().format(this.model.currentCpu.score);
        this.nextCpuTitleEl.innerText = this.model.nextCpu.name;
    }

    async animateTransition(wasCorrect) {
        this.updateUiFromModel();
        this.btnHigher.setAttribute("disabled", "");
        this.btnLower.setAttribute("disabled", "");
        this.nextCpuStyle.backgroundColor = wasCorrect ? "lightgreen" : "#FF4444";

        const options = {
            startVal: this.model.nextCpu.score / 2,
            separator: '.',
            decimal: ',',
            duration: 2
        };
        const counter = new CountUp(this.nextCpuScoreEl, this.model.nextCpu.score, options);

        await new Promise(resolve => counter.start(resolve));
        await this.#delay(500);

        this.model.nextRound();
        this.updateUiFromModel();
        
        this.nextCpuStyle.backgroundColor = '';
        this.nextCpuScoreEl.innerText = '?';
        this.btnHigher.removeAttribute("disabled");
        this.btnLower.removeAttribute("disabled");
    }

    #delay(time) {
        return new Promise(resolve => setTimeout(resolve, time));
    }
}

class Model {
    #cpuList;

    #currentCpu;
    #nextCpu;

    #score;
    #highscore;

    async init() {
        const fetchResult = await fetch("./data.json");
        this.#cpuList = await fetchResult.json();

        this.#currentCpu = this.#getRandomCpu();
        this.#nextCpu = this.#getRandomCpu();
        this.#score = 0;
        this.#highscore = localStorage.getItem("highscore_cpu") ?? 0;
    }

    get highscore() {
        return this.#highscore;
    }

    get score() {
        return this.#score;
    }

    get currentCpu() {
        return this.#currentCpu;
    }

    get nextCpu() {
        return this.#nextCpu;
    }

    // Can be 'higher' or 'lower'
    postAnswer(answer) {
        let answerWasCorrect = false;
        if (answer === 'higher') {
            answerWasCorrect = this.nextCpu.score > this.#currentCpu.score;
        } else if (answer === 'lower') {
            answerWasCorrect = this.nextCpu.score < this.#currentCpu.score;
        }

        if (answerWasCorrect) {
            this.#score += 1;
            return true;
        } else {
            this.#updateHighscore(this.score)
            this.#score = 0;
            return false;
        }
    }

    nextRound() {
        this.#currentCpu = this.#nextCpu;
        this.#nextCpu = this.#getRandomCpu();
    }

    #getRandomCpu() {
        const item = this.#cpuList[Math.floor(Math.random() * this.#cpuList.length)];
        return {
            name: item["name"].split('@')[0],
            score: item["cpuScore"]
        };
    }

    #updateHighscore(newScore) {
        if (newScore > this.#highscore) {
            localStorage.setItem("highscore_cpu", newScore);
            this.#highscore = newScore;
        }
    }
}

export async function main() {
    const ui = new Ui();
    ui.init()
}
