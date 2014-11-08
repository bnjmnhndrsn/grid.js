var Game = function(grid) {
  this.player1Mark = "x";
  this.player2Mark = "o";
  this.grid = grid;
  this.currentPlayer = "player1Mark"
};

Game.prototype.run = function() {
  this.board = new Board();
};

Game.prototype.makeTurn = function(i, j) {
  var moveMade = this.board.makeMove(i, j, this[this.currentPlayer]);
  if (moveMade) {
    var newClass = (this.currentPlayer === "player1Mark") ?  "exe" : "oh";
		console.log(this.grid);
    
    this.grid.setSquare(i, j, newClass);
      if (this.board.isWon()) {
        alert(this.board.isWon() + " wins!");
      } else {
        this.switchPlayer();
      }
  } 
  
};

Game.parseMove = function(move) {
  return move.split(",").map(function(el){
    return parseInt(el);
  });
};

Game.prototype.switchPlayer = function() {
  this.currentPlayer = (this.currentPlayer === "player1Mark" ? "player2Mark" : "player1Mark");
}