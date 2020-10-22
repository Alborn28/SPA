function run(td) {
    'use strict';

    let nrOfBlocks = 10;
    let hiddenBlocks = new Array(10);
    let lockedBlocks = new Array(2);
    let lockedCards = new Array(2);
    let temp = td
    let counter= 0;

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
        let randNr = Math.floor((Math.random() * 5) +1);

        while (checkForDuplicates(randNr)) {
            randNr = Math.floor((Math.random() * 5) +1);
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
            lockedCards[0] = hiddenBlocks[currIndex];
            lockedBlocks[0] = currIndex;
        } else if (counter === 2) {
            lockedCards[1] = hiddenBlocks[currIndex];
            lockedBlocks[1] = currIndex;

            if (lockedCards[0] === lockedCards[1]) {
                window.console.log('yeey a match!');
            } else {
                window.console.log('sorry...no match');
                window.console.log('flipping back in 3 secs');
                toggleClickable();

                window.setTimeout(function () {
                    for (let i = 0; i < 2; i++) {
                        for (let j = 0; j < nrOfBlocks; j++) {
                            if (hiddenBlocks[j] === lockedCards[i]) {
                                let box = temp[lockedBlocks[i]];

                                box.style.backgroundImage = 'none';
                                box.innerHTML = '?';
                                
                                for (let i = 0; i < nrOfBlocks; i++) {
                                    temp[i].onclick = function () {
                                        displayHidden(i);
                                    };
                                }
                            }
                        }
                    }
                    toggleClickable();
                }, 1000);
            }
            counter = 0;
        }
    }



    function displayHidden(currIndex) {  // jshint ignore:line
        let currBlock = temp[currIndex]

        currBlock.innerHTML = "";
        currBlock.style.backgroundImage = "url('img/"+hiddenBlocks[currIndex]+".jpg')";

        currBlock.onclick = function () {
            window.alert('You have to choose another card');
        };

        counter++;
        window.console.log('Click: ' + counter);
        checkMatch(currIndex);
    }
}

export default {
    run
}
