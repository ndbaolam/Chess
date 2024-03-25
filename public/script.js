var game = new Chess();
var newBoard = null;
var $status = $('#status');
var $fen = $('#fen');
var $pgn = $('#pgn');

const onDragStart = (source, piece, position, orientation) => {
    // do not pick up pieces if the game is over
    if (game.game_over()) return false;

    // only pick up pieces for the side to move
    // if ((game.turn() === 'w' && piece.search(/^b/) !== -1) ||
    //     (game.turn() === 'b' && piece.search(/^w/) !== -1)) {
    //     return false;
    // }

    // only pick up pieces for White
    if (piece.search(/^b/) !== -1) return false
}

const makeRandomMove = () => {
    const possibleMoves = game.moves();
  
    // game over
    if (possibleMoves.length === 0) return;
  
    const randomIdx = Math.floor(Math.random() * possibleMoves.length);
    game.move(possibleMoves[randomIdx]);
    newBoard.position(game.fen());
}

const AIMove = (move) => {
    //Send API
    const link = `/${move.from}/${move.to}/${move.piece}`;

    fetch(link, { method: 'PATCH'})
        .then(res => res.json())
        .then(data => {
            game.move({ from: data.from, to: data.to });
            newBoard.position(game.fen());
        })
}

const onDrop = (source, target) => {
    // see if the move is legal
    const move = game.move({
        from: source,
        to: target,
        promotion: 'q' // NOTE: always promote to a queen for example simplicity
    });

    // illegal move
    if (move === null) return 'snapback';

    //window.setTimeout(makeRandomMove, 250);
    AIMove(move);

    updateStatus();
}

// update the board position after the piece snap
// for castling, en passant, pawn promotion
const onSnapEnd = () => {
    newBoard.position(game.fen());
}

const updateStatus = () => {
    let status = '';

    let moveColor = 'White';
    if (game.turn() === 'b') {
        moveColor = 'Black';
    }

    // checkmate?
    if (game.in_checkmate()) {
        status = 'Game over, ' + moveColor + ' is in checkmate.';
    }

    // draw?
    else if (game.in_draw()) {
        status = 'Game over, drawn position';
    }

    // game still on
    else {
        status = moveColor + ' to move';

        // check?
        if (game.in_check()) {
        status += ', ' + moveColor + ' is in check';
        }
    }

    $status.html(status)
    $fen.html(game.fen())
    $pgn.html(game.pgn())
}

//Create a new 
const config = {
    draggable: true,
    dropOffBoard: 'trash',
    position: 'start',
    onDragStart: onDragStart,
    onDrop: onDrop,
    onSnapEnd: onSnapEnd,
}
newBoard = Chessboard('board', config);

updateStatus();

newBoard.start();
$('#clearBtn').on('click', () => {
    newBoard.start();
    game = new Chess();
})
//End create a new board

//Show position
const showPositionBtn = document.getElementById('showPositionBtn');
if(showPositionBtn){
    showPositionBtn.addEventListener('click', () => {
        console.log(newBoard.position());
      
        console.log(newBoard.fen());
    })
}
//End show position
