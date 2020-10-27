import hangmanGame from './modules/hangman.js'
import drag from './modules/droppable.js'

const generateHangman = document.getElementById('generateHangman')
let counter = 1 // A counter used to give unique id:s to the windows

generateHangman.addEventListener('click', function () { // If the user clicks the hangman icon, generate a div with all the contents
  const hangmanWindow = document.createElement('div')
  hangmanWindow.className = 'window'
  hangmanWindow.id = 'hangman' + counter.toString()
  hangmanWindow.draggable = 'true'

  hangmanWindow.style.left = '30px'
  hangmanWindow.style.top = '100px'

  const closeWindow = document.createElement('input')
  closeWindow.className = 'closeWindow'
  closeWindow.type = 'button'
  closeWindow.value = 'X'
  hangmanWindow.appendChild(closeWindow)

  const hangmanWord = document.createElement('div')
  hangmanWord.className = 'hangmanWord'

  const wordToGuess = document.createElement('p')
  hangmanWord.appendChild(wordToGuess)
  hangmanWindow.appendChild(hangmanWord)

  const enterLetter = document.createElement('div')
  enterLetter.className = 'enterLetter'

  const character = document.createElement('input')
  character.className = 'javascriptcharacter'
  character.type = 'text'
  character.placeholder = 'Enter a character'
  enterLetter.appendChild(character)

  const button = document.createElement('input')
  button.className = 'javascriptbutton'
  button.type = 'button'
  button.value = 'Guess character'
  enterLetter.appendChild(button)
  hangmanWindow.appendChild(enterLetter)

  const wrongGuesses = document.createElement('div')
  wrongGuesses.className = 'wrongGuesses'

  const wrongGuessesP = document.createElement('p')
  wrongGuesses.appendChild(wrongGuessesP)
  hangmanWindow.appendChild(wrongGuesses)

  const wonOrLost = document.createElement('div')
  wonOrLost.className = 'wonOrLost'

  const wonOrLostP = document.createElement('p')
  wonOrLost.appendChild(wonOrLostP)
  hangmanWindow.appendChild(wonOrLost)

  const restart = document.createElement('div')
  restart.className = 'restart'

  const restartButton = document.createElement('input')
  restartButton.type = 'button'
  restartButton.value = 'Restart'
  restartButton.hidden = 'true'
  restart.appendChild(restartButton)
  hangmanWindow.appendChild(restart)

  //Add the svg image, copied from the hidden div in the html page
  const divsvg = document.createElement('div')
  divsvg.innerHTML = document.getElementById('hangman').innerHTML

  hangmanWindow.appendChild(divsvg)

  // Give unique id's to all the components in the svg image. Not a pretty solution, but it does the trick
  const components = hangmanWindow.getElementsByTagName('g')
  components[0].id = components[0].id + counter
  components[9].id = components[9].id + counter
  components[13].id = components[13].id + counter
  components[14].id = components[14].id + counter
  components[16].id = components[16].id + counter
  components[18].id = components[18].id + counter
  components[20].id = components[20].id + counter
  components[22].id = components[22].id + counter
  components[23].id = components[23].id + counter

  document.body.appendChild(hangmanWindow)

  hangmanGame.run(button, restartButton, wordToGuess, wrongGuessesP, wonOrLostP, character) // Run the application
  drag.run(hangmanWindow, closeWindow) // Send the window to droppable.js which handles the dragging of windows
  counter += 1 // Update the id counter
})
