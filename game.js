import { CountUp } from "./node_modules/countup.js/dist/countUp.min.js";

var cpuList;
var currentCpu;
var nextCpu;

export async function main() {
    await fetch('./data.json')
        .then((response) => response.json())
        .then((json) => cpuList = json);

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
    currentCpu.score < nextCpu.score ? showResult(true) : showResult(false);
}

export function btnHigherClick() {
    currentCpu.score > nextCpu.score ? showResult(true) : showResult(false);
}

function showResult(isCorrect) {
    document.getElementById("col2").style.backgroundColor = isCorrect ? "lightgreen" : "#FF4444";

    document.getElementById("nextCpuScore").innerHTML = nextCpu.score.toString();
    countUp();
}

function updateLayout() {
    currentCpu = getRandomCpu();
    document.getElementById("currentCpuTitle").innerText = currentCpu.name;
    // add "." to large numbers
    document.getElementById("currentCpuScore").innerText = new Intl.NumberFormat().format(currentCpu.score)
    nextCpu = getRandomCpu();
    document.getElementById("nextCpuTitle").innerText = nextCpu.name;
}

async function countUp() {
    document.getElementById("btnHigher").setAttribute("disabled", "");
    document.getElementById("btnLower").setAttribute("disabled", "");

    const options = {
        startVal: 7000,
        separator: '.',
        decimal: ',',
    };
    let counter = new CountUp('nextCpuScore', nextCpu.score, options);
    if (!counter.error) {
        await counter.start();
    } else {
        counter.error(demo.error);
    }
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}