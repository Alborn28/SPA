/**
 * A function handling the svg image, for example showing new parts of the hangman when an incorrect guess is made.
 *
 * @param {number} idCounter A number added to the id to make it possible to have multiple applications running independently of eachother.
 * @returns {object} a hangman object with all its bodyparts as well as functions to show and hide them.
 */
function Hangman (idCounter) {
  'use strict'

  var hangman = {

    // Get all elements using their unique id:s
    partAsElement: {
      hill: document.getElementById('hang_hill' + idCounter),
      gallow: document.getElementById('hang_construction' + idCounter),
      body: document.getElementById('hang_body' + idCounter),
      rightarm: document.getElementById('hang_rightarm' + idCounter),
      leftarm: document.getElementById('hang_leftarm' + idCounter),
      rightleg: document.getElementById('hang_rightleg' + idCounter),
      leftleg: document.getElementById('hang_leftleg' + idCounter),
      rope: document.getElementById('hang_rope' + idCounter),
      head: document.getElementById('hang_head' + idCounter)
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

export default {
  Hangman
}
