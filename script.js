var mainGrid = document.getElementById("main-grid");

var selectedCells = document.getElementsByClassName(" selected-cell");

var testGrid = [
    "4-6--8-73",
    "892--7---",
    "---4-----",
    "--9----3-",
    "--8---6-5",
    "----34---",
    "-8------4",
    "----5--29",
    "-----28-6"
]

function generateCells() {
    for (var rowN = 1; rowN <= 9; rowN++) {
        for (var columnN = 1; columnN <= 9; columnN++) {

            //create cell element
            var gridCellElement = document.createElement("div");
            gridCellElement.className = "grid-cell cell-" + rowN + "-" + columnN;

            //attach event listener for selecting cells
            gridCellElement.addEventListener("mousedown", mouseDownOnCell);
            gridCellElement.addEventListener("mouseenter", mouseIntoCell);

            //block border
            gridCellElement.className = "grid-cell cell-" + rowN + "-" + columnN;
            if (columnN == 1 || columnN == 4 || columnN == 7) {

                gridCellElement.className += " block-border-l";

            }

            if (columnN == 3 || columnN == 6 || columnN == 9) {

                gridCellElement.className += " block-border-r";

            }

            if (rowN == 1 || rowN == 4 || rowN == 7) {

                gridCellElement.className += " block-border-u";

            }

            if (rowN == 3 || rowN == 6 || rowN == 9) {

                gridCellElement.className += " block-border-b";
                
            }

            //create digit span
            var digitEnter = document.createElement("span");
            digitEnter.className = "digit-entered";

            //create corner note element
            var cellNoteCorners = document.createElement("div");
            cellNoteCorners.className = "cell-note-corners";

            //create and append corner note digits elements
            for (var cornerNoteN = 0; cornerNoteN < 4; cornerNoteN++) {
                var cornerNoteDigit = document.createElement("span");
                cornerNoteDigit.className = "cell-note-corners-digit note-" + cornerNoteN;
                cellNoteCorners.appendChild(cornerNoteDigit);
            }

            //create center note element
            var cellNoteCenter = document.createElement("span");
            cellNoteCenter.className = "cell-note-center"

            //append digit enter span to grid cell element
            gridCellElement.appendChild(digitEnter);

            //append corner and center note elements to cell element
            gridCellElement.appendChild(cellNoteCorners);
            gridCellElement.appendChild(cellNoteCenter);

            //append entire cell to grid
            mainGrid.appendChild(gridCellElement);
        }
    }
}

function setElementsSize() {
    var windowWidth = window.visualViewport.width;
    var windowHeight = window.visualViewport.height;

    //set grid width and height
    //if window is landscape or square
    var gridWidth;
    var gridHeight; 
    
    if (windowHeight <= windowWidth) {

        //height of grid is relative to window height
        gridHeight = windowHeight * .7;
        
    //if window is portrait
    } else {

        //height of grid is relative to window width
        gridHeight = windowWidth * .7;

    }

    //make it a square
    gridWidth = gridHeight; 

    //grid width and height
    var cellGridSideLength = gridWidth / 9;

    //cell width and height
    var cellSideLength = cellGridSideLength * .98;
    
    //cell border width
    var cellBorderWidth = cellGridSideLength * .02;

    //block cell border width
    var blockBorderWidth = cellBorderWidth * 2;

    //cell font size
    var cellFontSize = cellGridSideLength * .65;

    //note corner gaps
    var cornerNoteGapSizeY = cellGridSideLength * .35;
    var cornerNoteGapSizeX = cellGridSideLength * .5;

    //corner note grid sizes
    var cornerNoteSizeX = cellSideLength * .15;
    var cornerNoteSizeY = cellSideLength * .25;

    //note font size
    var cellNoteSize = cellFontSize * .3;



    //set body length and width to viewport
    document.body.style.width = `${windowWidth}px`;
    document.body.style.height = `${windowHeight}px`;
    
    //set grid width and height to main-grid
    mainGrid.style.width = `${gridWidth}px`;
    mainGrid.style.height = `${gridHeight}px`;

    //set cell grid width and height;
    mainGrid.style.gridTemplateColumns = `${cellGridSideLength}px ${cellGridSideLength}px ${cellGridSideLength}px ${cellGridSideLength}px ${cellGridSideLength}px ${cellGridSideLength}px ${cellGridSideLength}px ${cellGridSideLength}px ${cellGridSideLength}px`;
    mainGrid.style.gridTemplateRows = `${cellGridSideLength}px ${cellGridSideLength}px ${cellGridSideLength}px ${cellGridSideLength}px ${cellGridSideLength}px ${cellGridSideLength}px ${cellGridSideLength}px ${cellGridSideLength}px ${cellGridSideLength}px`;

    //set cell div width and height
    
    //set individual cells
    var currentCell;
    for (var i = 0; i < 81; i++) {
        currentCell = document.getElementsByClassName("grid-cell")[i];

        //set width and height of current cell
        currentCell.style.width = `${cellSideLength}px`;
        currentCell.style.height = `${cellSideLength}px`;
        
        //set border width
        currentCell.style.border = `${cellBorderWidth}px solid gray`;

        //set block border widths
        mainGrid.style.border = `${blockBorderWidth}px solid black`
        if (currentCell.className.includes("block-border-u")) {
            currentCell.style.borderTop = `${blockBorderWidth}px solid black`;
        }

        if (currentCell.className.includes("block-border-r")) {
            currentCell.style.borderRight = `${blockBorderWidth}px solid black`;
        }

        if (currentCell.className.includes("block-border-b")) {
            currentCell.style.borderBottom = `${blockBorderWidth}px solid black`;
        }

        if (currentCell.className.includes("block-border-l")) {
            currentCell.style.borderLeft = `${blockBorderWidth}px solid black`;
        }

        //set cell text size
        currentCell.style.fontSize = `${cellFontSize}px`;

        //only if there is not a given digit there
        if (currentCell.getElementsByClassName("cell-note-corners")[0] != undefined) {
            //set gaps of corner notes
            currentCell.getElementsByClassName("cell-note-corners")[0].style.gridColumnGap = `${cornerNoteGapSizeX}px`;
            currentCell.getElementsByClassName("cell-note-corners")[0].style.gridRowGap = `${cornerNoteGapSizeY}px`;

            //set size of grid that contains corner notes
            currentCell.getElementsByClassName("cell-note-corners")[0].style.gridTemplateColumns = `${cornerNoteSizeX}px ${cornerNoteSizeX}px`;
            currentCell.getElementsByClassName("cell-note-corners")[0].style.gridTemplateRows = `${cornerNoteSizeY}px ${cornerNoteSizeY}px`;

            //set note text size (corner and center)
            currentCell.getElementsByClassName("cell-note-corners")[0].style.fontSize = `${cellNoteSize}px`;
            currentCell.getElementsByClassName("cell-note-center")[0].style.fontSize = `${cellNoteSize}px`;
        }
    }
}

function generatePuzzle(puzzle) {
    var givenPuzzle = puzzle
    for (var r = 1; r <= 9; r++) {
        for (var c = 1; c <= 9; c++) {
            if (givenPuzzle[r - 1].charAt(c - 1) != '-') {
                document.getElementsByClassName("cell-" + r + "-" + c)[0].innerHTML = givenPuzzle[r - 1].charAt(c - 1);
                document.getElementsByClassName("cell-" + r + "-" + c)[0].className += " given-digit digit-filled";
            }
        }
    }
}

//sets given cell to selected
function selectCell(r, c) {
    var selectedCell = document.getElementsByClassName("cell-" + r + "-" + c)[0];
    if (selectedCell.className.includes(" selected-cell")) { 
        return; 
    }
    selectedCell.className += " selected-cell";
}

function deselectCell(r, c) {
    var deselectedCell = document.getElementsByClassName("cell-" + r + "-" + c)[0];
    deselectedCell.className = deselectedCell.className.replace(" selected-cell", "");
}

function deselectAllCells() {
    var initialLength = selectedCells.length;
    for (var i = 0; i < initialLength; i++) {
        selectedCells[0].className = selectedCells[0].className.replace(" selected-cell", "");
    }
}


var mousePressedDown = false;
var addSelectMode = true;
//ATTACH TO ONLY CELL ELEMENTS
function mouseDownOnCell(event) {
    mousePressedDown = true;
    var r = this.classList[1].charAt(5);
    var c = this.classList[1].charAt(7);
                
    if (event.ctrlKey) {
        if (this.className.includes(" selected-cell")) {
            addSelectMode = false;
            deselectCell(r, c);
            return;
        }
        addSelectMode = true;
        selectCell(r, c);
        return;
    }

    deselectAllCells();
    selectCell(r, c);
    addSelectMode = true;
}

function mouseUp(event) {
    mousePressedDown = false;
}

//multiple/drag select

function mouseIntoCell(event) {
    var r = this.classList[1].charAt(5);
    var c = this.classList[1].charAt(7);

    if (mousePressedDown) {
        if (!addSelectMode) {
            deselectCell(r, c);
            return;
        }
        selectCell(r, c);
        return;
    }
}

//can be added to anything
function keyPressed(event) {
    
    if ((event.code.includes("Digit") && parseInt(event.code.charAt(5)) != 0) || (event.code.includes("Numpad") && parseInt(event.code.charAt(6)) != 0) && !isNaN(parseInt(event.code.charAt(6)))) {

        //turn special characters into digits
        var enteredDigit = event.key;
        if (event.key == "!" || event.key == "End") { enteredDigit = 1; }
        if (event.key == "@" || event.key == "ArrowDown") { enteredDigit = 2; }
        if (event.key == "#" || event.key == "PageDown") { enteredDigit = 3; }
        if (event.key == "$" || event.key == "ArrowLeft") { enteredDigit = 4; }
        if (event.key == "%" || event.key == "Clear") { enteredDigit = 5; }
        if (event.key == "^" || event.key == "ArrowRight") { enteredDigit = 6; }
        if (event.key == "&" || event.key == "Home") { enteredDigit = 7; }
        if (event.key == "*" || event.key == "ArrowUp") { enteredDigit = 8; }
        if (event.key == "(" || event.key == "PageUp") { enteredDigit = 9; }
        if (event.shiftKey || event.ctrlKey) {
            //corner note
            if (event.shiftKey) {

                for (var i = 0; i < selectedCells.length; i++) {
                    if (!selectedCells[i].className.includes(" given-digit")) {

                        //delete entered digit and show notes if there is one
                        selectedCells[i].getElementsByClassName("digit-entered")[0].innerHTML = '';
                        selectedCells[i].getElementsByClassName("cell-note-center")[0].style.visibility = "visible";
                        selectedCells[i].getElementsByClassName("cell-note-corners")[0].style.visibility = "visible";

                        //get all corner note digits
                        var cornerNotes = [];
                        for (var j = 0; j < 4; j++) {
                            if (!isNaN(parseInt(selectedCells[i].getElementsByClassName("cell-note-corners-digit")[j].innerHTML))) {
                                cornerNotes[j] = parseInt(selectedCells[i].getElementsByClassName("cell-note-corners-digit")[j].innerHTML);
                            }
                        }

                        //do stuff with it
                        //if already entered digit, delete the digit
                        if (cornerNotes.indexOf(enteredDigit) != -1) {
                            cornerNotes.splice(cornerNotes.indexOf(enteredDigit), 1);
                            
                        }
                        
                        //add note if empty
                        else if (cornerNotes.length < 4) {
                            cornerNotes.push(enteredDigit);
                        } else {
                            cornerNotes[3] = enteredDigit;
                        }

                        //sort from low to high, then set elements to array
                        cornerNotes.sort();
                        //set elements, if array value at index is undefined, set it to blank;
                        for (var j = 0; j < 4; j++) {
                            if (cornerNotes[j] == undefined) {
                                selectedCells[i].getElementsByClassName(" cell-note-corners-digit")[j].innerHTML = ''; 
                            } else {
                                selectedCells[i].getElementsByClassName(" cell-note-corners-digit")[j].innerHTML = cornerNotes[j]; 
                            }
                        }

                    }
                }
            }

            //center note add
            if (event.ctrlKey) {
                event.preventDefault();
                for (var i = 0; i < selectedCells.length; i++) {

                    if (!selectedCells[i].className.includes(" given-digit")) {
                        //delete entered digit and show notes if there is one
                        selectedCells[i].getElementsByClassName("digit-entered")[0].innerHTML = '';
                        selectedCells[i].getElementsByClassName("cell-note-center")[0].style.visibility = "visible";
                        selectedCells[i].getElementsByClassName("cell-note-corners")[0].style.visibility = "visible";

                        if (!selectedCells[i].getElementsByClassName("cell-note-center")[0].innerHTML.includes(enteredDigit)) {
                            selectedCells[i].getElementsByClassName("cell-note-center")[0].innerHTML += enteredDigit;
                        }
                        
                        //if selected cell has the entered note, delete
                        else if (selectedCells[i].getElementsByClassName("cell-note-center")[0].innerHTML.includes(enteredDigit)) {
                            selectedCells[i].getElementsByClassName("cell-note-center")[0].innerHTML = selectedCells[i].getElementsByClassName("cell-note-center")[0].innerHTML.replace(enteredDigit, '');
                        }

                        //array for sorting digits into numerical order
                        var centerNoteDigits = selectedCells[i].getElementsByClassName("cell-note-center")[0].innerHTML.split("");
                        centerNoteDigits.sort();
                        
                        //set center note digits to array
                        selectedCells[i].getElementsByClassName("cell-note-center")[0].innerHTML = '';
                        for (var o = 0; o < centerNoteDigits.length; o++) {
                            selectedCells[i].getElementsByClassName("cell-note-center")[0].innerHTML += centerNoteDigits[o];
                        }
                    }   
                }
            }
            return;
        }

        for (var i = 0; i < selectedCells.length; i++) {
            if (!selectedCells[i].className.includes(" given-digit")) {
                selectedCells[i].getElementsByClassName("digit-entered")[0].innerHTML = enteredDigit;
                selectedCells[i].getElementsByClassName("cell-note-center")[0].style.visibility = "hidden";
                selectedCells[i].getElementsByClassName("cell-note-corners")[0].style.visibility = "hidden";
                for (var k = 0; k < 4; k++) {
                    selectedCells[i].getElementsByClassName("cell-note-corners-digit")[k] = '';
                }
            }
        }
    }

    if (event.key == "Backspace") {
        for (var i = 0; i < selectedCells.length; i++) {
            if (!selectedCells[i].className.includes(" given-digit")) {
                //if deleting an entered digit then make the notes visible again
                if (selectedCells[i].getElementsByClassName("digit-entered")[0].innerHTML != '') {
                    selectedCells[i].getElementsByClassName("digit-entered")[0].innerHTML = '';
                    selectedCells[i].getElementsByClassName("cell-note-center")[0].style.visibility = "visible";
                    selectedCells[i].getElementsByClassName("cell-note-corners")[0].style.visibility = "visible";
                } else {
                    selectedCells[i].getElementsByClassName("cell-note-center")[0].innerHTML = '';
                    for (var k = 0; k < 4; k++) {
                        selectedCells[i].getElementsByClassName("cell-note-corners-digit")[k].innerHTML = '';
                    }
                    
                }
            }
        }

    }
}

//when window is loaded

generateCells(); 
setElementsSize();
generatePuzzle(testGrid);

//event listeners
window.onresize = function() {
    setElementsSize();
}

window.addEventListener("keydown", keyPressed);
window.addEventListener("mouseup", mouseUp);
