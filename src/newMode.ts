import { CpuRepository } from "./cpuRepository.js";
import { Stats } from "./statistics.js";

class UI {
    private model: ViewModel;

    private buttons: HTMLElement[];

    constructor() {
        this.model = new ViewModel();

        let button1 = document.getElementById("btnDate1");
        let button2 = document.getElementById("btnDate2");
        let button3 = document.getElementById("btnDate3");
        let button4 = document.getElementById("btnDate4");
        this.buttons = [button1, button2, button3, button4];
    }

    async init() {
        await this.model.init();

        this.model.Dates.forEach((value, index) => 
            (this.buttons[index].innerText = value)
        );
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

    incrementScore() {
        this.stats.incrementScore();
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

        let newDates: string[] = new Array(4);

        if (this.hardmode) {
            for (let index = 0; index < 4; index++) {
                newDates[index] = this.getRandomDate(new Date(year - 1), new Date(year + 1));
            }
            newDates[this.getRandomInt(0, 4)] = cpuDate;
            return newDates;
        }

        // normal Mode
        for (let index = 0; index < 4; index++) {
            newDates[index] = this.getRandomDate(new Date("2000-01-01"), new Date(Date.now()));
        }
        newDates[this.getRandomInt(0, 4)] = cpuDate;
        return newDates;
    }

    private getRandomInt(min, max): number {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
    }
    
    private getRandomDate(startDate: Date, endDate: Date) {
        const minValue = startDate.getTime();
        const maxValue = endDate.getTime();
        const timestamp = Math.floor(Math.random() * (maxValue - minValue + 1) + minValue);
        return new Date(timestamp).toISOString().split("T")[0];
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