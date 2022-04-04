// Assignment Code
var generateBtn = document.querySelector("#generate");

var Password = {};

var promptForLength = function() {
    let lengthPrompt = window.prompt("How long do you want your password (min 8 chars - max 128 chars");
    let userAnswer = parseInt(lengthPrompt);
    if (userAnswer >= 8 && userAnswer <= 128) {
        return userAnswer;
    } else {
        window.alert("Improper inputs for password length.\nMust be an integer between ranges of 8 to 128.\nTry again.");
        return false;
    }
}

var charGen = function(howMany, option) {
    let prompt;
    let temp = "";
    if (option == "lc") {
        prompt = window.prompt("Do you want to include lowercase letters in your password? (Y/N)");
    } else if (option == "uc") {
        prompt = window.prompt("Do you want to include uppercase letters in your password? (Y/N)");
    } else if (option == "spec") {
        prompt = window.prompt("Do you want to include special characters in your password? (Y/N");
    }
    let charArray = [];
    if (prompt.toLowerCase() == "y") {
        for (let index = 0; index < howMany; index++) {
            lcIndex = Math.floor(Math.random() * howMany);
            if (option == "uc") {
                temp = alphabet[lcIndex].toUpperCase();
                charArray.push(temp);
            } else if (option == "lc") {
                charArray.push(alphabet[lcIndex]);
            } else if (option == "spec") {
                charArray.push(specChars[lcIndex]);
            }
        }
    } else {
        charArray.push("N/A");
    }
    return charArray;
}

var numGen = function(howMany) {
    let prompt = window.prompt("Do you want numbers for your password?");
    let intArray = [];
    if (prompt.toLowerCase() == "y") {
        for (let index = 0; index < howMany; index++) {
            let int = Math.floor(Math.random() * 100);
            intArray.push(int);
        }
        return intArray;
    }
}

var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
var specChars = ["!", "#", "$", "%", "&", "’", "(", ")", "*", "+", ",", "-", ".", "/", ":", ";", "<", "=", ">", "?", "@", "[", ", ", "]", "^", "_", "`", "{", "|", "}", "~"];


// Write password to the #password input
function writePassword() {
    Password.length = promptForLength();
    if (Password.length > 0 && Password.length !== null) {
        let isPasswordLengthEven = Password.Length % 2 == 0;
        let paramDistribution = Math.floor(Password.length * .25);
        if (!isPasswordLengthEven) {
            paramDistribution = paramDistribution + Password.length % 2;
        }
        Password.lowerCaseOption = charGen(paramDistribution, "lc");
        Password.upperCaseOption = charGen(paramDistribution, "uc");
        Password.numericOption = numGen(paramDistribution);
        Password.specCharOption = charGen(paramDistribution, "spec");

        console.log("lc- " + Password.lowerCaseOption);
        console.log("uc- " + Password.upperCaseOption);
        console.log("int- " + Password.numericOption);
        console.log("spec- " + Password.specCharOption);
        Password.resultsArray = [];
        Password.resultsArray = concat(Password.lowerCaseOption);
        Password.resultsArray.concat(Password.upperCaseOption);
        Password.resultsArray.concat(Password.numericOption);
        Password.resultsArray.concat(Password.specCharOption);
        console.log(Password.resultsArray);

    }
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);