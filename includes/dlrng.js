/*
Dice-Like Random Number Generator (with statistical records)
Written by Josh Karli in 2014
josh.karli@gmail.com

Note: All JS not found in index.html or dlrng.js can be found in script.js.
*/


//this is the actual function called by a roll
function giveMeRandom(dNumber, floor) {
	return (Math.floor(Math.random() * dNumber) + floor);
}

//this is for comparing this custom DLRNG algorithm with standard RNG algorithm
function basicRandomRollReference(dNumber, floor) {
	return (Math.floor(Math.random() * dNumber) + floor);
}



/*
----------------------------------------------------
------------BEGIN TEST/DEBUG CODE-------------------
----------------------------------------------------
*/

//initialize & define global variables
var loadData = true; //enables loading of data from save file (disabled for debugging purposes)
var saveData = true; //enables saving of data from save file (disabled for debugging purposes)
var floor = 1; //lowest number a dice roll should return is usually 1
var description = "none"; //used in error handler (may gut this code)
var sessonList = new Array(); //list of existing game sessions
var currentSession = new Object(); //stores all properties of current game session
var currentSessionStats = new Array(); //storage array for all roll data
var globalStats = new Object(); //stores all properties of global game stats (calculated on demand)


//DEBUGGING VARS - these and their references will be either replaced with other code later or deleted outright
loadData = false; //comment out to enable loading data from a file
saveData = false; //comment out to enable saving data to a file


//statistical data record file writer/reader
function readData(sessionName){
    if loadData = false {
        var loadArray = new Array (NewSession,1,1,0,0,0,0,0,0,0,0) //initialize stats with a new session  
    }
    else {
        //insert data reading code, loading data in the same order as above to loadArray
        if sessionName = null;{ //load app settings and session list
            //insert code to load settings
            //insert code to load session list
        }
        else { //simply load a session
            //insert arbitrary session load code (load to loadArray)
            //insert error handling to handle corrupted save file/data (first try to load again)
        }
    }
    //store new or loaded values to data structures
    currentSession.name= loadArray[0];
    var globalRollOdometer = loadArray[1]; //current global historical roll number
    var currentSession.rollOdometer = loadArray[2]; //current game session roll index number
    var currentSession.d2 = loadArray[3];
    var currentSession.d3 = loadArray[4];
    var currentSession.d4 = loadArray[5];
    var currentSession.d6 = loadArray[6];
    var currentSession.d8 = loadArray[7];
    var currentSession.d10 = loadArray[8];
    var currentSession.d12 = loadArray[9];
    var currentSession.d100 = loadArray[10];
}

function writeData(sessionName){
    if saveData = false {
        //nothing to do, maybe insert a popup message here saying saving is disabled
    }
    else {
        //insert data write code here
    }
}


//main roll function 
function dlrng(dNumber,floor){

    //also roll using standard/built in RNG for comparison
    basicRandomRollReference(dNumber,floor);
    
        
    }

    
};


//DLRNG error reporter - may be discarded, not yet decided
function errorhandler(failedMethod, line, description) {
    prompt("Error in method=" + failedMethod + " at line=" + line + ". Description: "+description);
};
