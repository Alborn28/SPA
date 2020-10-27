import memory from './modules/memory.js'
import drag from './modules/droppable.js'

const generateMemory = document.getElementById('generateMemory')
let counter = 1

generateMemory.addEventListener('click', event => { // If the user clicks the memory icon, generate a div with all the contents
  const memoryWindow = document.createElement('div')
  memoryWindow.className = 'window'
  memoryWindow.id = 'memory' + counter.toString()
  memoryWindow.draggable = 'true'

  memoryWindow.style.left = '30px'
  memoryWindow.style.top = '30px'

  const closeWindow = document.createElement('input')
  closeWindow.className = 'closeWindow'
  closeWindow.type = 'button'
  closeWindow.value = 'X'
  memoryWindow.appendChild(closeWindow)

  const memoryHeader = document.createElement('h1')
  memoryHeader.innerHTML = 'Memory'
  memoryWindow.appendChild(memoryHeader)

  const memoryParagraf = document.createElement('p')
  memoryParagraf.innerHTML = 'Please choose the size of the memory board!'
  memoryWindow.appendChild(memoryParagraf)

  const content = document.createElement('div')
  content.className = 'content'

  const size4 = document.createElement('input')
  size4.type = 'button'
  size4.value = '4'
  content.appendChild(size4)

  const size8 = document.createElement('input')
  size8.type = 'button'
  size8.value = '8'
  content.appendChild(size8)

  const size16 = document.createElement('input')
  size16.type = 'button'
  size16.value = '16'
  content.appendChild(size16)

  const restart = document.createElement('input')
  restart.type = 'button'
  restart.value = 'Restart'
  restart.hidden = 'true'
  content.appendChild(restart)
  memoryWindow.appendChild(content)

  const table = document.createElement('table')

  drag.run(memoryWindow, closeWindow) // Send the window to droppable.js which handles the dragging of windows

  /**
   * Function used to generate the memory game in the size that the user wants.
   *
   * @param {number} rows how many rows the table should have.
   * @param {number} columns how many columns the table should have.
   * @param {HTMLDivElement} content the div that the table should be placed in.
   * @returns {Array} an array of all the table cells in the table.
   */
  function generateTable (rows, columns, content) {
    const td = []

    for (let i = 0; i < rows; i++) {
      const tableRow = document.createElement('tr')
      for (let j = 0; j < columns; j++) {
        const tableCol = document.createElement('td')
        tableCol.innerHTML = '?'
        tableRow.appendChild(tableCol)
        td.push(tableCol)
      }
      table.appendChild(tableRow)
    }
    content.appendChild(table)
    return td
  }

  size4.addEventListener('click', event => {
    size4.remove()
    size8.remove()
    size16.remove()

    const td = generateTable(2, 2, content)

    memoryParagraf.innerHTML = 'Find all pairs!'
    memory.run(td, memoryParagraf, restart, td.length, memoryWindow) // Start the application
  })

  size8.addEventListener('click', event => {
    size4.remove()
    size8.remove()
    size16.remove()

    const td = generateTable(2, 4, content)

    memoryParagraf.innerHTML = 'Find all pairs!'
    memory.run(td, memoryParagraf, restart, td.length, memoryWindow) // Start the application
  })

  size16.addEventListener('click', event => {
    size4.remove()
    size8.remove()
    size16.remove()
    const td = generateTable(4, 4, content)

    memoryParagraf.innerHTML = 'Find all pairs!'
    memory.run(td, memoryParagraf, restart, td.length, memoryWindow) // Start the application
  })

  document.body.appendChild(memoryWindow)
  counter += 1 // Update the id counter
})
