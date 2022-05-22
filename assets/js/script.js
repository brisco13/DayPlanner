var holder = document.getElementById("container")

// Make function to dymamically make div cards for time slots

function makeCal() {
    for (let i = 9; i < 18; i++) {
        // create new div
        let today = "2022-05-19"
        let card = document.createElement("div")
        card.setAttribute("id",i+"timeslot")
        card.setAttribute("datetime",`${today}0${i}:00`)
        let p = document.createElement("p")
        p.setAttribute("id",i+"hour")
        p.textContent= `0${i}:00`
        let form = document.createElement("input")
        let butt =document.createElement("button")
        butt.setAttribute("id",i)
        butt.setAttribute("onClick", `getCard(this.id)`)
        butt.textContent= `click me`
        p.append(form)
        card.append(p)
        card.append(butt)
        holder.append(card)}}

makeCal()
//make function to get current time

//make function to compare time against cards - change format based off this

//button function to add event to time block and save to local storage

// refresh/initialization should retrieve local storage