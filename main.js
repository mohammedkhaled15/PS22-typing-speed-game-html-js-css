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

//our array
let words = ["hello", "bye", "sun", "flower", "dependencies", "applicable", "computer", "python", "javascript", "speed", "list", "html",
"linkedin", "facebook", "website", "treasure", "event", "function", "keyword", "react", "export", "random", "import",]

let diffLvls = {
    "easy":6,
    "medium":2,
    "hard":1
}

diff.addEventListener("change",function(){

    // show the time of each difficulty choosen by the user
    if(diff.value === "easy"){
        diffTime.innerHTML = diffLvls["easy"]
        diffUnit.innerHTML = "seconds"
    }else if(diff.value === "medium"){
        diffTime.innerHTML = diffLvls["medium"]
        diffUnit.innerHTML = "seconds"
    }else{
        diffTime.innerHTML = diffLvls["hard"]
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
    timeCounter.innerHTML = diffLvls[diff.value]

    //adding number of words
    totalNumOfWords.innerHTML = words.length

    startPlay()
})

//function which generate words randomly
function genWords(){

    // looping on al words to put it into spans
    for(i=0; i<words.length; i++){
        let span = document.createElement("span")
        let wordSpan = document.createTextNode(words[i])
        span.appendChild(wordSpan)
        wordList.appendChild(span)
    }

    //choose word randomly from list of words
    mainWord.innerHTML =  words[Math.floor(Math.random() * words.length)]

    // making the input appear
    writtenWord.style.display = "inline-block"

    // making the list of words appear
    wordList.style.display = "flex"
}

function startPlay(){
    
    //making counter active
    let timer = setInterval(function(){
        timeCounter.innerHTML--

        // stop the counter at 0
        if(timeCounter.innerHTML === "0"){
            clearInterval(timer)
        }

        // checking the word
        if(writtenWord.value.toLowerCase() === mainWord.innerHTML.toLowerCase()){

            //empty the input field
            writtenWord.value = ""

            // increasing the score
            scoreCounter.innerHTML++

            // reseting the timer
            timeCounter.innerHTML = diffLvls[diff.value]

            //activating the timer again
            setInterval(function(){

            },1000)

            // deleting the word from the list
            document.querySelectorAll("#word-list span").forEach((span)=>{
                if (span.innerHTML === writtenWord.value.toLowerCase()){
                    span.remove()
                }
            })
        }else{
            message.innerHTML = "GAME OVER"
        }
    },1000)

}