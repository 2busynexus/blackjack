
let deal = document.getElementById("deal")
let cards = document.getElementById("cards")
let startMsg = document.getElementById("startMsg")
let result = document.getElementById("result")
let newCard = document.getElementById("newCard")
let winner = document.getElementById("winner")

let playerResult = document.getElementById("playerResult")

document.querySelector("#welcomeScreen button").style.display = "none"

let player = {}

function playerName() {
    let playerName = document.getElementById("playerName").value
    document.getElementById('introScreen').style.display = "none"
    document.getElementById("welcomeScreen").style.display = "flex"
    player.name = playerName
    document.getElementById("playerName").textContent = player.Name
}

function swipe() {
    player.chips = 1000
    document.getElementById("playerChips").textContent = player.chips
   // pot.textContent = player.name + " " + player.chips
    swipeConfirm.style.visibility = "visible"
    document.getElementById("swipeConfirm").textContent = `Your funds have been added. You have now ${player.chips} chips to play with`
    document.getElementById("swipe").classList.add("anim")
    document.querySelector("#welcomeScreen button").style.display = "block"
}

const play = () => {
    document.getElementById("welcomeScreen").style.display = "none"
    document.querySelector(".container").style.backgroundColor = "hsl(100, 20%, 45%, 0)"
    document.getElementById("gameScreen").style.display = "grid"
    newCard.disabled = "false"
    winner.disabled = "false"
}

let arr = []
let sum = 0
let dealerArr = []
let sumDealer = 0

//newCard.disabled = true
//winner.disabled = true


function start() {
    deal.disabled = true
    newCard.disabled = false
    winner.disabled = false
    
    /* Player hand */
    sum = 0
    arr.push(drawCard(), drawCard())
    for (let i=0; i<arr.length; i++) {
        sum += arr[i]
    }
    cards.textContent = render(arr)
    playerResult.textContent = "Total = " + sum
    /* Dealer hand */
    dealerArr.push(drawCard(), drawCard())
    for (let i=0; i<dealerArr.length; i++) {
        sumDealer += dealerArr[i]
    }
    result.textContent = dealerArr
    blackjack()
}

function blackjack() {
    if (sum < 21) {
        result.textContent = "Under 21. Drag another card?"
    } else if (sum == 21) {
        result.textContent = "WOHOOO, Blackjack!!!"
        arr = []
        player.chips += 10
        enableButtons()
    } else {
        result.textContent = "Over 21. Better luck next time!"
        arr = []
        player.chips -= 10
        enableButtons()
        
    }
    document.getElementById("playerChips").textContent = player.chips
}

function drawCard() {
    let x = Math.floor(Math.random()*11) + 1
    if ( x >= 10) {
        return 10
    } else if ( x == 1) {
        return 11
    } else return x
}

function drawAgain() {
    arr.push(Math.floor(Math.random()*10)+2)
    sum += arr[arr.length-1]
    cards.textContent += " " + renderCard(arr[arr.length-1])
    playerResult.textContent = "Total = " + sum
    blackjack()
}

function dealer() {
    
    for (let i=dealerArr.length; sumDealer<17; i++) {
        dealerArr.push(drawCard())
        sumDealer += dealerArr[i]
    }
    
    result.textContent = dealerArr
    if (sum>sumDealer) {
        result.textContent = "YOU WON! Dealer has weaker cards: "
        render()
        player.chips += 10
        enableButtons()
    } else if (sum == sumDealer) {
        result.textContent = "TIE"
        render()
        enableButtons()
    } else if (sum<sumDealer && sumDealer>21) {
        result.textContent = "YOU WON! Dealer went over: "
        render()
        enableButtons()
        player.chips += 10
    } else {
        result.textContent = "YOU LOST! Dealer has better cards: "
        render()
        player.chips -= 10
        enableButtons()
    }
    document.getElementById("playerChips").textContent = player.chips
}

function enableButtons() {
    deal.disabled = false
    newCard.disabled = true
    winner.disabled = true
}

function render(arg) {
    for (let i=0; i<arg.length; i++) {
         if (arg[i]<10) {
            return arg[i]
    } else if (arg[i]==10) {
        let x = ["J", "Q", "K"]
        //result.textContent += x[Math.floor(Math.random() * x.length)]
        return x[Math.floor(Math.random() * x.length)]
    } else {
        //result.textContent += "A"
        return "A"
    }
        //result.textContent += " " + renderCard(dealerArr[i])
    }    
}