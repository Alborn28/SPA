let itemArea;

function run (windowDiv, closeWindow) {
  'use strict'

  itemArea = windowDiv
  let droppableArea = document.getElementById("drop")

  function dragStartHandler(event) {
    itemArea = document.getElementById(event.target.id)
    let style = window.getComputedStyle(event.target, null)

    document.body.removeChild(windowDiv)
    document.body.appendChild(windowDiv)

    // Remember the original position
    event.dataTransfer.setData("text/plain",
        (parseInt(style.getPropertyValue("left"), 10) - event.clientX) + ',' + (parseInt(style.getPropertyValue("top"), 10) - event.clientY)
    )

    event.dataTransfer.dropEffect = "move"

    console.log("DRAG START")
    console.log(event)
  }

  function dragEndHandler(event) {
    console.log("DRAG END")
    console.log(event)
  }



  function dropHandler(event) {
    let offset = event.dataTransfer.getData("text/plain").split(',')

    itemArea.style.left = (event.clientX + parseInt(offset[0],10)) + 'px';
    itemArea.style.top = (event.clientY + parseInt(offset[1],10)) + 'px';

    console.log("DROP")
    console.log(event)
    event.preventDefault()
  }



  itemArea.addEventListener("dragstart", dragStartHandler)
  itemArea.addEventListener("dragend", dragEndHandler)

  droppableArea.addEventListener("dragenter", (event) => {
      event.preventDefault()
  })
  droppableArea.addEventListener("dragover", (event) => {
      event.preventDefault()
  })
  droppableArea.addEventListener("drop", dropHandler)

  closeWindow.addEventListener('click', event => {
      let window = windowDiv
      window.parentNode.removeChild(window) 
  })

  itemArea.addEventListener('click', event => {
    try {
      document.body.removeChild(windowDiv)
      document.body.appendChild(windowDiv)
    } 
    catch (error) {
      console.log("Window closed")
    }
  })
}

export default {
    run
}
