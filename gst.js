var cpuList;
var currentCpu;

var score;
var highScore;

export async function main() {
    // init cpu list
    await (fetch('./data.json')
        .then((response) => response.json())
        .then((json) => cpuList = json));

    nextRound();
}

function nextRound() {
    currentCpu = getRandomCpu();

    document.getElementById("cpuName").innerText = currentCpu.name;

    document.getElementById("mainCol").style.backgroundColor = "";
}

function getRandomCpu() {
    let randomIndex;
    do {
        randomIndex = getRandomInt(0, cpuList.length)
    } while (typeof(cpuList[randomIndex]["type"]) == null || cpuList[randomIndex]["type"] == "null" || cpuList[randomIndex]["type"] == null);
    
    
    return {
        name: cpuList[randomIndex]["name"].split('@')[0],
        type: cpuList[randomIndex]["type"]
    }
}

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

export async function btnClick(typ) {
    // 0 -> Desktop
    // 1 -> Laptop
    // 2 -> Mobile/Embedded
    // 3 -> Server

    let btnDesktop =  document.getElementById("btnDesktop");
    let btnLaptop =  document.getElementById("btnLaptop");
    let btnMobile =  document.getElementById("btnMobile");
    let btnServer =  document.getElementById("btnServer");

    let btns = [btnDesktop, btnLaptop, btnMobile, btnServer];

    btns.forEach((el) => {
        el.setAttribute("disabled", "");
    })

    switch (typ) {
        case 0:
            btnDesktop.style.backgroundColor = "#FF4444";
            break;
        case 1:
            btnLaptop.style.backgroundColor = "#FF4444";
            break;
        case 2:
            btnMobile.style.backgroundColor = "#FF4444";
            break;
        case 3:
            btnServer.style.backgroundColor = "#FF4444";
            break;
    }

    if(currentCpu.type.includes("Desktop")) {
        btnDesktop.style.backgroundColor = "lightgreen";
    } 
    if(currentCpu.type.includes("Laptop")) {
        btnLaptop.style.backgroundColor = "lightgreen";
    } 
    if(currentCpu.type.includes("Mobile/Embedded")) {
        btnMobile.style.backgroundColor = "lightgreen";
    }
    if(currentCpu.type.includes("Server")) {
        btnServer.style.backgroundColor = "lightgreen";
    }

    await delay(2000);

    btns.forEach( (el) => {
        el.style.backgroundColor = "#3CC3FA";
        el.removeAttribute("disabled");
    })

    nextRound();
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

main();