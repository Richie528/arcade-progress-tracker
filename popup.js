let ticketTarget = 100;
let ticketsEarned = 0;

let currentDate = Date.now();
let arcadeStartDate = new Date("2024-6-18");
let arcadeEndDate = new Date("2024-8-31");

function load() {
    if (localStorage.getItem("ticket-target") === null) localStorage.setItem("ticket-target", "0");
    if (localStorage.getItem("tickets-earned") === null) localStorage.setItem("tickets-earned", "0");
    ticketTarget = parseInt(localStorage.getItem("ticket-target"));
    ticketsEarned = parseInt(localStorage.getItem("tickets-earned"));
}

function save() {
    localStorage.setItem("ticket-target", ticketTarget);
    localStorage.setItem("tickets-earned", ticketsEarned);
}

function display() {
    document.getElementById("target").value = ticketTarget;
    if (ticketTarget === 0 || Number.isNaN(ticketTarget)) document.getElementById("target").value = "";

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

document.getElementById("target").onkeyup = function() {
    ticketTarget = parseInt(document.getElementById("target").value);
    if (document.getElementById("target").value == "") ticketTarget = 0;
    if (Number.isNaN(ticketTarget)) {
        document.querySelector(".progress-bar").style.backgroundColor = "#cccccc";
        document.getElementById("target").value = "";
    } else {
        document.querySelector(".progress-bar").style.backgroundColor = "#e78284";
    }
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