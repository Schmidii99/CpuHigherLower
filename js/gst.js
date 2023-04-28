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
var _UI_instances, _UI_model, _UI_btnDesktop, _UI_btnLaptop, _UI_btnServer, _UI_btnMobile, _UI_btns, _UI_cpuName, _UI_score, _UI_highScore, _UI_mainCol, _UI_updateScores, _UI_delay, _UI_nextRound, _ViewModel_repo, _ViewModel_stats;
import { CpuRepository } from "./cpuRepository.js";
import { Stats } from "./statistics.js";
class UI {
    constructor() {
        _UI_instances.add(this);
        _UI_model.set(this, void 0);
        _UI_btnDesktop.set(this, void 0);
        _UI_btnLaptop.set(this, void 0);
        _UI_btnServer.set(this, void 0);
        _UI_btnMobile.set(this, void 0);
        _UI_btns.set(this, void 0);
        _UI_cpuName.set(this, void 0);
        _UI_score.set(this, void 0);
        _UI_highScore.set(this, void 0);
        _UI_mainCol.set(this, void 0);
        __classPrivateFieldSet(this, _UI_model, new ViewModel(), "f");
        __classPrivateFieldSet(this, _UI_btnDesktop, document.getElementById("btnDesktop"), "f");
        __classPrivateFieldGet(this, _UI_btnDesktop, "f").onclick = () => this.btnClick(0);
        __classPrivateFieldSet(this, _UI_btnLaptop, document.getElementById("btnLaptop"), "f");
        __classPrivateFieldGet(this, _UI_btnLaptop, "f").onclick = () => this.btnClick(1);
        __classPrivateFieldSet(this, _UI_btnMobile, document.getElementById("btnMobile"), "f");
        __classPrivateFieldGet(this, _UI_btnMobile, "f").onclick = () => this.btnClick(2);
        __classPrivateFieldSet(this, _UI_btnServer, document.getElementById("btnServer"), "f");
        __classPrivateFieldGet(this, _UI_btnServer, "f").onclick = () => this.btnClick(3);
        __classPrivateFieldSet(this, _UI_btns, [__classPrivateFieldGet(this, _UI_btnDesktop, "f"), __classPrivateFieldGet(this, _UI_btnLaptop, "f"), __classPrivateFieldGet(this, _UI_btnMobile, "f"), __classPrivateFieldGet(this, _UI_btnServer, "f")], "f");
        __classPrivateFieldSet(this, _UI_cpuName, document.getElementById("cpuName"), "f");
        __classPrivateFieldSet(this, _UI_score, document.getElementById("score"), "f");
        __classPrivateFieldSet(this, _UI_highScore, document.getElementById("highScore"), "f");
        __classPrivateFieldSet(this, _UI_mainCol, document.getElementById("mainCol"), "f");
    }
    async init() {
        await __classPrivateFieldGet(this, _UI_model, "f").init();
        __classPrivateFieldGet(this, _UI_instances, "m", _UI_nextRound).call(this);
    }
    async btnClick(typ) {
        // 0 -> Desktop
        // 1 -> Laptop
        // 2 -> Mobile/Embedded
        // 3 -> Server
        __classPrivateFieldGet(this, _UI_btns, "f").forEach((el) => {
            el.setAttribute("disabled", "");
        });
        switch (typ) {
            case 0:
                __classPrivateFieldGet(this, _UI_btnDesktop, "f").style.backgroundColor = "#FF4444";
                break;
            case 1:
                __classPrivateFieldGet(this, _UI_btnLaptop, "f").style.backgroundColor = "#FF4444";
                break;
            case 2:
                __classPrivateFieldGet(this, _UI_btnMobile, "f").style.backgroundColor = "#FF4444";
                break;
            case 3:
                __classPrivateFieldGet(this, _UI_btnServer, "f").style.backgroundColor = "#FF4444";
                break;
        }
        const currentType = __classPrivateFieldGet(this, _UI_model, "f").currentCpu.type;
        if (currentType.includes("Desktop")) {
            __classPrivateFieldGet(this, _UI_btnDesktop, "f").style.backgroundColor = "lightgreen";
        }
        if (currentType.includes("Laptop")) {
            __classPrivateFieldGet(this, _UI_btnLaptop, "f").style.backgroundColor = "lightgreen";
        }
        if (currentType.includes("Mobile/Embedded")) {
            __classPrivateFieldGet(this, _UI_btnMobile, "f").style.backgroundColor = "lightgreen";
        }
        if (currentType.includes("Server")) {
            __classPrivateFieldGet(this, _UI_btnServer, "f").style.backgroundColor = "lightgreen";
        }
        // Score
        if (__classPrivateFieldGet(this, _UI_btns, "f")[typ].style.backgroundColor == "lightgreen") {
            __classPrivateFieldGet(this, _UI_model, "f").incrementScore();
        }
        else {
            __classPrivateFieldGet(this, _UI_model, "f").resetScore();
        }
        __classPrivateFieldGet(this, _UI_instances, "m", _UI_updateScores).call(this);
        await __classPrivateFieldGet(this, _UI_instances, "m", _UI_delay).call(this, 1000);
        __classPrivateFieldGet(this, _UI_btns, "f").forEach((el) => {
            el.style.backgroundColor = "#3CC3FA";
            el.removeAttribute("disabled");
        });
        __classPrivateFieldGet(this, _UI_instances, "m", _UI_nextRound).call(this);
    }
}
_UI_model = new WeakMap(), _UI_btnDesktop = new WeakMap(), _UI_btnLaptop = new WeakMap(), _UI_btnServer = new WeakMap(), _UI_btnMobile = new WeakMap(), _UI_btns = new WeakMap(), _UI_cpuName = new WeakMap(), _UI_score = new WeakMap(), _UI_highScore = new WeakMap(), _UI_mainCol = new WeakMap(), _UI_instances = new WeakSet(), _UI_updateScores = function _UI_updateScores() {
    __classPrivateFieldGet(this, _UI_score, "f").innerText = __classPrivateFieldGet(this, _UI_model, "f").score.toString();
    __classPrivateFieldGet(this, _UI_highScore, "f").innerText = __classPrivateFieldGet(this, _UI_model, "f").highScore.toString();
}, _UI_delay = async function _UI_delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}, _UI_nextRound = function _UI_nextRound() {
    __classPrivateFieldGet(this, _UI_model, "f").nextRound();
    __classPrivateFieldGet(this, _UI_cpuName, "f").innerText = __classPrivateFieldGet(this, _UI_model, "f").currentCpu.name;
    __classPrivateFieldGet(this, _UI_mainCol, "f").style.backgroundColor = "";
};
class ViewModel {
    constructor() {
        _ViewModel_repo.set(this, void 0);
        _ViewModel_stats.set(this, void 0);
        __classPrivateFieldSet(this, _ViewModel_stats, new Stats("highScore_socket"), "f");
        __classPrivateFieldSet(this, _ViewModel_repo, new CpuRepository(), "f");
    }
    async init() {
        await __classPrivateFieldGet(this, _ViewModel_repo, "f").init();
    }
    nextRound() {
        __classPrivateFieldGet(this, _ViewModel_repo, "f").reset();
    }
    incrementScore() {
        __classPrivateFieldGet(this, _ViewModel_stats, "f").incrementScore();
    }
    resetScore() {
        __classPrivateFieldGet(this, _ViewModel_stats, "f").resetScore();
    }
    get currentCpu() {
        return __classPrivateFieldGet(this, _ViewModel_repo, "f").currentCpu;
    }
    get score() {
        return __classPrivateFieldGet(this, _ViewModel_stats, "f").score;
    }
    get highScore() {
        return __classPrivateFieldGet(this, _ViewModel_stats, "f").highScore;
    }
}
_ViewModel_repo = new WeakMap(), _ViewModel_stats = new WeakMap();
export async function main() {
    const ui = new UI();
    await ui.init();
}
