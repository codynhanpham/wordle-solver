const readline = require('readline');

const dictionary = require('./dictionary-ranked.json');
const charList = Object.values(dictionary);


function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
};

// input an Array: ex. [a1,l2,e3,r4,t5] -> alert || (comma seperated, letter + it's position)
// input the position = 0 for wrong letters: ex. [a0,l0,e0]

// Return an array of words that don't have the input letter
function wrongLetterFilter(arrayOfArguments, arrayToFilterFrom) {
    if (arrayOfArguments[0] == '') return arrayToFilterFrom;
    return arrayToFilterFrom.filter(
        function(word) {
            for (let i=0; i<arrayOfArguments.length; i++) {
                const arr = arrayOfArguments[i].trim().split('');
                // Catch invalid input:
                if (arr.length>1 || !isNaN(arr[0])) throw 'INPUT ERROR! Please input in this format: s,h,i,t,...';

                // arr[1] is the position, so arr[1]-1 to get index!
                if (word.includes(arr[0])) return false;
            };
            return true;
        }
    );
};

// Return an array of words that have the input letter, at other position != input
function wrongPositionFilter(arrayOfArguments, arrayToFilterFrom) {
    if (arrayOfArguments[0] == '') return arrayToFilterFrom;
    return arrayToFilterFrom.filter(
        function(word) {
            for (let i=0; i<arrayOfArguments.length; i++) {
                const arr = arrayOfArguments[i].trim().split('');
                // Catch invalid input:
                if (isNaN(Number(arr[1])) || !isNaN(arr[0])) throw 'INPUT ERROR! Please input in this format: s1,h2,i3,t4,...';

                // arr[1] is the position, so arr[1]-1 to get index!
                if (!word.includes(arr[0])) return false;
                if (word.indexOf(arr[0]) == (arr[1]-1)) {
                    for (let j=arr[1]-1; j<5; j++) {
                        if (word.indexOf(arr[0], j) == (arr[1]-1)) {
                            return false;
                        };
                    };
                };
            };
            return true;
        }
    );
};

// Return an array of words that have the input letter at the input position
function correctPositionFilter(arrayOfArguments, arrayToFilterFrom) {
    if (arrayOfArguments[0] == '') return arrayToFilterFrom;
    return arrayToFilterFrom.filter(
        function(word) {
            for (let i=0; i<arrayOfArguments.length; i++) {
                const arr = arrayOfArguments[i].trim().split('');
                // Catch invalid input:
                if (isNaN(Number(arr[1])) || !isNaN(arr[0])) throw 'INPUT ERROR! Please input in this format: s1,h2,i3,t4,...';

                // arr[1] is the position, so arr[1]-1 to get index!
                if (!word.includes(arr[0])) return false;
                if (word.includes(arr[0])) {
                    let repeatLetterPOS = [];
                    for (let j=arr[1]-1; j<5; j++) {
                        if (word.indexOf(arr[0], j) == (arr[1]-1)) {
                            repeatLetterPOS.push(j);
                        };
                    };
                    if (!repeatLetterPOS.includes(arr[1]-1)) return false;
                }
            };
            return true;
        }
    );
};

function parseToArray(commaSeperatedString) {
    return commaSeperatedString.split(',');
    // ADD INPUT CLEANER LATER!
    // handling cases of trailing ',' etc.
};

// Return true if any element in the input array has at least 1 duplicate, otherwise return false
function hasDupLetter(letterArray) {
    const dupLetters = letterArray.filter((item, index) => letterArray.indexOf(item) !== index);
    if (dupLetters.length != 0) return true
    else return false;
};

function hasSpecialChar(letterArray) {
    const letterRegex = /[a-zA-Z]/;
    let regexTrue = 0;
    for (let i=0; i<letterArray.length; i++) { // go thru 5 character in each word
        if (letterRegex.test(letterArray[i])) {
            regexTrue++;
        };
    };
    if (regexTrue == letterArray.length) return false;
    return true;
};

function suggestWord(answerMatrix,guessCount) {
    // return first one in list
    if (guessCount >= 3 || answerMatrix.length <=10) {
        for (let i=0; i<answerMatrix.length; i++) { // go thru word
            if (!hasSpecialChar(answerMatrix[i])) return answerMatrix[i]
        };
    };
    // return the first one with out any duplicate letter
    for (let i=0; i<answerMatrix.length; i++) {
        if (!hasDupLetter(answerMatrix[i]) && !hasSpecialChar(answerMatrix[i])) return answerMatrix[i];
    };
    // if previous one return undefined, pick the first word without any spechial character
    for (let i=0; i<answerMatrix.length; i++) {
        if (!hasSpecialChar(answerMatrix[i])) return answerMatrix[i];
    };
};

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function newQuery(oldwrongLetterInput, oldwrongPositionInput, oldcorrectPositionInput, guessCount) {
    rl.question('What are the wrong letters? (Input as a,b,c,d,...) ', function (wrongLetterInput) {
        rl.question('Some correct letters, but at WRONG position? (Input as a1,b2,c3,...) ', function (wrongPositionInput) {
            rl.question('And correct letters, with their correct positions? (Input as a1,b2,c3,...) ', function (correctPositionInput) {
                if (oldwrongLetterInput != '') {
                    if (wrongLetterInput != '') {
                        wrongLetterInput = wrongLetterInput.concat(',', oldwrongLetterInput);
                    }
                    else {
                        wrongLetterInput = oldwrongLetterInput;
                    };
                };
                if (oldwrongPositionInput != '') {
                    if (wrongPositionInput != '') {
                        wrongPositionInput = wrongPositionInput.concat(',', oldwrongPositionInput);
                    }
                    else {
                        wrongPositionInput = oldwrongPositionInput;
                    };
                };
                if (oldcorrectPositionInput != '') {
                    if (correctPositionInput != '') {
                        correctPositionInput = correctPositionInput.concat(',', oldcorrectPositionInput);
                    }
                    else {
                        correctPositionInput = oldcorrectPositionInput;
                    };
                };

                const filteredWrongLetter = wrongLetterFilter(parseToArray(wrongLetterInput), charList);
                const filteredCorrectLetter = wrongPositionFilter(parseToArray(wrongPositionInput), filteredWrongLetter);
                const filteredPosition = correctPositionFilter(parseToArray(correctPositionInput), filteredCorrectLetter);
                // filteredPosition returns a matrix of character list.
            
                // Output
                let answers = [];
                for (let i=0; i<filteredPosition.length; i++) {
                    answers.push(getKeyByValue(dictionary,filteredPosition[i]));
                };
                console.log('Here is a list of possible words:');
                console.log(answers);

                let wordSuggestion = [getKeyByValue(dictionary,suggestWord(filteredPosition, guessCount))];
                console.log('\nSuggested word for next guess:','\t',wordSuggestion);
                console.log();
    
                // If not finished --> input again, only have to input new information
                rl.question('Need to narrow it down further? (y/N) ', function (yesNo) {
                    if (isNaN(Number(yesNo))) {
                        if (yesNo.toLowerCase() == 'yes' || yesNo.toLowerCase() == 'y') {
                            console.log('\n\nSo now let\'s do it all again!\nYou just have to add new information!\n');
                            guessCount++;
                            newQuery(wrongLetterInput, wrongPositionInput, correctPositionInput, guessCount);
                        }
                        else if (yesNo == '?') {
                            oldwrongLetterInput = '';
                            oldwrongPositionInput = '';
                            oldcorrectPositionInput = '';
                            guessCount = 1;
                            console.clear();
                            console.log('\n\t\tHere we go again, let\'s solve some Wordle problems!\n');
                            newQuery('','','',guessCount);
                        }
                        else {
                            console.log('Nice!');
                            rl.close();
                        };
                    }
                    
                    else {
                        console.log('Nice!');
                        rl.close();
                    };
                });
            });
        });
    });
};

console.log('\n\t\tHere we go again, let\'s solve some Wordle problems!\n');
let guessCount = 1;
newQuery('','','',guessCount);

rl.on('close', function () {
    process.exit(0);
});