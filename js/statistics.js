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
var _Stats_score, _Stats_highScore, _Stats_highScoreStorageKey;
export class Stats {
    constructor(highScoreStorageKey) {
        var _a;
        _Stats_score.set(this, void 0);
        _Stats_highScore.set(this, void 0);
        _Stats_highScoreStorageKey.set(this, void 0);
        // used as key for localStorage
        __classPrivateFieldSet(this, _Stats_highScoreStorageKey, highScoreStorageKey, "f");
        __classPrivateFieldSet(this, _Stats_score, 0, "f");
        __classPrivateFieldSet(this, _Stats_highScore, (_a = Number(localStorage.getItem(__classPrivateFieldGet(this, _Stats_highScoreStorageKey, "f")))) !== null && _a !== void 0 ? _a : 0, "f");
    }
    incrementScore(value = 1) {
        __classPrivateFieldSet(this, _Stats_score, __classPrivateFieldGet(this, _Stats_score, "f") + value, "f");
        this.checkHighScore;
    }
    resetScore() {
        __classPrivateFieldSet(this, _Stats_score, 0, "f");
    }
    updateScore(value) {
        __classPrivateFieldSet(this, _Stats_score, __classPrivateFieldGet(this, _Stats_score, "f") + value, "f");
        this.checkHighScore;
    }
    checkHighScore() {
        if (__classPrivateFieldGet(this, _Stats_highScore, "f") < __classPrivateFieldGet(this, _Stats_score, "f")) {
            __classPrivateFieldSet(this, _Stats_highScore, __classPrivateFieldGet(this, _Stats_score, "f"), "f");
            localStorage.setItem(__classPrivateFieldGet(this, _Stats_highScoreStorageKey, "f"), __classPrivateFieldGet(this, _Stats_highScore, "f").toString());
        }
    }
    get highScore() {
        return __classPrivateFieldGet(this, _Stats_highScore, "f");
    }
    get score() {
        return __classPrivateFieldGet(this, _Stats_score, "f");
    }
}
_Stats_score = new WeakMap(), _Stats_highScore = new WeakMap(), _Stats_highScoreStorageKey = new WeakMap();
