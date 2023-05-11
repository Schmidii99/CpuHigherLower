import { CpuRepository } from "./cpuRepository.js";
import { Stats } from "./statistics.js";

type CPU = {
    name: string;
    type: string;
}

class UI {
    private model: ViewModel;

    private btnDesktop: HTMLElement;
    private btnLaptop: HTMLElement;
    private btnServer: HTMLElement;
    private btnMobile: HTMLElement;

    private btns: HTMLElement[];

    private cpuName: HTMLElement;
    private score: HTMLElement;
    private highScore: HTMLElement;
    private mainCol: HTMLElement;

    constructor() {
        this.model = new ViewModel();

        this.btnDesktop =  document.getElementById("btnDesktop");
        this.btnDesktop.onclick = () => this.btnClick(0);
        this.btnLaptop =  document.getElementById("btnLaptop");
        this.btnLaptop.onclick = () => this.btnClick(1);
        this.btnMobile =  document.getElementById("btnMobile");
        this.btnMobile.onclick = () => this.btnClick(2);
        this.btnServer =  document.getElementById("btnServer");
        this.btnServer.onclick = () => this.btnClick(3);

        this.btns = [this.btnDesktop, this.btnLaptop, this.btnMobile, this.btnServer];

        this.cpuName = document.getElementById("cpuName");
        this.score = document.getElementById("score");
        this.highScore = document.getElementById("highScore");
        this.mainCol = document.getElementById("mainCol");
    }

    async init() {
        await this.model.init();

        this.nextRound();
    }

    updateScores() {
        this.score.innerText = this.model.score.toString();
        this.highScore.innerText = this.model.highScore.toString();
    }

    async delay(time) {
        return new Promise(resolve => setTimeout(resolve, time));
    }

    nextRound() {
        this.model.nextRound();

        this.cpuName.innerText = this.model.currentCpu.name;

        this.mainCol.style.backgroundColor = "";
    }

    async btnClick(typ) {
        // 0 -> Desktop
        // 1 -> Laptop
        // 2 -> Mobile/Embedded
        // 3 -> Server
    
        this.btns.forEach((el) => {
            el.setAttribute("disabled", "");
        })
    
        switch (typ) {
            case 0:
                this.btnDesktop.style.backgroundColor = "FF4444";
                break;
            case 1:
                this.btnLaptop.style.backgroundColor = "FF4444";
                break;
            case 2:
                this.btnMobile.style.backgroundColor = "FF4444";
                break;
            case 3:
                this.btnServer.style.backgroundColor = "FF4444";
                break;
        }
    
        const currentType = this.model.currentCpu.type;
        if(currentType.includes("Desktop")) {
            this.btnDesktop.style.backgroundColor = "lightgreen";
        } 
        if(currentType.includes("Laptop")) {
            this.btnLaptop.style.backgroundColor = "lightgreen";
        } 
        if(currentType.includes("Mobile/Embedded")) {
            this.btnMobile.style.backgroundColor = "lightgreen";
        }
        if(currentType.includes("Server")) {
            this.btnServer.style.backgroundColor = "lightgreen";
        }
    
        // Score
        if (this.btns[typ].style.backgroundColor == "lightgreen") {
            this.model.incrementScore();
        } else {
            this.model.resetScore();
        }
        this.updateScores();
    
        await this.delay(1000);
    
        this.btns.forEach( (el) => {
            el.style.backgroundColor = "3CC3FA";
            el.removeAttribute("disabled");
        })
    
        this.nextRound();
    }
}

class ViewModel {
    private repo: CpuRepository;
    private stats: Stats;

    constructor() {
        this.stats = new Stats("highScore_socket");
        this.repo = new CpuRepository();
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

    get currentCpu(): CPU {
        return this.repo.currentCpu;
    }

    get score(): number {
        return this.stats.score;
    }

    get highScore(): number {
        return this.stats.highScore;
    }
}

export async function main() {
    const ui = new UI();
    await ui.init();
}