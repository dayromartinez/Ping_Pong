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

//Clase Pelota

(function(){

    self.Ball = function(x, y, radio, board){

        this.x = x;
        this.y = y;
        this.radio = radio;
        this.board = board;
        this.speedY = 0;
        this.speedX = 3;

        board.ball = this;
        this.kind = "circle";

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

        clean: function(){
            this.contexto.clearRect(0, 0, this.board.width, this.board.height);
        },

        draw: function(){
            for (let i = this.board.elements.length - 1; i >= 0; i--) {
                var elemento = this.board.elements[i];
                draw(this.contexto, elemento); 
            }
        },

        play: function(){
            this.clean();
            this.draw();
        }
    }

    function draw(ctx, element){
        switch(element.kind){

            case "rectangle":
                ctx.fillRect(element.x, element.y, element.width, element.height);
                break;

            case "circle":
                ctx.beginPath();
                ctx.arc(element.x, element.y, element.radio, 0, 7);
                ctx.fill();
                ctx.closePath();
                break;
    
        }
    }

})();


var board = new Board(800,400);
var canvas = document.getElementById("canvas");
var bar = new Bar(20, 150, 40, 100, board);
var bar_2 = new Bar(735, 150, 40, 100, board);
var boardView = new BoardView(canvas, board);
var ball = new Ball(200, 100, 10, board);


//Se habilita la flecha de abajo del teclado para mover las barras
document.addEventListener("keydown", function(event){

    //Evento para impedir que se reinicie la página
    event.preventDefault();

    //El keycode de la flecha hacia arriba es 38
    if(event.keyCode === 38){
        bar.up();
    }

    //El keycode de la flecha hacia abajo es 40
    if(event.keyCode === 40){
        bar.down();
    }

    if(event.keyCode === 87){
        //El keycode de la tecla W es 87
        bar_2.up();
    }

    if(event.keyCode === 83){
        //El keycode de la tecla S es 83
        bar_2.down();
    }

    console.log(bar.toString());

})

window.requestAnimationFrame(controller);

function controller(){    

    boardView.play();
    //Animación para actualizar la posición de las barras con HTML5
    window.requestAnimationFrame(controller);

}