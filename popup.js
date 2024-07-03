let targetIds = ["custom", "random-stickers", "chosen-stickers", "openai-credits", "domain", "notebook", "logic-analyzer", "breadboard", "multimeter", "ticket-counter", "yubikey", "soldering-iron", "rpi", "pinecil", "github-keycaps", "wacom", "octocat", "backpack", "keychron", "flipper", "keyboard", "wacom2", "framework-2nd", "prusa", "bambu-lab", "ipad", "framework-13", "quest", "framework-16", "macbook"];
let targetValues = [0, 1, 2, 4, 4, 5, 5, 6, 7, 7, 8, 8, 9, 14, 15, 15, 15, 50, 50, 70, 75, 90, 120, 130, 135, 160, 175, 200, 400, 400];
let imgs = ["images/tickets.png", "images/stickers.png", "images/sticker.png", "images/openai.png", "images/domain.png", "images/notebook.png", "images/logic.png", "images/breadboard.png", "images/multimeter.png", "images/counter.png", "images/yubikey.png", "images/iron.png", "images/rpi.png", "images/pinecil.png", "images/keycaps.png", "images/wacom.png", "images/octocat.png", "images/backpack.png", "images/keychron.png", "images/flipper.png", "images/keyboard.png", "images/wacom2.png", "images/framework.png", "images/prusa.png", "images/bambu.png", "images/ipad.png", "images/framework2.png", "images/vr.png", "images/framework3.png", "images/macbook.png"];
let selectedTarget = 0;
let ticketTarget = 100;
let customTarget = 0;
let ticketsEarned = 0;
let currentDate = Date.now();
let arcadeStartDate = new Date("2024-6-18");
let arcadeEndDate = new Date("2024-8-31");

function load() {
    if (localStorage.getItem("selected-target") === null) localStorage.setItem("selected-target", "0");
    if (localStorage.getItem("ticket-target") === null) localStorage.setItem("ticket-target", "0");
    if (localStorage.getItem("tickets-earned") === null) localStorage.setItem("tickets-earned", "0");
    if (localStorage.getItem("custom-target") === null) localStorage.setItem("custom-target", "0");
    selectedTarget = parseInt(localStorage.getItem("selected-target"));
    ticketTarget = parseInt(localStorage.getItem("ticket-target"));
    ticketsEarned = parseInt(localStorage.getItem("tickets-earned"));
    customTarget = parseInt(localStorage.getItem("custom-target"));
}

function save() {
    localStorage.setItem("selected-target", selectedTarget);
    localStorage.setItem("ticket-target", ticketTarget);
    localStorage.setItem("tickets-earned", ticketsEarned);
    localStorage.setItem("custom-target", customTarget);
}

function display() {
    document.querySelector(".image").src = imgs[selectedTarget];
    document.getElementById("target").value = targetIds[selectedTarget];
    document.getElementById("custom").value = customTarget;
    if (customTarget === 0) document.getElementById("custom").value = "";

    if (selectedTarget === 0) document.getElementById("custom").style.visibility = "visible";
    else document.getElementById("custom").style.visibility = "hidden";

    if (Math.floor(ticketsEarned / ticketTarget * 300) < Math.floor((currentDate - arcadeStartDate) / (arcadeEndDate - arcadeStartDate) * 300)) {
        document.querySelector(".progress-bar-done").style.zIndex = "1";
        document.querySelector(".progress-bar-track").style.zIndex = "0";
    } else {
        document.querySelector(".progress-bar-done").style.zIndex = "0";
        document.querySelector(".progress-bar-track").style.zIndex = "1";
    }
    document.querySelector(".progress-bar-done").style.width = Math.min(Math.floor(ticketsEarned / ticketTarget * 300), 300).toString() + "px";
    document.querySelector(".progress-bar-track").style.width = Math.floor((currentDate - arcadeStartDate) / (arcadeEndDate - arcadeStartDate) * 300).toString() + "px";

    document.querySelector(".tickets-earned").textContent = ticketsEarned;
    document.querySelector(".tickets-needed").textContent = (ticketTarget - ticketsEarned);
    document.querySelector(".tickets-percent").textContent = Math.floor(ticketsEarned/ticketTarget * 100);

    document.querySelector(".days-passed").textContent = Math.floor((currentDate - arcadeStartDate) / 86400000);
    document.querySelector(".days-remaining").textContent = Math.floor((arcadeEndDate - currentDate) / 86400000);
    document.querySelector(".days-percent").textContent = Math.floor((currentDate - arcadeStartDate) / (arcadeEndDate - arcadeStartDate) * 100);
}

function update() {
    selectedTarget = targetIds.indexOf(document.getElementById("target").value);
    ticketTarget = targetValues[selectedTarget];
    if (ticketTarget === 0) {
        customTarget = parseInt(document.getElementById("custom").value);
        if (document.getElementById("custom").value === "") customTarget = 0;
        ticketTarget = customTarget;
    }
    save();
    display();
}

document.getElementById("target").onchange = function() {
    update();
    save();
    display();
}

document.getElementById("custom").onkeyup = function() {
    update();
    save();
    display();
}

document.getElementById("complete").onclick = function() {
    ticketsEarned += 1;
    save();
    display();
}

document.getElementById("uncomplete").onclick = function() {
    ticketsEarned = Math.max(ticketsEarned - 1, 0);
    save();
    display();
}

load();
display();