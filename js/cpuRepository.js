var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _CpuRepository_instances, _CpuRepository_cpuList, _CpuRepository_currentCPU, _CpuRepository_nextCPU, _CpuRepository_getRandomInt;
export class CpuRepository {
    constructor() {
        _CpuRepository_instances.add(this);
        _CpuRepository_cpuList.set(this, void 0);
        _CpuRepository_currentCPU.set(this, void 0);
        _CpuRepository_nextCPU.set(this, void 0);
    }
    async init() {
        const fetchResult = await fetch("../data.json");
        __classPrivateFieldSet(this, _CpuRepository_cpuList, await fetchResult.json(), "f");
        this.reset();
    }
    get currentCpu() {
        return __classPrivateFieldGet(this, _CpuRepository_currentCPU, "f");
    }
    get nextCpu() {
        return __classPrivateFieldGet(this, _CpuRepository_nextCPU, "f");
    }
    getRandomCpu() {
        let randomIndex;
        do {
            randomIndex = __classPrivateFieldGet(this, _CpuRepository_instances, "m", _CpuRepository_getRandomInt).call(this, 0, __classPrivateFieldGet(this, _CpuRepository_cpuList, "f").length);
        } while (__classPrivateFieldGet(this, _CpuRepository_cpuList, "f")[randomIndex]["value"] == null || __classPrivateFieldGet(this, _CpuRepository_cpuList, "f")[randomIndex]["type"] == null);
        __classPrivateFieldGet(this, _CpuRepository_cpuList, "f")[randomIndex]["name"] = __classPrivateFieldGet(this, _CpuRepository_cpuList, "f")[randomIndex]["name"].split('@')[0];
        return __classPrivateFieldGet(this, _CpuRepository_cpuList, "f")[randomIndex];
    }
    nextRound() {
        __classPrivateFieldSet(this, _CpuRepository_currentCPU, __classPrivateFieldGet(this, _CpuRepository_nextCPU, "f"), "f");
        __classPrivateFieldSet(this, _CpuRepository_nextCPU, this.getRandomCpu(), "f");
    }
    reset() {
        __classPrivateFieldSet(this, _CpuRepository_currentCPU, this.getRandomCpu(), "f");
        __classPrivateFieldSet(this, _CpuRepository_nextCPU, this.getRandomCpu(), "f");
    }
}
_CpuRepository_cpuList = new WeakMap(), _CpuRepository_currentCPU = new WeakMap(), _CpuRepository_nextCPU = new WeakMap(), _CpuRepository_instances = new WeakSet(), _CpuRepository_getRandomInt = function _CpuRepository_getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
};
