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
        return this.#currentCPU;
    }

    get nextCpu() {
        return this.#nextCPU;
    }

    getRandomCpu() {
        let randomIndex: number;
        do {
            randomIndex = this.#getRandomInt(0, this.#cpuList.length);
        } while (this.#cpuList[randomIndex]["value"] == null || this.#cpuList[randomIndex]["type"] == null)
        this.#cpuList[randomIndex]["name"] = this.#cpuList[randomIndex]["name"].split('@')[0];
        return this.#cpuList[randomIndex];
    }

    #getRandomInt(min, max): number {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
    }

    nextRound(): void {
        this.#currentCPU = this.#nextCPU
        this.#nextCPU = this.getRandomCpu();
    }
}