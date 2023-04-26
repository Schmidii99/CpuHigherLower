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
        let array;
        return array = ["eins", "zwei", "drei", "vier"];
    }
}

export async function main() {
    const ui = new UI();
    await ui.init();
}