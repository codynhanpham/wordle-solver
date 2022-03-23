# Wordle-Solver
An simple app that helps solving Wordle problems ***(with Hard Mode ON)***

## How to Use
*Currently the app requires a NodeJS environment, just because I wrote and tested it in NodeJS and didn't have time to make any nice looking GUI. So CLI it is! I'll try to make a browser interface later. For easy access, I also bundled some standalone executable files for Windows, macOS, and Linux, in case you don't what to bother with installing NodeJS and all that jazz.*

### *Option 1:* Run a standalone executable file from the latest release
The easy and straight forward way to get the code up and running on your device is go to the [releases page](https://github.com/codynhanpham/wordle-solver/releases), find the latest release, and download the appropriate executable file for your operating system.

There is a small chance that you will receive a warning from Windows when try to open the `wordle-solver-cli-win.exe`. That's totally fine and you can just click on Run Anyway to start the program. Windows requires any `.exe` file to have a digital code certificate to be considered "safe," however, this is a project I make for fun and the certificate cost $150+ per year, so no, I won't do it.

### *Option 2:* Run the source code directly in a NodeJS environment
The intended way for the app to run is with NodeJS.

- You will need to have NodeJS installed on your device. Just go to [https://nodejs.org/en/download/](https://nodejs.org/en/download/) and download NodeJS for your OS if you haven't already.
- Download this repo to your device.
- Open the Terminal/Command Prompt/Windows Terminal and `cd` into the repo directory. If you are on Windows, Shift+Right-click in the folder will show the option to Open in Windows Terminal.
- Type `node index.js` to start the program.

Alternatively, you can also double-click either the `run.bat` file to start the program with the Windows Terminal automatically if you are on Windows, or the `run.sh` if you are on Mac and Linux.

If you have Git Bash installed on your device, double-click the `run.sh` file to run the script with the Git Bash terminal.

### *Option 3:* Run on a webpage with a nice looking, interactive, and user friendly UI, which can be easily accessed from any device without any expensive certificate on either end.
*Trust me, coming soon™.*

---

>The first word in any Wordle game is just a medium to gather information about the correct word. Some good starter words may include RADIO, CRANE, RAISE, ARISE, etc. Afterwards, the app will use the game's feedbacks to helps narrow down the correct word.

## Syntax
***If there is nothing to input for any of these fields, just hit enter to go to the next.***
- First, you'll have to input the gray (wrong) letters from your first guess as a comma separated list. For example: `l,e,r,t`.
- Hit enter to go to the next one.
- Put in the correct letters that are in the wrong position (yellow letters). This time, include their position from 1-5 in this format: `p1,l2,a3,n4,t5`.
- Same thing, just hit enter ~
- Lastly, plug in the correct letters that are also in their correct positions. Follow the same format as the previous step: `p1,l2,a3,n4,t5`. Hit enter!

The program will the give you a *list of candidate words*, roughly ranked by how frequently used the word is. It also provides a *suggested word* for your next guess. However, you can just pick anything you want, really.

The program will also ask whether you want to further narrow the range down:

```Need to narrow it down further? (y/N) ```

Simply type `y` or `yes` to repeat the whole process again! You only need to input new information about the word. Just wanna save you some time ~

If you got the correct word, type `n`, `no` or simply just hit enter to stop and close the program.

***Note:*** *The dictionary used for this app includes a lot more words than that Wordle's word bank (see [Footnote and Credits](https://github.com/codynhanpham/wordle-solver#footnote-and-credits)). As a result, some words in the result list, even the suggested word, may not be valid in Wordle. If this is the case, just choose another word!*

## Example Game
Let use the Wordle Archive game #221 [here](https://www.devangthakkar.com/wordle_archive/?221) as an example!

My starter word is `ALERT`, then I just have to plug the output of the game into the app like so:
```

                Here we go again, let's solve some Wordle problems!

What are the wrong letters? (Input as a,b,c,d,...) l,e,r,t
Some correct letters, but at WRONG position? (Input as a1,b2,c3,...) a1
And correct letters, with their correct positions? (Input as a1,b2,c3,...)
Here is a list of possible words:
[
  'hands', 'woman', 'human', 'happy', "man's", 'fancy', 'banks',
  'china', 'cabin', 'chain', 'pains', 'magic', 'basis', 'coach',
  "day's", 'madam', 'piano', 'fanny', 'wagon', "ma'am", 'bands',
  'backs', 'swamp', 'sandy', 'basin', 'panic', 'maids', 'mason',
  'daisy', 'gains', 'shady', 'bacon', 'chaos', 'pagan', 'maxim',
  'candy', 'handy', 'judas', 'canon', 'chaps', 'basic', 'chasm',
  'Mass.', 'havoc', 'gaudy', 'Lucas', 'smash', 'chaff', 'dogma',
  'mania', 'saucy', 'divan', 'dandy', 'cocoa', 'squaw', 'spasm',
  'smack', 'swans', 'Padua', 'daddy', 'paddy', 'canna', 'shack',
  'knack', 'shaky', 'oasis', 'scamp', 'khaki', 'manna', 'swain',
  'mammy', 'quack', 'Lucca', 'Mandy', 'massy', 'quasi', 'sahib',
  'fauna', 'banjo', 'nanny', 'dawns', 'whack', 'pavia', 'gavin',
  'spawn', 'comma', 'micah', 'janus', 'Samos', 'vodka', 'sambo',
  'mains', 'vapid', 'Wanda', 'spans', 'canny', 'snaps', 'bandy',
  'sonya', 'banns',
  ... 1450 more items
]

Suggested word for next guess:   [ 'hands' ]

Need to narrow it down further? (y/N) y
```

You can see the program provides you a huge list of possible words, as well as a suggestion. You can just use the suggested word, or just pick something else.

*Notice there are some words that contain special characters! Those are just happen to be "words" in the dictionary and I left them there just in case anyone need it. You can always exclude them when inputting the gray (wrong) letters the first time:*
```
What are the wrong letters? (Input as a,b,c,d,...) ',-,.
```


Next, I choose the word `BASON` as my next guess in this example.
```
So now let's do it all again!
You just have to add new information!

What are the wrong letters? (Input as a,b,c,d,...) b,s,o,n
Some correct letters, but at WRONG position? (Input as a1,b2,c3,...) a2
And correct letters, with their correct positions? (Input as a1,b2,c3,...)
Here is a list of possible words:
[
  'chaff', 'khaki', 'quack', 'Lucca', 'whack', 'micah', 'quaff',
  'huzza', 'yucca', 'champ', 'guava', 'pukka', 'pizza', 'jihad',
  'giga-', 'cuppa', 'chack', 'chaga', 'chaya', 'chaja', 'chaka',
  'chama', 'chamm', 'chaui', 'chauk', 'chaum', 'chawk', 'chazy',
  'chyak', 'chiam', 'chica', 'chufa', 'cicad', 'cycad', 'cigua',
  'cujam', 'cumay', 'cupay', 'dhava', 'diaka', 'difda', 'divia',
  'djuka', 'dumka', 'duppa', 'dwyka', 'fidac', 'fidia', 'ghazi',
  'guaka', 'guama', 'guaza', 'guiac', 'gumma', 'hypha', 'hippa',
  'huaca', 'icica', 'idaic', 'idgah', 'ijmaa', 'imaum', 'imvia',
  'jizya', 'judah', 'jumma', 'juvia', 'khadi', 'khaya', 'khaja',
  'khami', 'khuai', 'kiack', 'kyack', 'kiaki', 'kiwai', 'kwapa',
  'mckay', 'miami', 'miauw', 'phaca', 'phyma', 'pucka', 'pudda',
  'quadi', 'quaky', 'quauk', 'quawk', 'quica', 'uckia', 'umaua',
  'umiac', 'umiak', 'umiaq', 'upaya', 'upupa', 'upway', 'upwax',
  'vicia', 'vicua',
  ... 16 more items
]

Suggested word for next guess:   [ 'quack' ]

Need to narrow it down further? (y/N) y
```

Just repeat the whole thing again. I choose the suggested word `QUACK` this time.
```
So now let's do it all again!
You just have to add new information!

What are the wrong letters? (Input as a,b,c,d,...) q,u
Some correct letters, but at WRONG position? (Input as a1,b2,c3,...)
And correct letters, with their correct positions? (Input as a1,b2,c3,...) a3,c4
,k5
Here is a list of possible words:
[ 'whack', 'chack', 'kiack', 'kyack' ]

Suggested word for next guess:   [ 'whack' ]

Need to narrow it down further? (y/N) N
```

I just follow the suggested word `WHACK` and boom, that's the correct answer.

Below is a screenshot of the game if you need references.

![Wordle Archive game #221 example](https://raw.githubusercontent.com/codynhanpham/wordle-solver/main/demo.png)

## Footnote and Credits
The original dictionary is a collection of 479k English words compiled by ***dwyl*** at [https://github.com/dwyl/english-words](https://github.com/dwyl/english-words)

The original dictionary is then filtered to a total of 16265 five-character words for use with Wordle-Solver. This is way more words than the valid Wordle word list of 10657 (as of Feb. 7, 2022). A full list of valid Wordle words in alphabetical order can be found in [this](https://gist.github.com/cfreshman/cdcdf777450c5b5301e439061d29694c) report by ***cfreshman***.

Using the [Frequency Lists of the Most Common Words in Project Gutenberg as of 2006-04-16](https://en.wiktionary.org/wiki/Wiktionary:Frequency_lists#:~:text=of%20The%20Simpsons-,Project%20Gutenberg,-%5Bedit%5D), 4029 most common 5-character words are ranked in the [dictionary-ranked.json](https://github.com/codynhanpham/wordle-solver/blob/main/dictionary-ranked.json). Assuming Wordle puzzles are designed for the common public, this way of ranking assures the correct word appears higher in the result list.

There are some words contain special characters such as `'` or `-`. I didn't want to exclude them completely from the dictionary just in case, but you can always add them as a filter parameter when inputting
```
What are the wrong letters? (Input as a,b,c,d,...) 
```

Even there are more words in this app's dictionary compared to what's in the Wordle valid word list, there is no guarantee it contains every 5-character word! If you find a word that this dictionary does not cover, just open a new issue with such word and I will add it as soon as I can.
