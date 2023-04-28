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
var _UI_instances, _UI_model, _UI_btnLower, _UI_btnHigher, _UI_btnScore, _UI_btnHighScore, _UI_curCpuTitle, _UI_curCpuScore, _UI_nextCpuTitle, _UI_nextCpuScore, _UI_background, _UI_showResult, _UI_delay, _UI_countUp, _ViewModel_repo, _ViewModel_localStats;
// @ts-ignore
import { CountUp } from "https://cdnjs.cloudflare.com/ajax/libs/countup.js/2.6.0/countUp.min.js";
import { Stats } from "./statistics.js";
import { CpuRepository } from "./cpuRepository.js";
class UI {
    constructor() {
        _UI_instances.add(this);
        _UI_model.set(this, void 0);
        _UI_btnLower.set(this, void 0);
        _UI_btnHigher.set(this, void 0);
        _UI_btnScore.set(this, void 0);
        _UI_btnHighScore.set(this, void 0);
        _UI_curCpuTitle.set(this, void 0);
        _UI_curCpuScore.set(this, void 0);
        _UI_nextCpuTitle.set(this, void 0);
        _UI_nextCpuScore.set(this, void 0);
        _UI_background.set(this, void 0);
        __classPrivateFieldSet(this, _UI_model, new ViewModel(), "f");
    }
    async init() {
        await __classPrivateFieldGet(this, _UI_model, "f").init();
        __classPrivateFieldSet(this, _UI_btnLower, document.getElementById("btnLower"), "f");
        __classPrivateFieldSet(this, _UI_btnHigher, document.getElementById("btnHigher"), "f");
        __classPrivateFieldSet(this, _UI_btnScore, document.getElementById("score"), "f");
        __classPrivateFieldSet(this, _UI_btnHighScore, document.getElementById("highScore"), "f");
        __classPrivateFieldSet(this, _UI_curCpuTitle, document.getElementById("currentCpuTitle"), "f");
        __classPrivateFieldSet(this, _UI_curCpuScore, document.getElementById("currentCpuScore"), "f");
        __classPrivateFieldSet(this, _UI_nextCpuTitle, document.getElementById("nextCpuTitle"), "f");
        __classPrivateFieldSet(this, _UI_nextCpuScore, document.getElementById("nextCpuScore"), "f");
        __classPrivateFieldSet(this, _UI_background, document.getElementById("col2"), "f");
        __classPrivateFieldGet(this, _UI_btnLower, "f").onclick = () => this.handleButtonLowerClick();
        __classPrivateFieldGet(this, _UI_btnHigher, "f").onclick = () => this.handleButtonHigherClick();
        this.updateLayout();
    }
    updateLayout() {
        __classPrivateFieldGet(this, _UI_btnHighScore, "f").innerText = __classPrivateFieldGet(this, _UI_model, "f").highScore.toString();
        __classPrivateFieldGet(this, _UI_curCpuTitle, "f").innerText = __classPrivateFieldGet(this, _UI_model, "f").currentCpu.name;
        // add "." to large numbers
        __classPrivateFieldGet(this, _UI_curCpuScore, "f").innerText = new Intl.NumberFormat().format(__classPrivateFieldGet(this, _UI_model, "f").currentCpu.cpuScore);
        __classPrivateFieldGet(this, _UI_nextCpuTitle, "f").innerText = __classPrivateFieldGet(this, _UI_model, "f").nextCpu.name;
        __classPrivateFieldGet(this, _UI_nextCpuScore, "f").innerText = "?";
        __classPrivateFieldGet(this, _UI_background, "f").style.backgroundColor = "";
    }
    handleButtonLowerClick() {
        let result = __classPrivateFieldGet(this, _UI_model, "f").buttonClicked("lower");
        __classPrivateFieldGet(this, _UI_instances, "m", _UI_showResult).call(this, result);
    }
    handleButtonHigherClick() {
        let result = __classPrivateFieldGet(this, _UI_model, "f").buttonClicked("higher");
        __classPrivateFieldGet(this, _UI_instances, "m", _UI_showResult).call(this, result);
    }
}
_UI_model = new WeakMap(), _UI_btnLower = new WeakMap(), _UI_btnHigher = new WeakMap(), _UI_btnScore = new WeakMap(), _UI_btnHighScore = new WeakMap(), _UI_curCpuTitle = new WeakMap(), _UI_curCpuScore = new WeakMap(), _UI_nextCpuTitle = new WeakMap(), _UI_nextCpuScore = new WeakMap(), _UI_background = new WeakMap(), _UI_instances = new WeakSet(), _UI_showResult = function _UI_showResult(isCorrect) {
    __classPrivateFieldGet(this, _UI_btnHigher, "f").setAttribute("disabled", "");
    __classPrivateFieldGet(this, _UI_btnLower, "f").setAttribute("disabled", "");
    __classPrivateFieldGet(this, _UI_background, "f").style.backgroundColor = isCorrect ? "lightgreen" : "#FF4444";
    isCorrect ? __classPrivateFieldGet(this, _UI_model, "f").incrementScore() : __classPrivateFieldGet(this, _UI_model, "f").resetScore();
    __classPrivateFieldGet(this, _UI_btnHighScore, "f").innerText = __classPrivateFieldGet(this, _UI_model, "f").highScore.toString();
    __classPrivateFieldGet(this, _UI_btnScore, "f").innerText = __classPrivateFieldGet(this, _UI_model, "f").score.toString();
    __classPrivateFieldGet(this, _UI_instances, "m", _UI_countUp).call(this);
}, _UI_delay = function _UI_delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}, _UI_countUp = async function _UI_countUp() {
    const options = {
        startVal: __classPrivateFieldGet(this, _UI_model, "f").nextCpu.cpuScore / 2,
        separator: '.',
        decimal: ',',
        duration: 2
    };
    let counter = new CountUp('nextCpuScore', __classPrivateFieldGet(this, _UI_model, "f").nextCpu.cpuScore, options);
    if (!counter.error) {
        counter.start();
    }
    else {
        console.log(counter.error);
    }
    await __classPrivateFieldGet(this, _UI_instances, "m", _UI_delay).call(this, 2500);
    __classPrivateFieldGet(this, _UI_model, "f").nextRound();
    __classPrivateFieldGet(this, _UI_btnHigher, "f").removeAttribute("disabled");
    __classPrivateFieldGet(this, _UI_btnLower, "f").removeAttribute("disabled");
    this.updateLayout();
};
class ViewModel {
    constructor() {
        _ViewModel_repo.set(this, void 0);
        _ViewModel_localStats.set(this, void 0);
        __classPrivateFieldSet(this, _ViewModel_repo, new CpuRepository(), "f");
        __classPrivateFieldSet(this, _ViewModel_localStats, new Stats("highScore_cpu"), "f");
    }
    async init() {
        await __classPrivateFieldGet(this, _ViewModel_repo, "f").init();
    }
    nextRound() {
        __classPrivateFieldGet(this, _ViewModel_repo, "f").nextRound();
    }
    // "lower" and "higher"
    buttonClicked(value) {
        if (value == "higher") {
            return __classPrivateFieldGet(this, _ViewModel_repo, "f").nextCpu.cpuScore > __classPrivateFieldGet(this, _ViewModel_repo, "f").currentCpu.cpuScore;
        }
        if (value == "lower") {
            return __classPrivateFieldGet(this, _ViewModel_repo, "f").nextCpu.cpuScore < __classPrivateFieldGet(this, _ViewModel_repo, "f").currentCpu.cpuScore;
        }
        console.log("nothing found for '" + value + "'");
        return false;
    }
    incrementScore() {
        __classPrivateFieldGet(this, _ViewModel_localStats, "f").incrementScore();
    }
    resetScore() {
        __classPrivateFieldGet(this, _ViewModel_localStats, "f").resetScore();
    }
    get currentCpu() {
        return __classPrivateFieldGet(this, _ViewModel_repo, "f").currentCpu;
    }
    get nextCpu() {
        return __classPrivateFieldGet(this, _ViewModel_repo, "f").nextCpu;
    }
    get highScore() {
        return __classPrivateFieldGet(this, _ViewModel_localStats, "f").highScore;
    }
    get score() {
        return __classPrivateFieldGet(this, _ViewModel_localStats, "f").score;
    }
}
_ViewModel_repo = new WeakMap(), _ViewModel_localStats = new WeakMap();
export async function main() {
    const ui = new UI();
    await ui.init();
}
