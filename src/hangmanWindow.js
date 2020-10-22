import hangman from '/_dist_/hangman.js'
import drag from '/_dist_/droppable.js'

let generateHangman = document.getElementById("generateHangman")
let counter = 1

generateHangman.addEventListener('click', function () {
    let hangmanWindow = document.createElement("div")
    hangmanWindow.className = "window"
    hangmanWindow.id = "hangman" + counter.toString()
    hangmanWindow.draggable = "true"

    hangmanWindow.style.left = "30px"
    hangmanWindow.style.top = "30px"

    let closeWindow = document.createElement("input")
    closeWindow.className = "closeWindow"
    closeWindow.type = "button"
    closeWindow.value = "X"
    hangmanWindow.appendChild(closeWindow)

    let hangmanWord = document.createElement("div")
    hangmanWord.className = "hangmanWord"

    let wordToGuess = document.createElement("p")
    hangmanWord.appendChild(wordToGuess)
    hangmanWindow.appendChild(hangmanWord)

    let enterLetter = document.createElement("div")
    enterLetter.className = "enterLetter"

    let character = document.createElement("input")
    character.className = "javascriptcharacter"
    character.type = "text"
    character.placeholder = "Enter a character"
    enterLetter.appendChild(character)

    let button = document.createElement("input")
    button.className = "javascriptbutton"
    button.type = "button"
    button.value = "Guess character"
    enterLetter.appendChild(button)
    hangmanWindow.appendChild(enterLetter)

    let wrongGuesses = document.createElement("div")
    wrongGuesses.className = "wrongGuesses"

    let wrongGuessesP = document.createElement("p")
    wrongGuesses.appendChild(wrongGuessesP)
    hangmanWindow.appendChild(wrongGuesses)

    let wonOrLost = document.createElement("div")
    wonOrLost.className = "wonOrLost"

    let wonOrLostP = document.createElement("p")
    wonOrLost.appendChild(wonOrLostP)
    hangmanWindow.appendChild(wonOrLost)

    let restart = document.createElement("div")
    restart.className = "restart"

    let restartButton = document.createElement("input")
    restartButton.type = "button"
    restartButton.value = "Restart"
    restartButton.hidden = "true"
    restart.appendChild(restartButton)
    hangmanWindow.appendChild(restart)

    document.body.appendChild(hangmanWindow)

    hangman.run(button, restartButton, wordToGuess, wrongGuessesP, wonOrLostP, character)
    drag.run(hangmanWindow, closeWindow)
    counter += 1
})