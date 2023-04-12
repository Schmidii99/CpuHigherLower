import { CountUp } from "./node_modules/countup.js/dist/countUp.min.js";

var cpuList;
var currentCpu;
var nextCpu;

export async function main() {
    await fetch('./data.json')
        .then((response) => response.json())
        .then((json) => cpuList = json);

    currentCpu = getRandomCpu();
    nextCpu = getRandomCpu();
    updateLayout();
}

function getRandomCpu() {
    let randomIndex = getRandomInt(0, cpuList.length)
    return {
        name: cpuList[randomIndex]["name"].split('@')[0],
        score: cpuList[randomIndex]["cpuScore"]
    }
}

export function btnLowerClick() {
    nextCpu.score < currentCpu.score ? showResult(true) : showResult(false);
}

export function btnHigherClick() {
    nextCpu.score > currentCpu.score ? showResult(true) : showResult(false);
}

function showResult(isCorrect) {
    document.getElementById("btnHigher").setAttribute("disabled", "");
    document.getElementById("btnLower").setAttribute("disabled", "");

    document.getElementById("col2").style.backgroundColor = isCorrect ? "lightgreen" : "#FF4444";

    countUp();
}

function updateLayout() {
    document.getElementById("currentCpuTitle").innerText = currentCpu.name;
    // add "." to large numbers
    document.getElementById("currentCpuScore").innerText = new Intl.NumberFormat().format(currentCpu.score)
    document.getElementById("nextCpuTitle").innerText = nextCpu.name;
    
    document.getElementById("nextCpuScore").innerText = "?";

    document.getElementById("col2").style.backgroundColor = "";
}

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

async function countUp() {
    const options = {
        startVal: nextCpu.score / 2,
        separator: '.',
        decimal: ',',
        duration: 2
    };
    let counter = new CountUp('nextCpuScore', nextCpu.score, options);
    if (!counter.error) {
        counter.start();
    } else {
        counter.error(demo.error);
    }

    await delay(3000)
    nextRound();

    document.getElementById("btnHigher").removeAttribute("disabled");
    document.getElementById("btnLower").removeAttribute("disabled");
}

function nextRound() {
    currentCpu = nextCpu;
    nextCpu = getRandomCpu();

    updateLayout();
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}