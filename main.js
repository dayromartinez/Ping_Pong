//Clase Elementos tablero
(function(){

    self.Board = function(width, height){

        this.width = width;
        this.height =  height;
        this.playing = false;
        this.gameOver = false;
        this.bars = [];
        this.ball = null;

    }

    self.Board.prototype = {

        get elements(){

            var elements = this.bars;
            elements.push(ball);
            return elements;

        }   
    }
})();

//Clase que construye el tablero
(function(){

    self.BoardView = function(canvas, board){

        this.canvas = canvas;
        this.canvas.width = board.width;
        this.canvas.height = board.height;
        this.board = board;
        this.contexto = canvas.getContext("2d");

    }

})();

//Ejecución del programa
window.addEventListener("load",main);


function main(){
    
    var board = new Board(800,400);
    var canvas = document.getElementById("canvas");
    var boardView = new BoardView(canvas, board);

}