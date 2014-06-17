//Dice-Like Random Number Generator
//Written by Josh Karli, Spring 2014
//josh.karli@gmail.com
//DLRNG version 0.1

//DEBUGGING VARS - COMMENT THESE OUT FOR NORMAL OPERATION
var rollNumber = 1;


//initialize global variables
var description = "none";

//file writer/reader
function file



//main roll function
function DLRNG(dieAmount,dieType){

    //catch invalid dieType error
    if (dieType !== 6) {//there is an error
        errorhandler("DLRNG","unknown","dieType="+dieType);
    } //sanity checks are done, now roll
    


    //also roll using built in RNG for comparison
    var roll.++.rngComparison = 
    Math.floor(Math.random()*6)+1;
};


//DLRNG error reporter
function errorhandler(failedMethod, line, description) {
    prompt("Error in method=" + failedMethod + " at line=" + line + ". Description: "+description);
};
