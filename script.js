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
    lastThreeWords: [],
    waldoIndexes: [],
}


document.addEventListener('keyup',onKeyUp);

function onKeyUp (e){
    
    //updateText(e);

    //console.log(e);
    updateVowels(e.code);
    updatePunctuation(e.code);
    result.text=(textArea.value.length);
    wordCount(textArea.value);
    //console.log(findLongestWord("The quick brown fox jumped over the lazy dog"));
    result.longestWord = findLongestWord(textArea.value);
    result.shortestWord = findShortestWord(textArea.value);

    result.lastThreeWords = findLastThreeWords(textArea.value);
    //console.log("//////////", getLastWords("The lazy dog"));




}

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
            forReturn[1]="0";
            forReturn[0]="0";
    }
    else if(arr.length == 2){
        forReturn[2]=arr[arr.length-1];
        forReturn[1]=arr[arr.length-2];
        forReturn[0]="0";
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


// const temp = Object.keys(result);




