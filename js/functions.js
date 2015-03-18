var init = function(){

    var board;
    var game = new Chess();

    var onDragStart = function(source, piece, position, orientation){
        if
        (
            game.game_over() === true || (game.turn() === 'w' && piece.search(/^b/) !== -1)
            ||
            (game.turn() === 'b' && piece.search(/^w/) !== -1)
        ){
            return false;
        }
    };

    var onDrop = function (source, target){
        var move = game.move({
             from      : source
            ,to        : target
            ,promotion : 'q'
        });
        if(move === null){
            return 'snapback';
        }
        updateStatus();
    };

    var onSnapEnd = function (){
        board.position(game.fen());
    };

    var updateStatus = function (){
        var status    = '';
        var moveColor = 'Branco';
        if(game.turn() === 'b'){
            moveColor = 'Preto';
        }
        if(game.in_checkmate() === true){
            alert(moveColor + ' em check mate!');
        }
        else if(game.in_draw() === true){
            alert('Game over!');
        }
        else {
            if(game.in_check() === true){
                alert(moveColor + ' em check!');
            }
        }
    };

    var cfg = {
         draggable     : true
        ,showNotation  : false
        ,position      : 'start'
        ,moveSpeed     : 'slow'
        ,snapbackSpeed : 500
        ,snapSpeed     : 100
        ,onDragStart   : onDragStart
        ,onDrop        : onDrop
        ,onSnapEnd     : onSnapEnd
    };
    board = new ChessBoard('board', cfg);
    updateStatus();
};

$(document).ready(init);