# Wordle-Solver
An simple app that helps solving Wordle problems

## How to Use
*Currently the app requires a NodeJS environment, just because I wrote and tested it in Node and didn't have time to make any nice looking GUI. So CLI it is! I'll try to make a browser interface later.*

- You will need to have NodeJS installed on your device (for now). Just go to [https://nodejs.org/en/download/](https://nodejs.org/en/download/) and download NodeJS for your OS if you haven't already.
- Download this repo to your device.
- Open the terminal/command prompt and cd into the repo directory. If you are on Windows, Shift+Right-click in the folder will show the option to Open in Windows Terminal.
- Type `node index.js` to start the program.

Alternatively, if you also have Git Bash installed on your device, just double-click the `run.sh` file to run with the Git Bash terminal.

The first word in any Wordle game is just a medium to gather information about the correct word. The app will use the information following the first one to helps narrow down the correct word.

## Syntax
***If there is nothing to input for any of these field, hit enter to go to the next without adding any trailing ` ` space.***
- Fist, you'll have to input the gray (wrong) letters from your first guess as a comma separated list. For example: `l,e,r,t`.
- Hit enter without adding a trailing ` ` space.
- Put in the correct letters that are in the wrong position (yellow letters). This time, include their position from 1-5 in this format: `p1,l2,a3,n4,t5`.
- Same thing, just hit enter ~
- Lastly, plug in the correct letters that are also in their correct positions. Follow the same format as the previous step: `p1,l2,a3,n4,t5`. Hit enter!

The program will the give you a list of candidate words, roughly ranked by how frequently used the word is. The best way to get the most information out of the second guess is to chose a five-letter word that has more vowels and does not contain any duplicate letters!

The program will also ask you whether you want to further narrow the range down:

```Need to narrow it down further? (y/N) ```

Simply type `y` or `yes` to repeat the whole process again! You only need to input new information about the word. Just wanna save you some time ~

If you got the correct word, type `N`, `no` or simply just hit enter to stop and close the program.

## Example game
Let use the Wordle Archive game #221 [here](https://www.devangthakkar.com/wordle_archive/?221) as an example!

My starter word is `ALERT`, then I just have to plug the output of the game into the app like so:
```
                Here we go again, let's solve some Wordle problems!

What are the wrong letters? (Input as a,b,c,d,...) l,e,r,t
Some correct letters, but at WRONG position? (Input as a1,b2,c3,...) a1
And correct letters, with their correct positions? (Input as a1,b2,c3,...)
Here are a list of possible words:
[
  ...a buncha words here, I picked BASON.
]
Need to narrow it down further? (y/N) y

So now let's do it all again!
You just have to add new information!

What are the wrong letters? (Input as a,b,c,d,...) b,s,o,n
Some correct letters, but at WRONG position? (Input as a1,b2,c3,...) a2
And correct letters, with their correct positions? (Input as a1,b2,c3,...)
Here are a list of possible words:
[
  ...also, a buncha words here, I picked QUACK this time.
]
Need to narrow it down further? (y/N) y

So now let's do it all again!
You just have to add new information!

What are the wrong letters? (Input as a,b,c,d,...) q,u
Some correct letters, but at WRONG position? (Input as a1,b2,c3,...)
And correct letters, with their correct positions? (Input as a1,b2,c3,...) a3,c4,k5
Here are a list of possible words:
[ 'whack' ]
Need to narrow it down further? (y/N) N
```
![Wordle Archive game #221 example](https://raw.githubusercontent.com/codynhanpham/wordle-solver/main/demo.png)

## Footnote and Credits
The original dictionary the collection of 479k English words compiled by ***dwyl*** at [https://github.com/dwyl/english-words](https://github.com/dwyl/english-words)

The original dictionary is then filtered to a total of 16265 five-character words for use with Wordle-Solver.

Using the [Frequency Lists of the Most Common Words in Project Gutenberg as of 2006-04-16](https://en.wiktionary.org/wiki/Wiktionary:Frequency_lists#:~:text=of%20The%20Simpsons-,Project%20Gutenberg,-%5Bedit%5D), 4029 most common 5-character words are ranked in the [dictionary-ranked.json](https://github.com/codynhanpham/wordle-solver/blob/main/dictionary-ranked.json). Assuming Wordle puzzles are designed for the common public, this way of ranking assures the correct word appears higher in the result list.

There are some words contain special characters such as `'` or `-`. I didn't want to exclude them completely from the dictionary just in case, but you can always add them as a filter parameter when inputting `What are the wrong letters? (Input as a,b,c,d,...) `.

There is no guarantee that this dictionary contains every 5-character word! If you find a word that this dictionary does not cover, just open a new issue with such word and I will add it as soon as I can.
