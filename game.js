var cpuList;
var currentCpu;
var nextCpu;

async function main() {
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

function btnLowerClick() {
    if (currentCpu.score < nextCpu.score) {
        showResult(true);
        return;
    }
    showResult(false);
}

function btnHigherClick() {

}

function showResult(isCorrect) {
    if (isCorrect) {
        document.getElementById("col2").style.backgroundColor = "lightgreen";
    }
    else {
        document.getElementById("col2").style.backgroundColor = "#FF4444";
    }
}

function updateLayout() {
    currentCpu = getRandomCpu();
    document.getElementById("currentCpuTitle").innerText = currentCpu.name;
    // add "." to large numbers
    document.getElementById("currentCpuScore").innerText = currentCpu.score.toString().length > 3 ? currentCpu.score.toString().slice(0, currentCpu.score.toString().length - 3) + "." + currentCpu.score.toString().slice(currentCpu.score.toString().length - 3) : currentCpu.score;
    nextCpu = getRandomCpu();
    document.getElementById("nextCpuTitle").innerText = nextCpu.name;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

main();