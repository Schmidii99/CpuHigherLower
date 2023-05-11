// @ts-ignore
import { CountUp } from "https://cdnjs.cloudflare.com/ajax/libs/countup.js/2.6.0/countUp.min.js";
import { Stats } from "./statistics.js";
import { CpuRepository } from "./cpuRepository.js"

class UI {
    private model: ViewModel;

    private btnLower: HTMLElement;
    private btnHigher: HTMLElement;
    private btnScore: HTMLElement;
    private btnHighScore: HTMLElement;

    private curCpuTitle: HTMLElement;
    private curCpuScore: HTMLElement;
    private nextCpuTitle: HTMLElement;
    private nextCpuScore: HTMLElement;

    private background: HTMLElement;
    
    constructor() {
        this.model = new ViewModel();
    }

    async init() {
        await this.model.init();

        this.btnLower = document.getElementById("btnLower");
        this.btnHigher = document.getElementById("btnHigher");
        this.btnScore = document.getElementById("score");
        this.btnHighScore = document.getElementById("highScore");

        this.curCpuTitle = document.getElementById("currentCpuTitle");
        this.curCpuScore = document.getElementById("currentCpuScore");
        this.nextCpuTitle = document.getElementById("nextCpuTitle");
        this.nextCpuScore = document.getElementById("nextCpuScore");

        this.background = document.getElementById("col2");

        this.btnLower.onclick = () => this.handleButtonLowerClick();
        this.btnHigher.onclick = () => this.handleButtonHigherClick();

        this.updateLayout();
    }

    updateLayout() {
        this.btnHighScore.innerText = this.model.highScore.toString();

        this.curCpuTitle.innerText = this.model.currentCpu.name;
        // add "." to large numbers
        this.curCpuScore.innerText = new Intl.NumberFormat().format(this.model.currentCpu.cpuScore);
        this.nextCpuTitle.innerText = this.model.nextCpu.name;
        
        this.nextCpuScore.innerText = "?";
    
        this.background.style.backgroundColor = "";
    }

    handleButtonLowerClick() {
        let result = this.model.buttonClicked("lower");
        this.showResult(result);
    }

    handleButtonHigherClick() {
        let result = this.model.buttonClicked("higher");
        this.showResult(result);
    }

    showResult(isCorrect) {
        this.btnHigher.setAttribute("disabled", "");
        this.btnLower.setAttribute("disabled", "");
    
        this.background.style.backgroundColor = isCorrect ? "lightgreen" : "FF4444";
        
        isCorrect ? this.model.incrementScore() : this.model.resetScore();
        
        this.btnHighScore.innerText = this.model.highScore.toString();
        this.btnScore.innerText = this.model.score.toString();
    
        this.countUp();
    }

    delay(time) {
        return new Promise(resolve => setTimeout(resolve, time));
    }
    
    async countUp() {
        const options = {
            startVal: this.model.nextCpu.cpuScore / 2,
            separator: '.',
            decimal: ',',
            duration: 2
        };
        let counter = new CountUp('nextCpuScore', this.model.nextCpu.cpuScore, options);
        if (!counter.error) {
            counter.start();
        } else {
            console.log(counter.error);
        }
    
        await this.delay(2500)
        this.model.nextRound();
    
        this.btnHigher.removeAttribute("disabled");
        this.btnLower.removeAttribute("disabled");

        this.updateLayout();
    }
}

class ViewModel {
    repo: CpuRepository;
    localStats: Stats;
    
    constructor() {
        this.repo = new CpuRepository();
        this.localStats = new Stats("highScore_cpu");
    }

    async init() {
        await this.repo.init();
    }

    nextRound(): void {
        this.repo.nextRound();
    }

    // "lower" and "higher"
    buttonClicked(value: string): boolean {
        if (value == "higher") {
            return this.repo.nextCpu.cpuScore > this.repo.currentCpu.cpuScore;
        }
        if (value == "lower") {
            return this.repo.nextCpu.cpuScore < this.repo.currentCpu.cpuScore;
        }
        console.log("nothing found for '" + value + "'");
        return false;
    }

    incrementScore() {
        this.localStats.incrementScore();
    }

    resetScore() {
        this.localStats.resetScore();
    }

    get currentCpu() {
        return this.repo.currentCpu;
    }

    get nextCpu() {
        return this.repo.nextCpu;
    }

    get highScore() {
        return this.localStats.highScore;
    }

    get score() {
        return this.localStats.score;
    }
}

export async function main() {
    const ui = new UI();
    await ui.init();
}