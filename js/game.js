// @ts-ignore
import { CountUp } from "https://cdnjs.cloudflare.com/ajax/libs/countup.js/2.6.0/countUp.min.js";
import { Stats } from "./statistics.js";
import { CpuRepository } from "./cpuRepository.js";
var repo;
var localStats;
export async function main() {
    localStats = new Stats("highScore_cpu");
    repo = new CpuRepository();
    await repo.init();
    updateLayout();
}
export function btnLowerClick() {
    repo.nextCpu.cpuScore < repo.currentCpu.cpuScore ? showResult(true) : showResult(false);
}
export function btnHigherClick() {
    repo.nextCpu.cpuScore > repo.currentCpu.cpuScore ? showResult(true) : showResult(false);
}
function showResult(isCorrect) {
    document.getElementById("btnHigher").setAttribute("disabled", "");
    document.getElementById("btnLower").setAttribute("disabled", "");
    document.getElementById("col2").style.backgroundColor = isCorrect ? "lightgreen" : "#FF4444";
    isCorrect ? localStats.incrementScore() : localStats.resetScore();
    document.getElementById("highScore").innerText = localStats.highScore.toString();
    document.getElementById("score").innerText = localStats.score.toString();
    countUp();
}
// updates view based on the cpu objects
function updateLayout() {
    document.getElementById("highScore").innerText = localStats.highScore.toString();
    document.getElementById("currentCpuTitle").innerText = repo.currentCpu.name;
    // add "." to large numbers
    document.getElementById("currentCpuScore").innerText = new Intl.NumberFormat().format(repo.currentCpu.cpuScore);
    document.getElementById("nextCpuTitle").innerText = repo.nextCpu.name;
    document.getElementById("nextCpuScore").innerText = "?";
    document.getElementById("col2").style.backgroundColor = "";
}
function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}
async function countUp() {
    const options = {
        startVal: repo.nextCpu.cpuScore / 2,
        separator: '.',
        decimal: ',',
        duration: 2
    };
    let counter = new CountUp('nextCpuScore', repo.nextCpu.cpuScore, options);
    if (!counter.error) {
        counter.start();
    }
    else {
        console.log(counter.error);
    }
    await delay(2500);
    nextRound();
    document.getElementById("btnHigher").removeAttribute("disabled");
    document.getElementById("btnLower").removeAttribute("disabled");
}
function nextRound() {
    repo.nextRound();
    updateLayout();
}
