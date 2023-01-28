let difficulty = document.getElementById("difficulty").value
let deal = document.getElementById("deal")
let cards = document.getElementById("cards")
let dealerCards = document.getElementById("dealerCards")
let result = document.getElementById("result")
let newCard = document.getElementById("newCard")
let winner = document.getElementById("winner")
let playerResult = document.getElementById("playerResult")

document.querySelector("#welcomeScreen button").style.visibility = "hidden"
result.style.display = "inline-block"
let player = {}

let playerForm = document.getElementById("playerForm")
playerForm.addEventListener("submit", function(event) {
    event.preventDefault();
    let playerName = document.getElementById("playerName").value;
    document.getElementById('introScreen').style.display = "none";
    document.getElementById("welcomeScreen").style.display = "flex";
    player.name = playerName;
    document.getElementById("playerName").textContent = player.Name;
  });


function swipe() {
    player.chips = 1000
    document.getElementById("playerChips").textContent = player.chips
    swipeConfirm.style.visibility = "visible"
    document.getElementById("swipeConfirm").style.visibility = "visible"
    document.getElementById("swipe").classList.add("anim")
    document.querySelector("#welcomeScreen button").style.visibility = "visible"
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
difficulty *= 10
let dealerArea = document.querySelector(".dealerHand div")
let playerArea = document.querySelector(".playerHand div")

function start() {
    deal.disabled = true
    newCard.disabled = false
    winner.disabled = false
    //cards.textContent = ""
    //dealerCards.textContent = ""
    playerArea.innerHTML = ""
    dealerArea.innerHTML = ""
    
    /* Player hand */
    sum = 0
    arr.push(drawCard(), drawCard())
    for (let i in arr) {
        sum += arr[i]
        render(arr[i], playerArea) + " "
    }
    playerResult.textContent = "Total = " + sum
    
    /* Dealer hand */
    sumDealer = 0
    dealerArr.push(drawCard(), drawCard())
    for (let i in dealerArr) {
        sumDealer += dealerArr[i]
        if (i == 0) {
            render("" , dealerArea)
        } else {
            render(dealerArr[i], dealerArea) + " "
        }
    }
    blackjack()
   // console.log("initial: " + dealerArr + " sum is: " + sumDealer)
}

function drawCard() {
    let x = Math.floor(Math.random()*11) + 1
    if ( x >= 10) {
        return 10
    } else if ( x == 1) {
        return 11
    } else return x
}

function render(arg, area) {
    switch (arg) {
        case 10: 
            {
                let x = ["J", "Q", "K"]
                let index = Math.floor(Math.random() * x.length)
                area.appendChild(createCard(x[index]))
            }
            break
        case 1:
        case 11:
            area.appendChild(createCard("A"))
            break
        default:
            area.appendChild(createCard(arg))
            break
    }
}

function createCard(text) {
    let card = document.createElement("div")
    card.className = "visualCard"
    card.textContent = text
    return card
}

function blackjack() {
    if (sum < 21) {
        result.textContent = "Under 21. Drag another card?"
    } else if (sum == 21) {
        result.textContent = "WOHOOO, Blackjack!!!"
        arr = []
        player.chips += difficulty
        enableButtons()
    } else {
        result.textContent = "Over 21. Better luck next time!"
        arr = []
        player.chips -= difficulty
        enableButtons()
    }
    document.getElementById("playerChips").textContent = player.chips
}



function drawAgain() {
    arr.push(Math.floor(Math.random()*10)+2)
    sum += arr[arr.length-1]
    render(arr[arr.length-1], playerArea)
    playerResult.textContent = "Total = " + sum
    blackjack()
}

function check() {
    
    //dealerCards.textContent = ""
    dealerArea.innerHTML = ""
    for (let i in dealerArr) {
        render(dealerArr[i], dealerArea)
    }
   // console.log("before 17: " + dealerArr + " sum is: " + sumDealer)
    for (let i=dealerArr.length; sumDealer<17; i++) {
        dealerArr.push(drawCard())
        sumDealer += dealerArr[i]
        render(dealerArr[i], dealerArea)
    }
   // console.log("after 17: " + dealerArr + " sum is: " + sumDealer)

    result.textContent = dealerArr
    if (sum>sumDealer) {
        result.textContent = "YOU WON! Dealer has weaker cards: "
        
        player.chips += difficulty
        enableButtons()
    } else if (sum == sumDealer) {
        result.textContent = "TIE"
       
        enableButtons()
    } else if (sum<sumDealer && sumDealer>21) {
        result.textContent = "YOU WON! Dealer went over: "
       
        enableButtons()
        player.chips += difficulty
    } else {
        result.textContent = "YOU LOST! Dealer has better cards: "
      
        player.chips -= difficulty
        enableButtons()
    }
    document.getElementById("playerChips").textContent = player.chips
}

function enableButtons() {
    deal.disabled = false
    newCard.disabled = true
    winner.disabled = true
    arr = []
    dealerArr = []
}
let btns = document.querySelectorAll("button")
btns.addEventListener("click" , function () {
    btns.disabled = true
    btns.disabled = false
    console.log("click")
})