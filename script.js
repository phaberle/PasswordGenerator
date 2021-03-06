// Assignment Code
var generateBtn = document.querySelector("#generate");

var Password = {};

var promptForLength = function() {
    let lengthPrompt = window.prompt("How long do you want your password (8 - 128 characters)?");
    let userAnswer = parseInt(lengthPrompt);
    if (userAnswer >= 8 && userAnswer <= 128) {
        return userAnswer;
    } else {
        window.alert("Improper inputs for password length.\nMust be a number between 8 to 128.\nTry again.");
        return false;
    }
}

/*source: https://bost.ocks.org/mike/shuffle/
 (An example of the Fisher-Yates Shuffle algorithm)*/
function mixer(array) {
    var b = array.length,
        a, c;
    while (b) {
        c = Math.floor(Math.random() * b--);
        a = array[b];
        array[b] = array[c];
        array[c] = a;
    }
    return array;
}



var charGen = function(howMany, option) {
    let prompt;
    let temp = "";
    if (option == "lc") {
        prompt = window.prompt("Do you want to include lowercase letters in your password (Y/N)?");
    } else if (option == "uc") {
        prompt = window.prompt("Do you want to include uppercase letters in your password (Y/N)?");
    } else if (option == "spec") {
        prompt = window.prompt("Do you want to include special characters in your password (Y/N)?");
    }

    let charArray = mixer(alphabet);
    let specArray = mixer(specChars);
    let resultsArray = [];
    if (prompt.toLowerCase() == "y") {
        for (let i = 0; i < howMany; i++) {
            if (option == "uc") {
                temp = charArray[i].toUpperCase();
                resultsArray.push(temp);
                Password.uc = "yes";
            } else if (option == "lc") {
                resultsArray.push(charArray[i]);
                Password.lc = "yes";
            } else if (option == "spec") {
                resultsArray.push(specArray[i]);
                Password.spec = "yes";
            }
        }
    } else {

        resultsArray.push("N/A");
    }
    return resultsArray;
}

var numGen = function(howMany) {
    let prompt = window.prompt("Do you want numbers for your password?");
    let intArray = mixer(ints);
    let resultsArray = []
    if (prompt.toLowerCase() == "y") {
        Password.int = "yes";
        for (let i = 0; i < howMany; i++) {
            resultsArray.push(intArray[i]);
        }
    } else {
        resultsArray.push("N/A");
    }
    return resultsArray;
}

var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
var specChars = ["!", "#", "$", "%", "&", "???", "(", ")", "*", "+", ",", "-", ".", "/", ":", ";", "<", "=", ">", "?", "@", "[", ", ", "]", "^", "_", "`", "{", "|", "}", "~"];
var ints = [1, 2, 3, 4, 5, 6, 7, 8, 9];

var matching = function(findFirstYes) {
    let temp = "";
    let charArray = mixer(alphabet);
    let specArray = mixer(specChars);
    let intArray = mixer(ints);
    switch (findFirstYes) {
        case 0:
            temp = charArray[0];
            break;
        case 1:
            temp = charArray[0].toUpperCase();
            break;
        case 2:
            temp = specArray[0];
            break;
        case 3:
            temp = intArray[0];
            break;
        default:
            break;
    }
    return temp;
}

var getIndex = function(array, searchTerm) {
    for (i = 0; i < array.length; i++) {
        if (array[i] == "yes") {
            return i;
        }
    }
}

// Write password to the #password input
function writePassword() {
    Password.length = promptForLength();
    if (Password.length > 0 && Password.length !== null) {
        let isPasswordLengthEven = Password.length % 2 == 0;
        let paramDistribution = Math.floor(Password.length * .25);
        if (!isPasswordLengthEven) {
            paramDistribution = paramDistribution + Password.length % 2;
        }
        Password.lowerCaseOption = charGen(paramDistribution, "lc");
        Password.lc = Password.lowerCaseOption == "N/A" ? "N/A" : Password.lc;

        Password.upperCaseOption = charGen(paramDistribution, "uc");
        Password.uc = Password.upperCaseOption == "N/A" ? "N/A" : Password.uc;

        Password.numericOption = numGen(paramDistribution);
        Password.int = Password.numericOption == "N/A" ? "N/A" : Password.int;

        Password.specCharOption = charGen(paramDistribution, "spec");
        Password.spec = Password.specCharOption == "N/A" ? "N/A" : Password.spec;

        Password.resultsArray = [].concat(Password.lowerCaseOption, Password.upperCaseOption, Password.numericOption, Password.specCharOption);
        let workingArray = [];

        //transition from Password.resultsArray to workingArray where "N/A" is removed
        for (let i = 0; i < Password.resultsArray.length; i++) {
            if (Password.resultsArray[i] != "N/A") {
                workingArray.push(Password.resultsArray[i]);
            }
        }
        let workingArrayLengthEqualsPasswordLength = workingArray.length == Password.length ? true : false;
        let userOptions = [Password.lc, Password.uc, Password.spec, Password.int];

        if (workingArrayLengthEqualsPasswordLength == false) {
            let findFirstYes = getIndex(userOptions, "yes");
            do {
                if (workingArray.length > Password.length) {
                    workingArray.shift();
                }
                if (workingArray.length < Password.length) {
                    let tempStr = matching(findFirstYes);
                    workingArray.push(tempStr);
                }
            } while (workingArray.length != Password.length);
        }

        workingArray = mixer(workingArray);
        let answer = workingArray.join("");
        var passwordText = document.querySelector("#password");
        passwordText.value = answer;
    }
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);