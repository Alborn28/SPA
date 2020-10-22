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

    let memoryHeader = document.createElement("h1")
    memoryHeader.innerHTML = "Memory"
    memoryWindow.appendChild(memoryHeader)

    let memoryParagraf = document.createElement("p")
    memoryParagraf.innerHTML = "Find all pairs!"
    memoryWindow.appendChild(memoryParagraf)

    let content = document.createElement("div")
    content.className = "content"

    let table = document.createElement("table")
    let td = []
    
    for(let i = 0; i < 2; i++) {
        let tableRow = document.createElement("tr")
        for(let j = 0; j < 5; j++) {
            let tableCol = document.createElement("td")
            tableCol.innerHTML = "?"
            tableRow.appendChild(tableCol)
            td.push(tableCol)
        }
        table.appendChild(tableRow)
    }
    content.appendChild(table)
    memoryWindow.appendChild(content)

    document.body.appendChild(memoryWindow)

    memory.run(td)
    drag.run(memoryWindow.id)
    counter += 1
})