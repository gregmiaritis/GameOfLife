// Grigorios Miaritis Game Of Life

// Grid Size Diclarration & Near Neighbors Directions
function GOL (Size) {
    this.Size = Size;
    this.GridArea = this.CreateGrid(Size);
    this.NeDirections = [
        [-1, -1],
        [-1, 0], 
        [-1, 1], 
        [0, -1], 
        [0, 1], 
        [1, -1], 
        [1, 0], 
        [1, 1] 
    ];
}

// Register Cell's Attributes
function CellSpot (){
    Alive = false;
    CellsNeighbors = 0;
}

// Grid Creation By Row & Enabling Alive CellSpots On 2nd Column
GOL.prototype.CreateGrid = function(Size){
    var GridArea = [];
    for (var y = 0; y < Size; y++){        // Based On y-axis
        var Row = [];
        for (var x = 0; x < Size; x++) {   // Based On x-axis
            Row.push(new CellSpot());
        }
        GridArea.push(Row);
    }
    for (var y = 0; y < Size; y++) {
        for (var x = 0; x < Size; x++) {
            if (y === 1) {
                GridArea[y][x].Alive = true;
            }
        }
    }
    return GridArea;
};

// Alive Or Dead CellSpot Checker & Return .| or | To The RowSpot
GOL.prototype.print = function () {
    console.clear();
    for (var y = 0; y < this.Size; y++){
        var Row = this.GridArea[y];
        var PushedRow = "";
        for (var x = 0; x < this.Size; x++){
            var CellSearch = Row[x];
            if (CellSearch.Alive) {
                PushedRow += ".|";
            } else {
                PushedRow += " |";
            }
        }
        console.log(PushedRow);
    }
};

// Stay Inside Of The Grid
GOL.prototype.Bounds = function (row, col){
    return row >= 0 && row < this.Size && col >= 0 && col < this.Size;
};

//Rules
// If < 2 CellsNeighbors --> Dead
GOL.prototype.Under = function (row, col){
    var CellSearch = this.GridArea[row][col];
    return CellSearch.CellsNeighbors < 2;
};


// If > 3 CellsNeighbors --> Dead
GOL.prototype.Over = function (row, col){
    var CellSearch = this.GridArea[row][col];
    return CellSearch.CellsNeighbors > 3;
};


// If !Alive & 3 CellsNeighbors --> Survive
GOL.prototype.Surv = function (row, col) {
    var CellSearch = this.GridArea[row][col];
    return !CellSearch.Alive && CellSearch.CellsNeighbors === 3 ;
};

// CellSpot Updating
GOL.prototype.updateNeighbors = function (row, col){
    var CellSearch = this.GridArea[row][col];
    CellSearch.CellsNeighbors = 0;
    for(var i = 0; i < this.NeDirections.length; i++){
        var Directions = this.NeDirections[i];
        var Drow = Directions[0];
        var Dcol = Directions[1];
        if (this.Bounds(row + Drow, col + Dcol)){
            var neighbor = this.GridArea[row + Drow][col + Dcol];
            if(neighbor.Alive) {
                CellSearch.CellsNeighbors++;
            }
        }
    }
};


// CellSpot's Neighbors Updating
GOL.prototype.UpdateAll = function (){
    for(var y = 0; y < this.Size; y++){
        for(var x = 0; x < this.Size; x++){
            this.updateNeighbors(y,x);
        }
    }
};


// CellSpot Alive Or Dead Based On Scenarios
GOL.prototype.UpdatCellSpotState = function(row, col){
    var CellSearch = this.GridArea[row][col];
    if (this.Under(row,col) || this.Over(row,col)){
        CellSearch.Alive = false;
    } else if(this.Surv(row,col))  {
        CellSearch.Alive = true;
    }
};


// States Updating
GOL.prototype.UpdateStates = function (){
    for(var y = 0; y < this.Size; y++){
        for(var x = 0; x < this.Size; x++){
            this.UpdatCellSpotState(y,x);
        }
    }
};

// State Components
GOL.prototype.State = function(){
    this.print();
    this.UpdateAll();
    this.UpdateStates();
}

// Public Class
module.exports.GOL = GOL

// Start The Game & Set The Size Of The Grid
var Gol = new GOL(3);

// Loop Every 1s
var GolLoop = setInterval(function() {
    Gol.State();
}, 1000)
