// Game Generator Functions
var Game = function(testStr){
  // if(testStr){
  //   this.gameBoard = [];
  //   this.board = testStr.split('').map(function(num) { return parseInt(num) });
  //   for(var i=0; i < this.board.length; i += 4){
  //     var rowSlice = this.board.slice(i, (i + 4));
  //     this.gameBoard.push(rowSlice);
  //   }
  //   return;
  // }
  this.gameBoard = this.generateBoard();
  this.outputToScreen();
}

Game.prototype.generateBoard = function(){
  var game = _.shuffle([2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0]),
      gameBoard = [];

  for(var i=0; i < game.length; i += 4){
    var rowSlice = game.slice(i, (i + 4));
    gameBoard.push(rowSlice);
  }
  return gameBoard;
}

// Change Game State
Game.prototype.stripZeros = function(row){
  return _.filter(row, function(cell){ return cell != 0 });
}

Game.prototype.addDuplicates = function(row){
  for(var i = 0; i < row.length; i++){
    if(row[i] === row[i+1]){
      row[i] = (row[i] * 2);
      row.splice((i+1), 1);
    }
  }
  return row;
}

Game.prototype.padRowWithZeros = function(row){
  while(row.length != 4){ row.push(0) };
  return row;
}

Game.prototype.calculateGameState = function(gameBoard){
  var newBoard = [],
      that = this;

  gameBoard.forEach(function(row){
    var noZero = that.stripZeros(row);
    var addDups = that.addDuplicates(noZero);
    var padRow = that.padRowWithZeros(addDups);
    newBoard.push(padRow);
  });
  return newBoard;
}

Game.prototype.reverseRows = function(board){
  return board.map(function(row) { return row.reverse() });
}

// Other Functions
Game.prototype.spawnNewBlock = function() {
  var randomRow = _.sample(this.gameBoard);
  var randomCell = Math.floor(Math.random() * 4);

  if (randomRow[randomCell] === 0){
    rowIdx = this.gameBoard.indexOf(randomRow);
    this.gameBoard[rowIdx][randomCell] = 2;
  } else {
    this.spawnNewBlock();
  };
}


Game.prototype.toString = function(){
  var boardStr = "";

  for(var i=0; i < this.gameArr.length; i += 4){
    var slice = this.gameArr.slice(i,(i+4)).join("");
    boardStr += (slice + "\n");
  }

  return boardStr;
}

Game.prototype.outputToScreen = function() {

    var cssElements = ["zero","one","two","three","four","five","six","seven","eight","nine","ten","eleven","twelve","thirteen","fourteen","fifteen"];

    var output = _.flatten(this.gameBoard);

    for (i = 0; i < cssElements.length; i++ ) {
      document.getElementById(cssElements[i]).innerHTML = output[i];
    }
}

Game.prototype.move = function(direction){
  var duplicateBoard = this.gameBoard;

  if(direction === 'up' || direction === 'down'){
    var transposedBoard = _.zip.apply(_, this.gameBoard);
  }

  if(direction === 'left'){
    var solution = this.calculateGameState(this.gameBoard);
  }

  if(direction === 'right'){
    var reversedBoard = this.reverseRows(this.gameBoard);
    var reversedSolution = this.calculateGameState(reversedBoard);
    var solution  = this.reverseRows(reversedSolution);
  }

  if(direction === 'up'){
    var calculateSolution = this.calculateGameState(transposedBoard);
    var solution = _.zip.apply(_, calculateSolution);
  }

  if(direction ==='down'){
    var reversedBoard = this.reverseRows(transposedBoard);
    var reversedSolution = this.calculateGameState(reversedBoard);
    var flippedBack = this.reverseRows(reversedSolution);
    var solution = _.zip.apply(_, flippedBack);
  }

  if(this.validMove(duplicateBoard, solution)){
    this.gameBoard = solution;
    this.spawnNewBlock();
    this.outputToScreen();
  }
}

Game.prototype.validMove = function(beforeMove, afterMove){
  var before = _.flatten(beforeMove).join(''),
      after = _.flatten(afterMove).join('');

  if(before === after){
    return false;
  } else {
    return true;
  }
}