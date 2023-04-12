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
    } while (typeof(cpuList[randomIndex]["type"]) == null)
    
    
    return {
        name: cpuList[randomIndex]["name"].split('@')[0],
        type: cpuList[randomIndex]["type"]
    }
}

import { delay } from "./game";

export async function btnClick(typ) {
    // 0 -> Desktop
    // 1 -> Laptop
    // 2 -> Mobile/Embedded
    // remove bootstrap class

    let btnDesktop =  document.getElementById("btnDesktop");
    let btnLaptop =  document.getElementById("btnLaptop");
    let btnMobile =  document.getElementById("btnMobile");

    let btns = [btnDesktop, btnLaptop, btnLaptop];

    btns.forEach( (el) => {
        el.className = el.className.replace("bg-info", "");
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
    }
    // make correct button green and wrong button red!!!! bg-success | bg-danger

    switch (currentCpu.type) {
        case "Desktop":
            btnDesktop.style.backgroundColor = "lightgreen";
            break;
        case "Laptop":
            btnLaptop.style.backgroundColor = "lightgreen";
            break;
        case "Mobile/Embedded":
            btnMobile.style.backgroundColor = "lightgreen";
            break;
    }

    await delay(2000);

    btns.forEach( (el) => {
        el.className = el.className + " bg-info";
        el.style.backgroundColor = "";
    })

    nextRound();
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

main();