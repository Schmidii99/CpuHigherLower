import { CpuRepository } from "./cpuRepository.js";
import { Stats } from "./statistics.js";

class UI {
    private model: ViewModel;

    private buttons: HTMLElement[];
    private cpuName: HTMLElement;

    private score: HTMLElement;
    private highScore: HTMLElement;

    constructor() {
        this.model = new ViewModel();

        let button1 = document.getElementById("btnDate1");
        let button2 = document.getElementById("btnDate2");
        let button3 = document.getElementById("btnDate3");
        let button4 = document.getElementById("btnDate4");
        this.buttons = [button1, button2, button3, button4];

        this.score = document.getElementById("score");
        this.highScore = document.getElementById("highScore");

        document.getElementById("modeSwitch").addEventListener("change", (e:Event) => {this.switchMode(); this.nextRound()});
    }

    async init() {
        await this.model.init();

        this.cpuName = document.getElementById("cpuName");
        this.nextRound();
        this.updateScores();

        this.buttons.forEach(
            (btn) => {
                btn.addEventListener("click", (e:Event) => this.buttonClick(btn));
            }
        )
    }

    switchMode() {
        this.model.switchMode();
    }

    async buttonClick(btn: HTMLElement) {
        btn.setAttribute("disabled", "");
        let result = this.model.processClick(btn.innerText);
        btn.style.backgroundColor = result ? "lightgreen" : "#FF4444";

        this.updateScores();

        await this.delay(1500);

        if (result) {
            this.nextRound();
        }
    }
    private async delay(time) {
        return new Promise(resolve => setTimeout(resolve, time));
    }

    nextRound() {
        this.buttons.forEach(
            (btn) => {
                btn.removeAttribute("disabled");
                btn.style.backgroundColor = "#5bc0de";
            }
        )
        this.model.nextRound();

        this.cpuName.innerText = this.model.currentCpu.name;

        this.model.Dates.forEach((value, index) => 
            (this.buttons[index].innerText = value)
        );
    }

    private updateScores() {
        this.score.innerText = this.model.score.toString();
        this.highScore.innerText = this.model.highScore.toString();
    }
}

class ViewModel {
    private repo: CpuRepository;
    private stats: Stats;

    private hardmode: boolean;

    constructor() {
        this.stats = new Stats("highScore_date");
        this.repo = new CpuRepository();

        this.hardmode = false;
    }

    async init() {
        await this.repo.init();
    }

    nextRound() {
        this.repo.reset();
    }

    incrementScore(num: number = 1) {
        this.stats.incrementScore(num);
    }

    reduceScore() {
        this.stats.updateScore(-1);
    }

    resetScore() {
        this.stats.resetScore();
    }

    switchMode() {
        this.hardmode = !this.hardmode;
    }

    getDates() {
        let cpuDate = this.repo.currentCpu.date;
        // if date is undefined the go for recursion
        if(cpuDate === undefined) {
            this.repo.reset();
            return this.getDates();
        }

        const dateArray = cpuDate.split("-");
        const year = Number(dateArray[0]);
        let currentCpuQuartal = this.getCurrentQuartal(dateArray);

        let newDates: string[] = new Array(4);

        if (this.hardmode) {
            for (let index = 0; index < 4; index++) {
                newDates[index] = this.getRandomDate(new Date((year - 1) + "-" + "01-01"), new Date((year + 1) + "-" + "01-01"));
            }
            // check if the cpus quartal was randomly choosen already
            if (newDates.includes(currentCpuQuartal)) {
                return newDates;
            }

            newDates[this.getRandomInt(0, 4)] = currentCpuQuartal;
            return newDates;
        }

        // normal Mode
        for (let index = 0; index < 4; index++) {
            newDates[index] = this.getRandomDate(new Date("2000-01-01"), new Date(Date.now()));
        }

        // check if the cpus quartal was randomly choosen already
        if (newDates.includes(currentCpuQuartal)) {
            return newDates;
        }

        newDates[this.getRandomInt(0, 4)] = currentCpuQuartal;
        return newDates;
    }

    private getRandomInt(min, max): number {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
    }

    private getCurrentQuartal(dateArray) {
        let quartal = Math.ceil(Number(dateArray[1] / 4));
        
        return "Q" + quartal + " " + dateArray[0];
    }
    
    private getRandomDate(startDate: Date, endDate: Date) {
        let newYear = this.getRandomInt(startDate.getFullYear(), endDate.getFullYear() + 1);
        let quartal = this.getRandomInt(1, 5);
        return "Q" + quartal + " " + newYear;
    }

    processClick(text: string): boolean {
        let result = text == this.getCurrentQuartal(this.currentCpu.date.split("-"));
        if (result) {
            this.incrementScore(2);
        } else {
            this.reduceScore();
        }
        return result;
    }

    get currentCpu() {
        return this.repo.currentCpu;
    }

    get score(): number {
        return this.stats.score;
    }

    get highScore(): number {
        return this.stats.highScore;
    }

    get Dates(): string[] {
        return this.getDates();
    }
}

export async function main() {
    const ui = new UI();
    await ui.init();
}