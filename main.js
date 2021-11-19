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
            elements.push(this.ball);
            return elements;

        }   
    }
})();

//Clase Barras
(function(){

    self.Bar = function(x, y, width, height, board){

        //Características de cada barra, como coordenadas de ubicación, ancho y alto.
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.board = board;
        //Se agrega cada barra al arreglo de barras
        this.board.bars.push(this); 
        //Esta variable le indica al canvas qué es lo que queremos dibujar. En este caso, un rectángulo   
        this.kind = "rectangle";
        this.speed = 10;

    }

    self.Bar.prototype = {

        down: function(){
            this.y += this.speed;
        },

        up: function(){
            this.y -= this.speed;
        },

        toString: function(){
            return "x: "+ this.x +" y: "+ this.y;
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

    self.BoardView.prototype = {
        draw: function(){
            for (let i = this.board.elements.length - 1; i >= 0; i--) {
                var elemento = this.board.elements[i];
                draw(this.contexto, elemento); 
            }
        }
    }

    function draw(ctx, element){
        
        if(element !== null && element.hasOwnProperty("kind")){
            switch(element.kind){

                case "rectangle":
                    ctx.fillRect(element.x, element.y, element.width, element.height);
                    break;
            }
        }
    }

})();


var board = new Board(800,400);
var canvas = document.getElementById("canvas");
var bar = new Bar(20, 150, 40, 100, board);
var bar2 = new Bar(735, 150, 40, 100, board);
var boardView = new BoardView(canvas, board);

//Se habilita la flecha de abajo del teclado para mover las barras
document.addEventListener("keydown", function(event){

    //El keycode de la flecha hacia arriba es 38
    if(event.keyCode === 38){
        bar.up();
    }

    //El keycode de la flecha hacia abajo es 40
    if(event.keyCode === 40){
        bar.down();
    }

    console.log(bar.toString());

})


//Ejecución del programa
window.addEventListener("load",main);


function main(){
    
    boardView.draw();

}