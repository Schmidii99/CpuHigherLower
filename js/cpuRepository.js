export class CpuRepository {
    #cpuList;

    #currentCPU;
    #nextCPU;

    async init() {
        const fetchResult = await fetch("./js/data.json");
        this.#cpuList = await fetchResult.json();

        this.#currentCPU = this.getRandomCpu();
        this.#nextCPU = this.getRandomCpu();
    }

    get currentCpu() {
        return this.#currentCpu;
    }

    get nextCpu() {
        return this.#nextCpu;
    }

    getRandomCpu() {
        let randomIndex = this.#getRandomInt(0, this.#cpuList.length);
        this.#cpuList[randomIndex]["name"] = this.#cpuList[randomIndex]["name"].split('@')[0];
        return this.#cpuList[randomIndex];
    }

    #getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
    }
}