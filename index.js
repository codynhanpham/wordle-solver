const readline = require('readline');

const dictionary = require('./dictionary.json');
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
                const arr = arrayOfArguments[i].split('');
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
                const arr = arrayOfArguments[i].split('');
                // Catch invalid input:
                if (isNaN(Number(arr[1])) || !isNaN(arr[0])) throw 'INPUT ERROR! Please input in this format: s1,h2,i3,t4,...';

                // arr[1] is the position, so arr[1]-1 to get index!
                if (!word.includes(arr[0]) || word.indexOf(arr[0]) == (arr[1]-1)) return false;
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
                const arr = arrayOfArguments[i].split('');
                // Catch invalid input:
                if (isNaN(Number(arr[1])) || !isNaN(arr[0])) throw 'INPUT ERROR! Please input in this format: s1,h2,i3,t4,...';

                // arr[1] is the position, so arr[1]-1 to get index!
                if (word.indexOf(arr[0]) != (arr[1]-1)) return false;
            };
            return true;
        }
    );
};

function parseToArray(commaSeperatedString) {
    return commaSeperatedString.split(',');
};

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function newQuery(oldwrongLetterInput, oldwrongPositionInput, oldcorrectPositionInput) {
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
            
                // Output
                let answers = [];
                for (let i=0; i<filteredPosition.length; i++) {
                    answers.push(getKeyByValue(dictionary,filteredPosition[i]));
                };
                console.log('Here are a list of possible words:');
                console.log(answers);
    
                // If not finished --> input again, only have to input new information
                rl.question('Need to narrow it down further? (y/N) ', function (yesNo) {
                    if (isNaN(Number(yesNo))) {
                        if (yesNo.toLowerCase() == 'yes' || yesNo.toLowerCase() == 'y') {
                            console.log('\nSo now let\'s do it all again!\nYou just have to add new information!\n');
                            newQuery(wrongLetterInput, wrongPositionInput, correctPositionInput);
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
newQuery('','','');

rl.on('close', function () {
    process.exit(0);
});