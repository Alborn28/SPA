let idCounter = 1;

// Create a module Hangman that handles the svg image of the hanging man
function Hangman() {
  'use strict'

  var hangman = {

    // Get all elements as their id
    partAsElement: {
      hill: document.getElementById("hang_hill" + idCounter),
      gallow: document.getElementById("hang_construction" + idCounter),
      body: document.getElementById("hang_body" + idCounter),
      rightarm: document.getElementById("hang_rightarm" + idCounter),
      leftarm: document.getElementById("hang_leftarm" + idCounter),
      rightleg: document.getElementById("hang_rightleg" + idCounter),
      leftleg: document.getElementById("hang_leftleg" + idCounter),
      rope: document.getElementById("hang_rope" + idCounter),
      head: document.getElementById("hang_head" + idCounter)
    },

    // Create an array with all valid parts
    validParts: [
      'hill',
      'gallow',
      'rope',
      'head',
      'body',
      'rightarm',
      'leftarm',
      'rightleg',
      'leftleg'
    ],

    /**
     * Check if part a valid part, writes error message to console if the part is invalid.
     *
     * @param {string} part Name of the part to check.
     * @returns {boolean} true if valid part, else false.
     */
    isValid: function (part) {
      if (this.validParts.indexOf(part) === -1) {
        window.console.log('The part is not valid: ' + part)
        return false
      }
      return true
    },

    /**
     * Hide a part.
     *
     * @param {string} part Name of the part to hide.
     */
    hide: function (part) {
      if (this.isValid(part)) {
        this.partAsElement[part].style.display = 'none'
      }
    },

    /**
     * Show a part.
     *
     * @param {string} part Name of the part to show.
     */
    show: function (part) {
      if (this.isValid(part)) {
        this.partAsElement[part].style.display = 'inline'
      }
    }
  }

  // Return the object to make it visible.
  return hangman
}


function run(button, restartButton, wordToGuess, wrongGuesses, wonOrLost, enteredCharacter) {
  const words = ['bus', 'car', 'bike', 'floor', 'name', 'door', 'rack', 'coat', 'screen', 'fridge', 'cheese', 'meat', 'table']
  let mistakes // Counter of how many incorrect guesses has been made
  let correctGuesses // Counter of how many correct guesses has been made
  let incorrectLetters // Store the letters that has been guessed but are incorrect
  let correctWord // Store the correct word
  let output // An array that is the output to the user, at the start it consists of only underscores but will be filled with letters until it corresponds to the correctWord

  let hangman = Hangman()

  idCounter += 1

  console.log("Hangman started")

  setUp()
  
  button.addEventListener('click', function () {
    // Run until you have either won or lost
    if (mistakes < 9 && correctGuesses < correctWord.length) {
      var char = enteredCharacter.value
      enteredCharacter.value = ''

      if (char.length === 1) {
        const indexOfChar = getCharacterIndexes(char) // Get the indexes where the character occurs in the word, if any
        checkGuess(char, indexOfChar) // Check if the character that the user guessed was correct or not

        // If 9 mistakes are made, the user has won
        if (mistakes === 9) {
          lost()
        }

        // If all the characters has been guessed, the user has won
        if (correctGuesses === correctWord.length) {
          won()
        }
      }
    }
  })

  // See if the user wants to restart the game after he or she has either won or lost
  restartButton.addEventListener('click', function () {
    restart()
  })

  function setUp() {
    // Start of by hiding all the parts
    for (let i = 0; i < 9; i += 1) {
      hangman.hide(hangman.validParts[i])
    }

    mistakes = 0
    correctGuesses = 0
    incorrectLetters = []

    // Pick out a random word
    correctWord = words[Math.floor(Math.random() * (words.length - 1))]

    // Start with just underscores for each of the letters in the word
    output = []
    for (let i = 0; i < correctWord.length; i += 1) {
      output.push('_')
    }

    wordToGuess.innerHTML = output.join(' ')
    console.log("Setup complete")
  }

  // Reset everything to how it was at the beginning and call the setUp function
  function restart() {
    restartButton.hidden = true
    button.hidden = false
    enteredCharacter.hidden = false
    wonOrLost.innerHTML = ''
    setUp()
  }

  // Checks if the user made a correct guess or not and act accordingly
  function checkGuess(char, indexOfChar) {
    if (indexOfChar.length === 0 && !incorrectLetters.includes(char)) { // Incorrect guess
      hangman.show(hangman.validParts[mistakes]) // Show a new part of the hanging man
      mistakes += 1

      incorrectLetters.push(char) // Store the guessed character
      wrongGuesses.innerHTML = incorrectLetters.join(' ') // Display all the characters that has been guessed wrong so far

    } else if (!incorrectLetters.includes(char) && !output.includes(char)) { // Correct guess and has not been guessed before
      correctGuesses += indexOfChar.length // Update the correctGuesses. Uses length of the indexOfChar, since the character may be in several places.

      for (const i of indexOfChar) { // Input the character in all the places where it should be
        output[i] = char
      }

      wordToGuess.innerHTML = output.join(' ')
    }
  }

  // Store the indexes where the character appears in the word, return those indexes
  function getCharacterIndexes(c) {
    const indexOfChar = []
    for (let i = 0; i < correctWord.length; i += 1) {
      if (c === correctWord.charAt(i)) {
        indexOfChar.push(i)
      }
    }

    return indexOfChar
  }

  // Remove all the unneccessary objects from the page and display a "You won"-message as well as show a restart button
  function won() {
    enteredCharacter.hidden = true
    button.hidden = true
    restartButton.hidden = false
    wrongGuesses.innerHTML = ''
    wonOrLost.innerHTML = 'You won! :)'
  }

  // Remove all the unneccessary objects from the page and display a "You lost"-message as well as show a restart button
  function lost() {
    wonOrLost.innerHTML = 'You lost :('
    wordToGuess.hidden = true
    button.hidden = true
    restartButton.hidden = false
    wordToGuess.innerHTML = correctWord
    wrongGuesses.innerHTML = ''
  }
}

export default {
  run
}
