// global variables
let diff = document.getElementById("difficulty")
let diffTime = document.querySelector(".diff-desc span:first-child")
let diffUnit = document.querySelector(".diff-desc span:last-child")
let btn = document.getElementById("button")
let writtenWord = document.getElementById("written-word")
let wordList = document.getElementById("word-list")
let mainWord = document.getElementById("main-word")

//our array
let words = ["hello", "bye", "sun", "flower", "dependencies", "applicable", "computer", "python", "javascript", "speed", "list", "html",
"linkedin", "facebook", "website", "treasure", "event", "function", "keyword", "react", "export", "random", "import",]

diff.addEventListener("change",function(){

    // show the time of each difficulty choosen by the user
    if(diff.value === "easy"){
        diffTime.innerHTML = "3"
        diffUnit.innerHTML = "seconds"
    }else if(diff.value === "medium"){
        diffTime.innerHTML = "2"
        diffUnit.innerHTML = "seconds"
    }else{
        diffTime.innerHTML = "1"
        diffUnit.innerHTML = "second"   
    }
})

btn.addEventListener("click", function(){
    
    // prevent pasting word in input field
    writtenWord.onpaste = function(){
        return false;
    }

    //autofocus on input
    writtenWord.focus()

    //remove the button
    this.remove()

    // call function to generate words
    genWords()
})
function genWords(){
    for(i=0; i<words.length; i++){
        let span = document.createElement("span")
        let wordSpan = document.createTextNode(words[i])
        span.appendChild(wordSpan)
        wordList.appendChild(span)
    }

    mainWord.innerHTML =  words[Math.floor(Math.random() * words.length)]

    
}