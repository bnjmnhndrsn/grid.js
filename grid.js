var Square = function($td){	
	this.$td = $td;
}

Square.prototype.classRegex = /(val-)([\S]+)/;

Square.prototype.get = function(){
	return this.$td.attr("class").match(this.classRegex)[2];
};

Square.prototype.set = function(newClass){
	oldClasses = this.$td.attr("class");
	newClasses = oldClasses.replace(this.classRegex, "$1" + newClass);
	return this.$td.attr("class", newClasses);
};

var Grid = function($table, size, initClass, callback){
	
	this.$table = $table;
	this.callback = callback;
	this.array = [];
	
	for (var i = 0; i < size; i++){
		
		var $tr = $("<tr>").appendTo($table);
		this.array[i] = []
		
		for (var j = 0; j < size; j++){
			
			closure = (function(){
				var this_i = i, this_j = j;
				
				anon = function (){ 
					callback(this_i, this_j); 
				};
				
				return anon;
			})();
			
			var color = ((i % 2 == 0) ^ (j % 2 == 1))  ? "black" : "white";
			
			var $td = $("<td>")
				.addClass(["val-" + initClass, color].join(" "))
				.click(closure)
				.appendTo($tr);

			this.array[i][j] = new Square($td);
		}
	}
};

Grid.prototype.getSquare = function(i , j){
	return this.array[i][j].get();
};

Grid.prototype.setSquare = function(i, j, newClass){
	this.array[i][j].set(newClass);
};

Grid.prototype.getBoard = function(){
	var arr = this.array.map(function(row){
		row.map(function(square){
			square.get;
		});
	});
	
	return arr;
};

Grid.prototype.setBoard = function(array){
	this.array.forEach(function(row, i){
		row.forEach(function(square, j){
			square.set(newArray[i][j])
		});
	});
};

var Box = function($box){
	this.$box = $box;
}

Box.prototype.set = function(text){
	this.$box.text(text);
}
	
$(document).ready(function(){
  var grid, game;
   

	var callback = function(i, j){
    game.makeTurn(i, j);
	};
	
	var $table = $("#container table"),
	size = 3,
	initClass = "empty";
	
	//keep global variable for now, so it can be accessed via console
	grid = new Grid($table, size, initClass, callback);
	box = new Box($("#box"));
  
  var game = new Game(grid);
  game.run(function(){});
});