// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

let scoringSystem1 = {
   name: "New Scrabble",
   description: "The traditional scoring system",
   scorerFunction: scrabbleScorer
};

let scoringSystem2 = {
   name: "Simple Scorer",
   description: "Each letter is worth one point",
   scorerFunction: simpleScorer
};

let scoringSystem3 = {
   name: "Vowel Bonus Scorer",
   description: "Vowels are worth 3 points, all other letters are worth 1",
   scorerFunction: vowelBonusScorer
}

const scoringAlgorithms = [scoringSystem2, scoringSystem3, scoringSystem1];

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   userInput = input.question("Let's play some scrabble! Enter a word:");
   return userInput;
}

function simpleScorer (word) {
   return word.length;
}

function vowelBonusScorer (word) {
   let array = word.toLowerCase().split("");
   let pointTotal = 0;
   for (let i = 0; i < array.length; i++) {
      if (array[i] === "a" || array[i] === "e" || array[i] === "i" || array[i] === "o" || array[i] === "u") {
         pointTotal += 3;
      }
      else {
         pointTotal++;
      }
   }
   return pointTotal;
}

function scrabbleScorer (word, pointSystem) {
   let pointTotal = 0;
   word = word.toUpperCase().split("");
   for (let i = 0; i < word.length; i++) {
      for (items in pointSystem) {
         if (word[i] === items) {
            pointTotal += pointSystem[items];
         }
      }
   }
   return pointTotal;
}



function scorerPrompt(word) {
   console.log("What scoring system would you like to use?\n\n");
   console.log("0 - Simple: One point per character");
   console.log("1 - Vowel Bonus: Vowels are worth 3 points");
   console.log("2 - Scrabble: Uses the scrabble scoring system");
   userInput = input.question("What scoring system would you like to use? ");
   if (userInput === "0") {
      console.log(`Your point total is ${simpleScorer(word)}`);
   } else if (userInput === "1") {
      console.log(`Your point total is ${vowelBonusScorer(word)}`);
   } else if (userInput === "2") {
      console.log(`Your point total is ${scrabbleScorer(word, newPointStructure)}`);
   }
};

function transform (objectOfArrays) {
   let letters = {};
   for (items in objectOfArrays) {
      for (let i = 0; i < objectOfArrays[items].length; i++) {
      letters[objectOfArrays[items][i].toLowerCase()] = Number(items);
      }
   }
   return letters;
}

let newPointStructure = transform(oldPointStructure);

function runProgram() {
   scorerPrompt(initialPrompt());
}


// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
