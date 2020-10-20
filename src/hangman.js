'use strict'

// Declare variables to be used
const words = ['bus', 'car', 'bike', 'floor', 'name', 'door', 'rack', 'coat', 'screen', 'fridge', 'cheese', 'meat', 'table']
let mistakes // Counter of how many incorrect guesses has been made
let correctGuesses // Counter of how many correct guesses has been made
let incorrectLetters // Store the letters that has been guessed but are incorrect
let correctWord // Store the correct word
let output // An array that is the output to the user, at the start it consists of only underscores but will be filled with letters until it corresponds to the correctWord

const button = document.getElementById('button')
const restartButton = document.getElementById('restartButton')

// Create a module Hangman that handles the svg image of the hanging man
window.Hangman = (function () {
  'use strict'

  var hangman = {

    // Get all elements as their id
    partAsElement: {
      hill: document.getElementById('hang_hill'),
      gallow: document.getElementById('hang_construction'),
      body: document.getElementById('hang_body'),
      rightarm: document.getElementById('hang_rightarm'),
      leftarm: document.getElementById('hang_leftarm'),
      rightleg: document.getElementById('hang_rightleg'),
      leftleg: document.getElementById('hang_leftleg'),
      rope: document.getElementById('hang_rope'),
      head: document.getElementById('hang_head')
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
})()

// Create a module Functions containing the functions used in the program
window.Functions = (function () {
  var setUp = function () {
    // Start of by hiding all the parts
    for (let i = 0; i < 9; i += 1) {
      window.Hangman.hide(window.Hangman.validParts[i])
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
    document.getElementById('wordToGuess').innerHTML = output.join(' ')
  }

  // Store the indexes where the character appears in the word, return those indexes
  var getCharacterIndexes = function (c) {
    const indexOfChar = []
    for (let i = 0; i < correctWord.length; i += 1) {
      if (c === correctWord.charAt(i)) {
        indexOfChar.push(i)
      }
    }

    return indexOfChar
  }

  // Checks if the user made a correct guess or not and act accordingly
  var checkGuess = function (char, indexOfChar) {
    if (indexOfChar.length === 0 && !incorrectLetters.includes(char)) { // Incorrect guess
      window.Hangman.show(window.Hangman.validParts[mistakes]) // Show a new part of the hanging man
      mistakes += 1

      incorrectLetters.push(char) // Store the guessed character
      document.getElementById('wrongGuesses').innerHTML = incorrectLetters.join(' ') // Display all the characters that has been guessed wrong so far
    } else if (!incorrectLetters.includes(char) && !output.includes(char)) { // Correct guess and has not been guessed before
      correctGuesses += indexOfChar.length // Update the correctGuesses. Uses length of the indexOfChar, since the character may be in several places.

      for (const i of indexOfChar) { // Input the character in all the places where it should be
        output[i] = char
      }

      document.getElementById('wordToGuess').innerHTML = output.join(' ')
    }
  }

  // Remove all the unneccessary objects from the page and display a "You lost"-message as well as show a restart button
  var lost = function () {
    document.getElementById('wonOrLost').innerHTML = 'You lost :('
    document.getElementById('enteredCharacter').hidden = true
    button.hidden = true
    restartButton.hidden = false
    document.getElementById('wordToGuess').innerHTML = correctWord
    document.getElementById('wrongGuesses').innerHTML = ''
  }

  // Remove all the unneccessary objects from the page and display a "You won"-message as well as show a restart button
  var won = function () {
    document.getElementById('enteredCharacter').hidden = true
    button.hidden = true
    restartButton.hidden = false
    document.getElementById('wrongGuesses').innerHTML = ''
    document.getElementById('wonOrLost').innerHTML = 'You won! :)'
  }

  // Reset everything to how it was at the beginning and call the setUp function
  var restart = function () {
    restartButton.hidden = true
    button.hidden = false
    document.getElementById('enteredCharacter').hidden = false
    document.getElementById('wonOrLost').innerHTML = ''
    setUp()
  }

  return {
    setUp: setUp,
    getCharacterIndexes: getCharacterIndexes,
    checkGuess: checkGuess,
    lost: lost,
    won: won,
    restart: restart
  }
})()

// Create a module main where the main part of the program is run.
window.Main = (function () {
  window.Functions.setUp()

  button.addEventListener('click', function () {
    // Run until you have either won or lost
    if (mistakes < 9 && correctGuesses < correctWord.length) {
      var char = document.getElementById('enteredCharacter').value
      document.getElementById('enteredCharacter').value = ''

      if (char.length === 1) {
        const indexOfChar = window.Functions.getCharacterIndexes(char) // Get the indexes where the character occurs in the word, if any
        window.Functions.checkGuess(char, indexOfChar) // Check if the character that the user guessed was correct or not

        // If 9 mistakes are made, the user has won
        if (mistakes === 9) {
          window.Functions.lost()
        }

        // If all the characters has been guessed, the user has won
        if (correctGuesses === correctWord.length) {
          window.Functions.won()
        }
      }
    }
  })

  // See if the user wants to restart the game after he or she has either won or lost
  restartButton.addEventListener('click', function () {
    window.Functions.restart()
  })
})()

window.Main // Start the program
