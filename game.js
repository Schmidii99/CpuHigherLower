async function main() {
    var cpuList;
    await fetch('./data.json')
        .then((response) => response.json())
        .then((json) => cpuList = json);

    
}

function getRandomCpu() {

}


main();