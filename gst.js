var cpuList;
var currentCpu;

var score;
var highScore;

async function main() {
    // init cpu list
    await (fetch('./data.json')
        .then((response) => response.json())
        .then((json) => cpuList = json));

    nextRound();
}

function nextRound() {
    currentCpu = getRandomCpu();

    document.getElementById("cpuName").innerText = currentCpu.name;
}

function getRandomCpu() {
    let randomIndex;
    do {
        randomIndex = getRandomInt(0, cpuList.length)
    } while (typeof(cpuList[randomIndex]["type"]) == null)
    
    
    return {
        name: cpuList[randomIndex]["name"].split('@')[0],
        type: cpuList[randomIndex]["type"]
    }
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

main();