// global variables
let diff = document.getElementById("difficulty")
let diffTime = document.querySelector(".diff-desc span:first-child")
let diffUnit = document.querySelector(".diff-desc span:last-child")
let btn = document.getElementById("button")
let writtenWord = document.getElementById("written-word")
let wordList = document.getElementById("word-list")
let mainWord = document.getElementById("main-word")
let timeCounter = document.querySelector(".dashboard .time span")
let scoreCounter = document.querySelector(".dashboard .score span:first-child")
let totalNumOfWords = document.querySelector(".dashboard .score span:last-child")
let message = document.getElementById("message")
let date = new Date
let today = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()} at ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
let overlay = document.querySelector(".overlay")
let gameOverSound = new Audio("sounds/game-over.mp3")
let cardMatch = new Audio("sounds/word-match.wav")
let gameWin = new Audio("sounds/finish-game.wav")



//our array
let words = ["hello", "bye", "sun", "flower", "dependencies", "applicable", "computer", "python", "javascript", "speed", "list", "html",
"linkedin", "facebook", "website", "treasure", "event", "function", "keyword", "react", "export", "random", "import"]

let easyWords = []
let medWords = []
let harWords = []

// generating words
words.forEach((word)=>{
    if(word.length <= 5){
        easyWords.push(word)
    }else if(word.length>5 && word.length <=8){
        medWords.push(word)
    }else if(word.length > 8){
        harWords.push(word)
    }
})

// difficulties
let diffLvls = {
    "easy":{
        "time":6,
        "words":easyWords
    },
    "medium":{
        "time":4,
        "words":medWords
    },
    "hard":{
        "time":2,
        "words":harWords
    },
    
}

diff.addEventListener("change",function(){

    // show the time of each difficulty choosen by the user
    if(diff.value === "easy"){
        diffTime.innerHTML = diffLvls["easy"]["time"]
        diffUnit.innerHTML = "seconds"
    }else if(diff.value === "medium"){
        diffTime.innerHTML = diffLvls["medium"]["time"]
        diffUnit.innerHTML = "seconds"
    }else{
        diffTime.innerHTML = diffLvls["hard"]["time"]
        diffUnit.innerHTML = "second"   
    }
})

btn.addEventListener("click", function(){
    
    // prevent pasting word in input field
    writtenWord.onpaste = function(){
        return false;
    }

    //remove the button
    this.remove()
    
    // call function to generate words
    genWords()

    //autofocus on input
    writtenWord.focus()

    //adding time counter
    timeCounter.innerHTML = diffLvls[diff.value]["time"]

    //adding number of words
    totalNumOfWords.innerHTML = diffLvls[diff.value]["words"].length

    startPlay()
})

//function which generate words randomly
function genWords(){

    // looping on al words to put it into spans
    for(i=0; i<diffLvls[diff.value]["words"].length; i++){
        let span = document.createElement("span")
        let wordSpan = document.createTextNode(diffLvls[diff.value]["words"][i])
        span.appendChild(wordSpan)
        wordList.appendChild(span)
    }

    //choose word randomly from list of words
    mainWord.innerHTML =  diffLvls[diff.value]["words"][Math.floor(Math.random() * diffLvls[diff.value]["words"].length)]

    // making the input appear
    writtenWord.style.display = "inline-block"

    // making the list of words appear
    wordList.style.display = "flex"
}

function startPlay(){
    
    //Showing the overlay div
    overlay.style.display = "flex"

    // call the function which waits for preparation
    prep()

    // Delaying the start of the game after 3 seconds
    setTimeout(()=>{
            //making counter active
        let timer = setInterval(function(){
            timeCounter.innerHTML--

            // stop the counter at 0
            if(timeCounter.innerHTML === "0"){
                clearInterval(timer)
            }

            // checking the word
            if(writtenWord.value.toLowerCase() === mainWord.innerHTML.toLowerCase()){

                //playing sound
                cardMatch.play()

                //empty the input field
                writtenWord.value = ""

                // deleting the word from the list
                diffLvls[diff.value]["words"].splice(diffLvls[diff.value]["words"].indexOf(mainWord.innerHTML),1)

                // empty the upcoming words
                wordList.innerHTML = ""

                //check if the array is empty
                if(diffLvls[diff.value]["words"].length>0){
                    genWords()
                }

                // increasing the score
                scoreCounter.innerHTML++

                // reseting the timer
                timeCounter.innerHTML = diffLvls[diff.value]["time"]

            // if the time finished and the word not correct
            }else if(timeCounter.innerHTML === "0" && writtenWord.value.toLowerCase() !== mainWord.innerHTML.toLowerCase()){

                // generate amessage
                mainWord.innerHTML = "GAME OVER"
                mainWord.style.color = "red"
                gameOverSound.play()

                //if he made all the words in time correct
            }else if(scoreCounter.innerHTML === totalNumOfWords.innerHTML){

                //generate message of success
                mainWord.innerHTML = "WELL DONE"
                mainWord.style.color = "red"
                gameWin.play()
                wordList.remove()
                writtenWord.remove()

                //stop the timer
                clearInterval(timer)

                //save your score with date in local storage
                localStorage.setItem(today,scoreCounter.innerHTML)
            }
        },1000)
    },3000)
    
}

// function of prepairing counter
function prep(){
    setInterval(()=>{
        overlay.innerHTML--
        if(overlay.innerHTML === "0"){
            overlay.style.display= "none"
        }
    },1000)
}