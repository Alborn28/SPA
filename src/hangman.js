import hangmansvg from './hangmansvg.js'

let idCounter = 1 // A counter to which allows to find the

/**
 * A function that handles the functionality of the hangman game.
 *
 * @param {HTMLInputElement} button a button used by the user to submit their guess.
 * @param {HTMLInputElement} restartButton a button used to restart the game when the user has won or lost.
 * @param {HTMLParagraphElement} wordToGuess a paragraph where the word is displayed, at the start it only consists of underscores.
 * @param {HTMLParagraphElement} wrongGuesses a paragraph where the incorrect guesses are displayed.
 * @param {HTMLParagraphElement} wonOrLost a paragraph where a message is displayed after the game is over.
 * @param {HTMLInputElement} enteredCharacter an input field where the user writes their guess
 */
function run (button, restartButton, wordToGuess, wrongGuesses, wonOrLost, enteredCharacter) {
  const words = ['bus', 'car', 'bike', 'floor', 'name', 'door', 'rack', 'coat', 'screen', 'fridge', 'cheese', 'meat', 'table']
  let mistakes // Counter of how many incorrect guesses has been made
  let correctGuesses // Counter of how many correct guesses has been made
  let incorrectLetters // Store the letters that has been guessed but are incorrect
  let correctWord // Store the correct word
  let output // An array that is the output to the user, at the start it consists of only underscores but will be filled with letters until it corresponds to the correctWord

  const hangman = hangmansvg.Hangman(idCounter)

  idCounter += 1

  console.log('Hangman started')

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

  restartButton.addEventListener('click', function () {
    restart()
  })

  /**
   * Functions is used to prepare the game for playing. For example hides the hangman svg, randomizes the word to be guessed and displays underscores.
   */
  function setUp () {
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
    console.log('Setup complete')
  }

  /**
   * Reset everything to how it was at the beginning and call the setUp function.
   */
  function restart () {
    restartButton.hidden = true
    button.hidden = false
    enteredCharacter.hidden = false
    wonOrLost.innerHTML = ''
    setUp()
  }

  /**
   * Checks if the user made a correct guess or not and act accordingly.
   *
   * @param {string} char the character that the user guessed.
   * @param {Array} indexOfChar where that character occurrs in the word, if at all.
   */
  function checkGuess (char, indexOfChar) {
    if (indexOfChar.length === 0 && !incorrectLetters.includes(char)) { // Incorrect guess
      hangman.show(hangman.validParts[mistakes]) // Show a new part of the hanging man
      mistakes += 1

      incorrectLetters.push(char)
      wrongGuesses.innerHTML = incorrectLetters.join(' ') // Display all the characters that has been guessed wrong so far
    } else if (!incorrectLetters.includes(char) && !output.includes(char)) { // Correct guess and has not been guessed before
      correctGuesses += indexOfChar.length // Update the correctGuesses. Uses length of the indexOfChar, since the character may be in several places.

      for (const i of indexOfChar) { // Input the character in all the places where it should be
        output[i] = char
      }

      wordToGuess.innerHTML = output.join(' ')
    }
  }

  /**
   * Store the indexes where the character appears in the word.
   *
   * @param {string} c the character that was guessed.
   * @returns {Array} the indexes of that character in the word to be guessed.
   */
  function getCharacterIndexes (c) {
    const indexOfChar = []
    for (let i = 0; i < correctWord.length; i += 1) {
      if (c === correctWord.charAt(i)) {
        indexOfChar.push(i)
      }
    }

    return indexOfChar
  }

  /**
   * Remove all the unneccessary objects from the page and display a "You won"-message as well as show a restart button.
   */
  function won () {
    enteredCharacter.hidden = true
    button.hidden = true
    restartButton.hidden = false
    wrongGuesses.innerHTML = ''
    wonOrLost.innerHTML = 'You won! :)'
  }

  /**
   * Remove all the unneccessary objects from the page and display a "You lost"-message as well as show a restart button.
   */
  function lost () {
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
