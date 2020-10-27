let itemArea

/**
 * The function allows each window to be draggable, as well as setting the correct window in focus and closing them when the user presses the X button.
 *
 * @param {HTMLDivElement} windowDiv The window of the application
 * @param {HTMLInputElement} closeWindow The X button to close the window
 */
function run (windowDiv, closeWindow) {
  'use strict'

  itemArea = windowDiv
  const droppableArea = document.getElementById('drop')

  /**
   * Called from an event listener when the dragging of a window is started. It checks which window is dragged and sets that window in focus.
   *
   * @param {Event} event a window is being dragged.
   */
  function dragStartHandler (event) {
    itemArea = document.getElementById(event.target.id)
    const style = window.getComputedStyle(event.target, null)

    document.body.removeChild(windowDiv)
    document.body.appendChild(windowDiv)

    // Remember the original position
    event.dataTransfer.setData('text/plain',
      (parseInt(style.getPropertyValue('left'), 10) - event.clientX) + ',' + (parseInt(style.getPropertyValue('top'), 10) - event.clientY)
    )

    event.dataTransfer.dropEffect = 'move'

    console.log('DRAG START')
    console.log(event)
  }

  /**
   * Called from an event listener when a window is dropped. It moves the div from the old position to the new one.
   *
   * @param {Event} event a window has stopped being dragged.
   */
  function dropHandler (event) {
    const offset = event.dataTransfer.getData('text/plain').split(',')

    itemArea.style.left = (event.clientX + parseInt(offset[0], 10)) + 'px'
    itemArea.style.top = (event.clientY + parseInt(offset[1], 10)) + 'px'

    console.log('DROP')
    console.log(event)
    event.preventDefault()
  }

  itemArea.addEventListener('dragstart', dragStartHandler)

  droppableArea.addEventListener('dragenter', (event) => {
    event.preventDefault()
  })
  droppableArea.addEventListener('dragover', (event) => {
    event.preventDefault()
  })
  droppableArea.addEventListener('drop', dropHandler)

  closeWindow.addEventListener('click', event => {
    const window = windowDiv
    window.parentNode.removeChild(window)
  })

  itemArea.addEventListener('click', event => {
    try {
      if (document.body.lastChild !== windowDiv) {
        document.body.removeChild(windowDiv)
        document.body.appendChild(windowDiv)
      }
    } catch (error) {
      console.log('Window closed')
    }
  })
}

export default {
  run
}
