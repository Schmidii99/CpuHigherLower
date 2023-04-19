var cpuList;
var currentCpu;

var score;
var highScore;

export async function main() {
    // init cpu list
    await (fetch('./data.json')
        .then((response) => response.json())
        .then((json) => cpuList = json));

    highScore = localStorage.getItem("highScore_socket") ?? 0
    score = 0;
    updateScores();

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

    // Score
    if (btns[typ].style.backgroundColor == "lightgreen") {
        score++;
    } else {
        score = 0;
    }
    // Highscore
    if (score > highScore) {
        highScore = score;
        localStorage.setItem("highScore_socket", highScore);
    }
    updateScores();

    await delay(1000);

    btns.forEach( (el) => {
        el.style.backgroundColor = "#3CC3FA";
        el.removeAttribute("disabled");
    })

    nextRound();
}

function updateScores() {
    document.getElementById("score").innerText = score;
    document.getElementById("highScore").innerText = highScore;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

main();