const fs = require('fs');
const dictionary = require('./dictionary.json');
const wordList = Object.keys(dictionary);
const charList = Object.values(dictionary); 

const text = fs.readFileSync('./freq-rank.txt', 'utf8', function(err, data){
    return data;
});

const rankFull = text.split(/\r?\n/);
console.log(rankFull.length);

let fiveletter = [];
for (let i=0; i<rankFull.length; i++) {
    if (rankFull[i].length == 5) {
        fiveletter.push(rankFull[i]);
    };
};
console.log(`Five letter count: ${fiveletter.length}`);

console.log(`wordList count: ${wordList.length}`);

let newDict = {};

for (let i=0; i<fiveletter.length; i++) {
    const index = wordList.indexOf(fiveletter[i]);
    if (index !== -1) {
        newDict[wordList[index]] = charList[index];
        
        wordList.splice(index,1);
        charList.splice(index,1);
    };
};

let newDictKey = Object.keys(newDict);
let newDictChar = Object.values(newDict);
console.log(newDictKey[0]);
console.log(newDict[newDictKey[0]]);
console.log(`Ranked: ${newDictKey.length}`);

for (let i=0; i<wordList.length; i++) {
    newDict[wordList[i]] = charList[i];
};
newDictKey = Object.keys(newDict);
newDictChar = Object.values(newDict);
console.log(newDictKey[fiveletter.length]);
console.log(newDict[newDictKey[fiveletter.length]]);

console.log(newDictKey[wordList.length-1]);
console.log(newDict[newDictKey[wordList.length-1]]);
console.log(`Finished: ${newDictKey.length}`);


// console.log(dictionary['Shrek']);

// fs.writeFile("./dictionary-ranked.json", JSON.stringify(newDict), err => {
     
//     // Checking for errors
//     if (err) throw err; 
   
//     console.log("Done writing"); // Success
// });