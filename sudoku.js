var numSelected = null; 
var tileSelected = null; 
var errors = 0; 
var correctNumbers= 0; 
var totalNumbers = -1; 
var winSound = new Audio('win_sound.wav')
var correctSound = new Audio('correct_sound.wav')
var mistakeSound = new Audio('mistake_sound.wav')
var solution;
var board;
var easyBoard = [
    "53--7----",
    "6--195---",
    "-98----6-",
    "8---6---3",
    "4--8-3--1",
    "7---2---6",
    "-6----28-",
    "---419--5",
    "----8--79"
];

var mediumBoard = [
    "--41----7",
    "---53----",
    "8-2---5--",
    "25--1-9-6",
    "--9-5---4",
    "7-1------",
    "--6---7-9",
    "-----82--",
    "3---9-4--"
];

var hardBoard = [
    "8--1-5--3",
    "--649--2-",
    "--5---8--",
    "3--7-4--5",
    "7-------1",
    "4--6-2---",
    "--3---6--",
    "-1--5-9--",
    "2-------8"
];



var easySolution = [
    "534678912",
    "672195348",
    "198342567",
    "859761423",
    "426853791",
    "713924856",
    "961537284",
    "287419635",
    "345286179"
];

var mediumSolution = [
    "564189327",
    "197532648",
    "832476591",
    "253814976",
    "689257134",
    "741963852",
    "416325789",
    "975648213",
    "328791465"
];

var hardSolution = [
    "827165493",
    "136498527",
    "945273816",
    "398714265",
    "762589341",
    "451632789",
    "583921674",
    "614857932",
    "279346158"
];

// Function called when the page is loaded
window.onload = function() {
    setGame(easyBoard, easySolution);
    changeTheVariable1();
}
function changeTheVariable1(){
    solution = easySolution;
    board = easyBoard;
}
function changeTheVariable2(){
    solution = mediumSolution;
    board = mediumBoard;
}
function changeTheVariable3(){
   solution = hardSolution;
    board = hardBoard;
}
// Function to set up the game
function setGame(board, solutionArray){
    totalNumbers = -1;
    correctNumbers = 0;
    solution = solutionArray;
    document.getElementById("board").innerHTML = "";
    document.getElementById("errors").innerText = "0";
    errors = 0;
    document.getElementById("digits").innerHTML = "";
    for(let i = 1; i <=9; i++){
        //<div id = "1" class = "number">1</div>
        let number = document.createElement("div");
        number.id = i
        number.innerText = i;
        number.addEventListener("click", selectNumber);
        number.classList.add("number");
        document.getElementById("digits").appendChild(number);
    } 
    //board 9x9
    for(let r = 0; r<9; r++){
        for(let c = 0; c<9; c++){
            if (easyBoard[r][c] === "-") {
                totalNumbers++;
            }
            let tile = document.createElement("div");    
            tile.id = r.toString() + "-" + c.toString();

            if(board[r][c] != "-"){
                tile.innerText = board[r][c];
                tile.classList.add("tile-start")
            }
            if(r == 2 || r == 5){
                tile.classList.add("horizontal-line")
            }
            if(c == 2 || c == 5){
                tile.classList.add("vertical-line")
            }
            tile.addEventListener('click', selectTile)
            tile.classList.add("tile");
            document.getElementById("board").append(tile);
        }
    }
}
// Function for selecting a number
function selectNumber(){
    if(numSelected != null){
    numSelected.classList.remove("number-selected");
    }
    numSelected = this;
    numSelected.classList.add("number-selected");
}
// Function for selecting a tile
function selectTile(){
    if(numSelected){
        if(this.innerText != ""){
            return;
        }
        // "0-0", "0-1", 
        let coords = this.id.split("-"); // [0, 0]
        let r = parseInt(coords[0]);
        let c = parseInt(coords[1]);
        // Check for a match with the solution and handle errors
        if(solution[r][c] == numSelected.id && board[r][c] === "-"){
            correctSound.play();
            this.innerText = numSelected.id;
            correctNumbers++;
            console.log("correctNumbers:", correctNumbers);
            console.log("totalNumbers:", totalNumbers);
            if(correctNumbers === totalNumbers){
                displayVictoryMessage();
            }
        }
        else{
            mistakeSound.play();
            errors+=1;
            document.getElementById("errors").innerText = errors;
        }
    }
}
// Function to display victory message
function displayVictoryMessage() {
    winSound.play();
    alert("YOU WIN!!! Number of mistakes: " + errors)
}