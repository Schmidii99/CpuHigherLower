var cpuList;
async function main() {
    await fetch('./data.json')
        .then((response) => response.json())
        .then((json) => cpuList = json);

    console.log(getRandomCpu().name)
}

function getRandomCpu() {
    let randomIndex = getRandomInt(0, cpuList.length)
    return {
        name: cpuList[randomIndex]["name"].split('@')[0],
        score: cpuList[randomIndex]["cpuScore"]
    }
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

main();