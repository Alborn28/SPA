/**
 * A function handling the functionality of the memory game.
 *
 * @param {Array} td an array of all the cells in the table.
 * @param {HTMLParagraphElement} paragraf used to display instructions to the user.
 * @param {HTMLInputElement} restart a button to restart the game after it is over.
 * @param {number} blocks the length of the td array.
 * @param {HTMLDivElement} memoryWindow the window of the application.
 */
function run (td, paragraf, restart, blocks, memoryWindow) {
  'use strict'
  let correctGuessses = 0
  let incorrectGuesses = 0
  let counter = 0
  let blockInFocus = -1
  let firstBlock
  let secondBlock
  const nrOfBlocks = blocks
  const hiddenBlocks = new Array(nrOfBlocks)
  const indexOfCorrectMatches = []
  const temp = td

  document.addEventListener('keydown', keyDownHandler)

  for (let i = 0; i < nrOfBlocks; i++) {
    temp[i].onclick = function () {
      displayHidden(i)
    }
    randomizeBlocks(i)
  }

  /**
   * Function used to check if exactly two cells in the table have the same picture, when generating the game.
   *
   * @param {number} nr The number of the picture in the cell.
   * @returns {boolean} true if there are two cells who have the picture with number nr in the table, otherwise false.
   */
  function checkForDuplicates (nr) {
    let isDuplicate = false
    let count = 0

    for (let i = 0; i < nrOfBlocks; i++) {
      if (hiddenBlocks[i] === nr) {
        count++
      }
    }
    if (count === 2) {
      isDuplicate = true
    }
    return isDuplicate
  }

  /**
   * Randomizes the picture to be stored in a specific table cell.
   *
   * @param {number} currPos the index of the table cell in the temp array.
   */
  function randomizeBlocks (currPos) {
    let randNr = Math.floor((Math.random() * (nrOfBlocks / 2)) + 1)

    while (checkForDuplicates(randNr)) {
      randNr = Math.floor((Math.random() * (nrOfBlocks / 2)) + 1)
    }
    hiddenBlocks[currPos] = randNr
  }

  /**
   * Toggle all the table cells to be clickable or not.
   */
  function toggleClickable () {
    const box = temp

    for (let i = 0; i < nrOfBlocks; i++) {
      if (box[i].style.pointerEvents === 'none') {
        box[i].style.pointerEvents = ''
      } else {
        box[i].style.pointerEvents = 'none'
      }
    }
  }

  /**
   * Function used to check if the two table cells that were chosen are a match.
   *
   * @param {number} currIndex index of the chosen table cell.
   */
  function checkMatch (currIndex) {
    if (counter === 1) {
      firstBlock = hiddenBlocks[currIndex]
      indexOfCorrectMatches.push(currIndex)
    } else if (counter === 2) {
      secondBlock = hiddenBlocks[currIndex]
      indexOfCorrectMatches.push(currIndex)

      if (firstBlock === secondBlock) {
        window.console.log('yeey a match!')

        correctGuessses++
        if (correctGuessses === nrOfBlocks / 2) {
          won()
        }
      } else {
        window.console.log('sorry...no match')
        window.console.log('flipping back in 2 secs')

        indexOfCorrectMatches.pop()
        indexOfCorrectMatches.pop()
        incorrectGuesses++
        toggleClickable()

        window.setTimeout(function () {
          let found
          for (let i = 0; i < nrOfBlocks; i++) {
            found = false
            for (let j = 0; j < indexOfCorrectMatches.length; j++) {
              if (indexOfCorrectMatches[j] === i) {
                found = true
                break
              }
            }
            if (found === false) {
              temp[i].style.backgroundImage = 'none'
              temp[i].innerHTML = '?'
              temp[i].onclick = function () {
                displayHidden(i)
              }
            }
          }
          toggleClickable()
        }, 2000)
      }
      counter = 0
    }
  }

  /**
   * Display the image in the table cell when it is clicked.
   *
   * @param {number} currIndex the index of the table cell.
   */
  function displayHidden (currIndex) { // jshint ignore:line
    const currBlock = temp[currIndex]

    currBlock.innerHTML = ''
    currBlock.style.backgroundImage = "url('img/" + hiddenBlocks[currIndex] + ".png')"
    currBlock.style.backgroundSize = 'contain'

    currBlock.onclick = function () {
      window.alert('You have to choose another card')
    }

    counter++
    window.console.log('Click: ' + counter)
    checkMatch(currIndex)
  }

  /**
   * When the user has found all the matches. Hides the table, displays how many guesses were made and show a restart button.
   */
  function won () {
    for (let i = 0; i < nrOfBlocks; i++) {
      temp[i].hidden = true
    }
    paragraf.innerHTML = 'You won!<br><br>Incorrect guesses: ' + incorrectGuesses.toString()
    restart.hidden = false
  }

  restart.addEventListener('click', function () {
    paragraf.innerHTML = 'Find all pairs!'
    for (let i = 0; i < nrOfBlocks; i++) {
      temp[i].hidden = false
      temp[i].style.backgroundImage = 'none'
      temp[i].innerHTML = '?'
    }

    if (blockInFocus !== -1) {
      temp[blockInFocus].style.border = '1px solid black'
      blockInFocus = -1
    }

    restart.hidden = true
    run(temp, paragraf, restart, nrOfBlocks)
  })

  /**
   * Function is called when a user presses a keyboard key. It checks which key is pressed and acts accordingly.
   *
   * @param {Event} event a key is pressed.
   */
  function keyDownHandler (event) {
    if (document.body.lastChild === memoryWindow) {
      if (blockInFocus !== -1) {
        temp[blockInFocus].style.border = '1px solid black'
      }

      if (event.keyCode === 39) {
        console.log('Right is pressed')
        if (blockInFocus === -1) {
          blockInFocus = 0
        } else {
          if (nrOfBlocks > 4) {
            if (blockInFocus % 4 !== 3) { blockInFocus++ }
          } else {
            if (blockInFocus % 2 !== 1) { blockInFocus++ }
          }
        }
      } else if (event.keyCode === 37) {
        console.log('Left is pressed')
        if (blockInFocus === -1) {
          blockInFocus = 0
        } else {
          if (nrOfBlocks > 4) {
            if (blockInFocus % 4 !== 0) { blockInFocus-- }
          } else {
            if (blockInFocus % 2 !== 0) { blockInFocus-- }
          }
        }
      } else if (event.keyCode === 40) {
        console.log('Down is pressed')
        if (blockInFocus === -1) {
          blockInFocus = 0
        } else {
          if (nrOfBlocks === 16) {
            if (Math.floor(blockInFocus / 4) !== 3) { blockInFocus += 4 }
          } else if (nrOfBlocks === 8) {
            if (Math.floor(blockInFocus / 4) !== 1) { blockInFocus += 4 }
          } else {
            if (Math.floor(blockInFocus / 2) !== 1) { blockInFocus += 2 }
          }
        }
      } else if (event.keyCode === 38) {
        console.log('Up is pressed')
        if (blockInFocus === -1) {
          blockInFocus = 0
        } else {
          if (nrOfBlocks > 4) {
            if (Math.floor(blockInFocus / 4) !== 0) { blockInFocus -= 4 }
          } else {
            if (Math.floor(blockInFocus / 2) !== 0) { blockInFocus -= 2 }
          }
        }
      } else if (event.keyCode === 13) {
        if (blockInFocus !== -1) {
          if (temp[blockInFocus].style.pointerEvents === '') { temp[blockInFocus].click() }
        }
      }

      if (blockInFocus !== -1) { temp[blockInFocus].style.border = '2px solid orange' }
    }
  }
}

export default {
  run
}
