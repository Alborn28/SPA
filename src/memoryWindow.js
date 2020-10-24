import memory from '/_dist_/memory.js'
import drag from '/_dist_/droppable.js'

let generateMemory = document.getElementById("generateMemory")
let counter = 1

generateMemory.addEventListener('click', event => {
    let memoryWindow = document.createElement("div")
    memoryWindow.className = "window"
    memoryWindow.id = "memory" + counter.toString()
    memoryWindow.draggable = "true"

    memoryWindow.style.left = "30px"
    memoryWindow.style.top = "30px"

    let closeWindow = document.createElement("input")
    closeWindow.className = "closeWindow"
    closeWindow.type = "button"
    closeWindow.value = "X"
    memoryWindow.appendChild(closeWindow)

    let memoryHeader = document.createElement("h1")
    memoryHeader.innerHTML = "Memory"
    memoryWindow.appendChild(memoryHeader)

    let memoryParagraf = document.createElement("p")
    memoryParagraf.innerHTML = "Please choose the size of the memory board!"
    memoryWindow.appendChild(memoryParagraf)

    let content = document.createElement("div")
    content.className = "content"

    let size4 = document.createElement("input")
    size4.type = "button"
    size4.value = "4"
    content.appendChild(size4)

    let size8 = document.createElement("input")
    size8.type = "button"
    size8.value = "8"
    content.appendChild(size8)

    let size16 = document.createElement("input")
    size16.type = "button"
    size16.value = "16"
    content.appendChild(size16)

    let restart = document.createElement("input")
    restart.type = "button"
    restart.value = "Restart"
    restart.hidden = "true"
    content.appendChild(restart)
    memoryWindow.appendChild(content)

    let table = document.createElement("table")

    drag.run(memoryWindow, closeWindow)
    
    function generateTable(rows, columns, content) {
        let td = []
        
        for(let i = 0; i < rows; i++) {
            let tableRow = document.createElement("tr")
            for(let j = 0; j < columns; j++) {
                let tableCol = document.createElement("td")
                tableCol.innerHTML = "?"
                tableRow.appendChild(tableCol)
                td.push(tableCol)
            }
            table.appendChild(tableRow)
        }
        content.appendChild(table)
        return td
    }

    size4.addEventListener("click", event => {
        size4.remove()
        size8.remove()
        size16.remove()

        let td = generateTable(2,2, content)

        memoryParagraf.innerHTML = "Find all pairs!"
        memory.run(td, memoryParagraf, restart, td.length, memoryWindow)
    })

    size8.addEventListener("click", event => {
        size4.remove()
        size8.remove()
        size16.remove()

        let td = generateTable(2,4, content)

        memoryParagraf.innerHTML = "Find all pairs!"
        memory.run(td, memoryParagraf, restart, td.length, memoryWindow)
    })

    size16.addEventListener("click", event => {
        size4.remove()
        size8.remove()
        size16.remove()
        let td = generateTable(4,4, content)

        memoryParagraf.innerHTML = "Find all pairs!"
        memory.run(td, memoryParagraf, restart, td.length, memoryWindow)
    })

    document.body.appendChild(memoryWindow)
    counter += 1
})