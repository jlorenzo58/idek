let textArea = document.getElementById("text");
let results = document.getElementById("results");

let result = {
    text: "", 
    vowels: {
      a: 0,
      e: 0,
      i: 0,
      o: 0,
      u: 0
    },
    punctuation: {
      period: 0,
      comma: 0,
      exclamation: 0,
      questionMark: 0
    },
    numCharacters: 0,
    numWords: 0,
    longestWord: "",
    shortestWord: "",
    lastThreeWords: ["","",""],
    waldoIndexes: [],
}





document.addEventListener('keyup',onKeyUp);

function onKeyUp (e){

    updateVowels(e.code);
    updatePunctuation(e.code);
    result.text=(textArea.value);
    result.numWords = wordCount(textArea.value);
    result.numCharacters = textArea.value.length;
    result.longestWord = findLongestWord(textArea.value);
    result.shortestWord = findShortestWord(textArea.value);

    result.lastThreeWords = getLastWords(textArea.value);

    var indices = findWaldo("waldo",textArea.value);
    result.waldoIndexes = indices;

    renderResults();
}

document.addEventListener('keydown',(e)=>{
    //console.log(e);
    if(e.code == "Backspace"){
        let tempChar = e.target.value.slice(-1);
        updateObject(tempChar);
    }


})

function updateVowels (char){
    switch(char){
        case 'KeyA': 
            result.vowels.a++; 
            console.log(result.vowels.a);
            break;
        case 'KeyE': 
            result.vowels.e++; 
            console.log(result.vowels.e);
            break;
        case 'KeyI': 
            result.vowels.i++; 
            console.log(result.vowels.i); 
            break;
        case 'KeyO': 
            result.vowels.o++; 
            console.log(result.vowels.o); 
            break;
        case 'KeyU': 
            result.vowels.u++; 
            console.log(result.vowels.u); 
            break;
    }
    return;
}

function updatePunctuation (sign){
    switch(sign){
        case 'Digit1':
            result.punctuation.exclamation++;
            console.log(result.punctuation.exclamation);
            break;
        case 'Comma':
            result.punctuation.comma++;
            console.log(result.punctuation.comma);
            break;
        case 'Slash':
            result.punctuation.questionMark++;
            console.log(result.punctuation.questionMark);
            break;
        case 'Period':
            result.punctuation.period++;
            console.log(result.punctuation.period);
            break;
    }
}

function wordCount(text) {
    return text.split(" ").length;
}

function findLongestWord(str){
    let strSplit = str.split(' ');
    let longestWord =0;
    let tempResult = "";
    for(let i=0; i<strSplit.length; i++) {
        if(strSplit[i].length>longestWord){
            longestWord=strSplit[i].length;
            tempResult = strSplit[i];
        }
    }
    return tempResult;
}

function findShortestWord(str) {
    var words = str.split(' ');
    var shortest = words.reduce((shortestWord, currentWord) => {
      return currentWord.length < shortestWord.length ? currentWord : shortestWord;
    }, words[0]);
    return shortest;
}


function getLastWords(str){
    const arr = str.split(' ');
    const forReturn =["","",""];
    if(arr.length>=3){
        forReturn[2] = arr[arr.length-1];
        forReturn[1] = arr[arr.length-2];
        forReturn[0] = arr[arr.length-3];
    }
    else if(arr.length == 1){
            forReturn[2]=arr[arr.length-1];
            forReturn[1]="";
            forReturn[0]="";
    }
    else if(arr.length == 2){
        forReturn[2]=arr[arr.length-1];
        forReturn[1]=arr[arr.length-2];
        forReturn[0]="";
    }
    else{
        return forReturn;
    }
    return forReturn;
}

function findWaldo(searchStr, str, caseSensitive) {
    let searchStrLen = searchStr.length;
    if (searchStrLen == 0) {
        return [];
    }   
    let startIndex = 0, index, indices = [];
    if (!caseSensitive) {
        str = str.toLowerCase();
        searchStr = searchStr.toLowerCase();
    }
    while ((index = str.indexOf(searchStr, startIndex)) > -1) {
        indices.push(index);
        startIndex = index + searchStrLen;
    }
    return indices;
}

function updateObject(char){
    let newChar = char.toLowerCase();
    if(newChar=='a' && result.vowels.a>=1){
        result.vowels.a--;
    }
    else if(newChar=='e' && result.vowels.e>=1){
        result.vowels.e--;
    }
    else if(newChar=='i' && result.vowels.i>=1){
        result.vowels.i--;
    }
    else if(newChar=='o' && result.vowels.o>=1){
        result.vowels.o--;
    }
    else if(newChar=='u' && result.vowels.u>=1){
        result.vowels.u--;
    }
    else if(newChar=='!' && result.punctuation.exclamation>=1){
        result.punctuation.exclamation--;
    }
    else if(newChar==',' && result.punctuation.comma>=1){
        result.punctuation.comma--;
    }
    else if(newChar=='.' && result.punctuation.period>=1){
        result.punctuation.period--;
    }
    else if(newChar=='?' && result.punctuation.questionMark>=1){
        result.punctuation.questionMark--;
    }
    else{
        return;
    }
}
let newElement = document.createElement('div');
results.append(newElement);

function renderResults(){
    newElement.innerHTML = "vowel count";
    newElement.innerHTML += "a"+ result.vowels.a;
    newElement.innerHTML += "e"+result.vowels.e;
    newElement.innerHTML += "i "+result.vowels.i;
    newElement.innerHTML += "o"+result.vowels.o;
    newElement.innerHTML += "u"+result.vowels.u;

    newElement.innerHTML += "?"+result.punctuation.questionMark;
    newElement.innerHTML += ". "+result.punctuation.period;
    newElement.innerHTML += ","+result.punctuation.comma;
    newElement.innerHTML += "!"+result.punctuation.exclamation;

    newElement.innerHTML +="///NUM OF CHARACTER :" + result.numCharacters;

    newElement.innerHTML +="///NUM OF WORDS :" + result.numWords;

    newElement.innerHTML +="///LAST THREE WORDS :" + result.lastThreeWords;

    newElement.innerHTML +="///LONGEST WORD:" + result.longestWord;

    newElement.innerHTML +="///SHORTEST WORD :" + result.shortestWord;

    newElement.innerHTML +="///WALDO INDEXES :" + result.waldoIndexes;


}