
//DOM elements
var displayPass = document.getElementById('display');//display password

var password_lengthEl = prompt("How many characters is your password going to be?");
var password_lowercaseEl = confirm("Do you wnat lowercase characters");
var password_uppercaseEl = confirm("Do you want uppercase charcaters");
var password_symbolEl = confirm("Do you wnat symbol charcaters (@, #, *, etc...)");
var password_numbersEl = confirm("Do you wnat numbers (0-9)");
var generate_password = document.getElementById('generate');

//put all the functions in an object
var randomFunction = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbols
};

//when button is clicked  
generate_password.addEventListener("click", function() {
    //gets all values
    var length = parseInt(password_lengthEl.valueOf());
    var passLower = password_lowercaseEl;
    var passUpper = password_uppercaseEl;
    var passSymbol = password_symbolEl;
    var passNum = password_numbersEl;

    //displays password into the textbox
    displayPass.innerText = generatePassword(passLower, passUpper , passSymbol, passNum, length);
});

//generate password functions
function generatePassword(lower, upper, symbol, number, length) {
    // 1. Initalize password variable
    // 2. filter out which DOM element is false
    // 3. loop over length, then call generator function for each type
    // 4. add final password varibale to variable and return

    var generatedPassword = '';

    var typesCount = lower + upper + symbol + number;// true = 1 so if true then add by 1

    //console.log('typeCount : ', typesCount);

    //array of object that has lower, upper, etc... as the keys
    var typesArr = [{ lower }, { upper }, { symbol }, { number }].filter
    (
        item => Object.values(item)[0] // filters if element is not true
    );

    //console.log('typeCount : ', typesArr);

    if(typesCount = 0) { //return nothing if nothing is true
        return '';
    }

    for (var i = 0; i < length; i+= typesCount) {
        typesArr.forEach(type => {
            var funcName = Object.keys(type)[0]//gets first value to get key
            //console.log('funcName: ', funcName);

            generatedPassword += randomFunction[funcName]();//depending on key name 
        });                                                 //(ex. lower, upper, etc... it will call specific functions from the object randomFunction)
    }

    console.log(typesCount);
}

//-----generator functions-----

//chooses random lowercase letter
function getRandomLower() {  

    //gets lowercase char based on its code with method .fromCharCode
    //char a = 97 and z = 122
    //26 letters in alphabet
    //chooses number between 1-26 then adds it by 97 to equal a random lowercase letter 
    //(ex. random # = 22. 22 + 97 = 119 which = w)
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

//chooses random uppercase letter
function getRandomUpper() {
    //A = 65 so instead of adding by 97 we add by 65 to each random number
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

//chooses random number
function getRandomNumber() {
    //chooses numbers 0-9 length = 10
    // 0 = 48 so we add random number by 48
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

//chooses random symbol
function getRandomSymbols() {
    //string that contains symbols for password
    const symbols= '!@#$%^&*()';

    //returns random symbol from the string symbols
    return symbols[Math.floor(Math.random() * symbols.length)];    
}


