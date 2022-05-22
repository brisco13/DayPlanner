let holder = document.getElementById("container")
let rightNow = moment()
let dateTime = document.getElementById("currentDay")
let calcNow = moment().unix()
let hourNow = 14//moment().format("k") 
let day = moment().format("MMM Do, YYYY")
let pastHour = 13//moment().format("k");
let schedule = [];


timeRefresh();
// Check/create to local storage
function checkCal() {
    let hasCal = localStorage.getItem("hasCal");
    if (hasCal === true) {
        schedule = JSON.parse(localStorage.getItem("schedule"));
    } else {
        localStorage.setItem("hasCal", true);
        schedule = [
            ["8:00", ""],
            ["9:00", "Test"],
            ["10:00", ""],
            ["11:00", ""],
            ["12:00", ""],
            ["13:00", ""],
            ["14:00", ""],
            ["15:00", ""],
            ["16:00", ""],
            ["17:00", ""],  
        ];
        localStorage.setItem("schedule", JSON.stringify(schedule))  
    }    
}

checkCal();
// Make function to dymamically make div cards for time slots

function makeCal() {
    holder.innerHTML = ""
    for (let i = 8; i < 18; i++) {
        let arrayPlaceholder = i-8;
        let card = document.createElement("div")
        let cardBody = document.createElement("div")
        let inputBody = document.createElement("div")
        // button
        let butt =document.createElement("button")
        butt.setAttribute("id",arrayPlaceholder)
        butt.setAttribute("onClick", `getCard(this.id)`)
        butt.setAttribute("class", `btn btn-outline-secondary inputbox`)
        butt.textContent= `Book it!`
        // input
        let form = document.createElement("input")
        form.setAttribute("id",arrayPlaceholder+"input")
        form.setAttribute("class","form-control inputbox")
        // input box
        inputBody.setAttribute("class","input-group mb-3 inputbox")
        // combine in input box
        inputBody.append(butt)
        inputBody.append(form)
        // card
        card.setAttribute("id",i+"timeslot")
        cardBody.setAttribute("class","card-body")
        let dateVar = `${day} ${i}:00`
        card.setAttribute("datetime", dateVar)
        card.setAttribute("class","card w-80")
        let p = document.createElement("h5")
        p.setAttribute("id",i+"hour")
        // calc time relative
        if (hourNow<i) {
            p.setAttribute("style","background-color: rgba(84, 255, 61, 0.63)")
        } else if (hourNow == i) {
            p.setAttribute("style","background-color: rgba(0, 204, 255, 0.63)")
        } else {
            p.setAttribute("style","background-color: rgba(255, 61, 61, 0.63)")
        }
        p.setAttribute("class","card-header blue")
        p.textContent= `${i}:00`
        let toDo = document.createElement("h3")
        toDo.textContent= schedule[arrayPlaceholder][1]
        toDo.setAttribute("id",arrayPlaceholder+"item")
        toDo.setAttribute("class","card-title")

        card.append(p)
        cardBody.append(toDo)
        cardBody.append(inputBody)
        card.append(cardBody)
        holder.append(card)}
    }

makeCal()

//button function to add event to time block and save to local storage
function getCard(id) {
    let newItem = document.getElementById(id+"input");
    let currentItem = document.getElementById(id+"item");
    schedule[id][1] = newItem.value;
    currentItem.value = newItem.value;
    newItem.value = ""
    localStorage.setItem("schedule", JSON.stringify(schedule))

    makeCal()
}
// refresh/initialization should retrieve local storage

// make jumbotron time
function timeRefresh () {
    let timeInterval = setInterval(function() {
        rightNow = moment().format("MMM Do, YYYY k:m:ss") 
        calcNow = moment().unix();
        hourNow = 14//moment().format("k") 
        dateTime.textContent = "Current Date and Time: "+rightNow;
        if (pastHour<hourNow) {
            makeCal();
            pastHour = hourNow;
        }

    }, 1000);
}
