function run(td, paragraf, restart, blocks, memoryWindow) {
    'use strict';
    let correctGuessses = 0
    let incorrectGuesses = 0
    let nrOfBlocks = blocks;
    let hiddenBlocks = new Array(nrOfBlocks);
    let indexOfCorrectMatches = [];
    let temp = td
    let counter = 0;
    let blockInFocus = -1;
    let firstBlock;
    let secondBlock;

    document.addEventListener('keydown', keyDownHandler);

    for (let i = 0; i < nrOfBlocks; i++) {
        temp[i].onclick = function () {
            displayHidden(i);
        };
        randomizeBlocks(i);
    }



    function checkForDuplicates(nr) {
        let isDuplicate = false;
        let count = 0;

        for (let i = 0; i < nrOfBlocks; i++) {
            if (hiddenBlocks[i] === nr) {
                count++;
            }
        }
        if (count === 2) {
            isDuplicate = true;
        }
        return isDuplicate;
    }



    function randomizeBlocks(currPos) {
        let randNr = Math.floor((Math.random() * (nrOfBlocks / 2)) + 1);

        while (checkForDuplicates(randNr)) {
            randNr = Math.floor((Math.random() * (nrOfBlocks / 2)) + 1);
        }
        hiddenBlocks[currPos] = randNr;
    }



    function toggleClickable() {
        let box = temp

        for (let i = 0; i < nrOfBlocks; i++) {
            if (box[i].style.pointerEvents === 'none') {
                box[i].style.pointerEvents = '';
            } else {
                box[i].style.pointerEvents = 'none';
            }
        }
    }



    function checkMatch(currIndex) {
        if (counter === 1) {
            firstBlock = hiddenBlocks[currIndex]
            indexOfCorrectMatches.push(currIndex)
        } else if (counter === 2) {
            secondBlock = hiddenBlocks[currIndex]
            indexOfCorrectMatches.push(currIndex)

            if (firstBlock == secondBlock) {
                window.console.log('yeey a match!');

                correctGuessses++
                if (correctGuessses === nrOfBlocks / 2) {
                    won()
                }
            } else {
                window.console.log('sorry...no match');
                window.console.log('flipping back in 2 secs');

                indexOfCorrectMatches.pop()
                indexOfCorrectMatches.pop()
                incorrectGuesses++
                toggleClickable();

                window.setTimeout(function () {
                    let found;
                    for (let i = 0; i < nrOfBlocks; i++) {
                        found = false
                        for (let j = 0; j < indexOfCorrectMatches.length; j++) {
                            if (indexOfCorrectMatches[j] == i) {
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
                    toggleClickable();
                }, 2000);
            }
            counter = 0;
        }
    }



    function displayHidden(currIndex) {  // jshint ignore:line
        let currBlock = temp[currIndex]

        currBlock.innerHTML = "";
        currBlock.style.backgroundImage = "url('img/" + hiddenBlocks[currIndex] + ".png')";
        currBlock.style.backgroundSize = "contain"

        currBlock.onclick = function () {
            window.alert('You have to choose another card');
        };

        counter++;
        window.console.log('Click: ' + counter);
        checkMatch(currIndex);
    }

    function won() {
        for (let i = 0; i < nrOfBlocks; i++) {
            temp[i].hidden = true
        }
        paragraf.innerHTML = "You won!<br><br>Incorrect guesses: " + incorrectGuesses.toString()
        restart.hidden = false
    }

    restart.addEventListener('click', event => {
        paragraf.innerHTML = "Find all pairs!"
        for (let i = 0; i < nrOfBlocks; i++) {
            temp[i].hidden = false
            temp[i].style.backgroundImage = 'none'
            temp[i].innerHTML = '?'
        }

        if(blockInFocus != -1) {
            temp[blockInFocus].style.border = "1px solid black"
            blockInFocus = -1
        }

        restart.hidden = true
        run(temp, paragraf, restart, nrOfBlocks)
    })

    function keyDownHandler(event) {
        if (document.body.lastChild == memoryWindow) {
            if (blockInFocus != -1) {
                temp[blockInFocus].style.border = "1px solid black"
            }

            if (event.keyCode == 39) {
                console.log("Right is pressed")
                if (blockInFocus === -1) {
                    blockInFocus = 0
                }

                else {
                    if (nrOfBlocks > 4) {
                        if (blockInFocus % 4 === 3)
                            blockInFocus = blockInFocus
                        else
                            blockInFocus++
                    }

                    else {
                        if (blockInFocus % 2 === 1)
                            blockInFocus = blockInFocus
                        else
                            blockInFocus++
                    }
                }
            }

            else if (event.keyCode == 37) {
                console.log("Left is pressed")
                if (blockInFocus === -1) {
                    blockInFocus = 0
                }

                else {
                    if (nrOfBlocks > 4) {
                        if (blockInFocus % 4 === 0)
                            blockInFocus = blockInFocus
                        else
                            blockInFocus--
                    }

                    else {
                        if (blockInFocus % 2 === 0)
                            blockInFocus = blockInFocus
                        else
                            blockInFocus--
                    }
                }
            }

            else if (event.keyCode == 40) {
                console.log("Down is pressed")
                if (blockInFocus === -1) {
                    blockInFocus = 0
                }

                else {
                    if (nrOfBlocks === 16) {
                        if (Math.floor(blockInFocus / 4) === 3)
                            blockInFocus = blockInFocus
                        else
                            blockInFocus += 4
                    }

                    else if (nrOfBlocks === 8) {
                        if (Math.floor(blockInFocus / 4) === 1)
                            blockInFocus = blockInFocus
                        else
                            blockInFocus += 4
                    }

                    else {
                        if (Math.floor(blockInFocus / 2) === 1)
                            blockInFocus = blockInFocus
                        else
                            blockInFocus += 2
                    }
                }
            }

            else if (event.keyCode == 38) {
                console.log("Up is pressed")
                if (blockInFocus === -1) {
                    blockInFocus = 0
                }

                else {
                    if (nrOfBlocks > 4) {
                        if (Math.floor(blockInFocus / 4) === 0)
                            blockInFocus = blockInFocus
                        else
                            blockInFocus -= 4
                    }

                    else {
                        if (Math.floor(blockInFocus / 2) === 0)
                            blockInFocus = blockInFocus
                        else
                            blockInFocus -= 2
                    }
                }
            }

            else if (event.keyCode === 13) {
                if (blockInFocus != -1) {
                    if (temp[blockInFocus].style.pointerEvents == '')
                        temp[blockInFocus].click()
                }
            }

            if (blockInFocus != -1)
                temp[blockInFocus].style.border = "2px solid orange"
        }
    }
}

export default {
    run
}
