const game = new Chess();
var newBoard = null;
var $status = $('#status');
var $fen = $('#fen');
var $pgn = $('#pgn');

const onDragStart = (source, piece, position, orientation) => {
  // do not pick up pieces if the game is over
  if (game.game_over()) return false;

  // only pick up pieces for the side to move
  if ((game.turn() === 'w' && piece.search(/^b/) !== -1) ||
      (game.turn() === 'b' && piece.search(/^w/) !== -1)) {
    return false;
  }
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

//Send data when piece is moved
const onChange = (oldPos, newPos) => {
    const newArrPos = Object.entries(newPos).sort();
    const oldArrPos = Object.entries(oldPos).sort();

    let data;

    for(let i = 0; i < newArrPos.length; i++){
        if(oldArrPos[i][0] != newArrPos[i][0]){
            data = {
                from: oldArrPos[i][0],
                to: newArrPos[i][0],
                piece: newArrPos[i][1]
            }

            console.log(data); 
            break;
        }
    }
}
//End send data when piece is moved

//Create a new 
const config = {
    draggable: true,
    dropOffBoard: 'trash',
    position: 'start',
    onDragStart: onDragStart,
    onDrop: onDrop,
    onSnapEnd: onSnapEnd,
    onChange: onChange // fires when the board position changes.
}
newBoard = Chessboard('board', config);

updateStatus();

newBoard.start();
$('#clearBtn').on('click', newBoard.start)
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

//Move piece
$('#move1Btn').on('click', () => {
    newBoard.move('e2-e4')
})
  
$('#move2Btn').on('click', () => {
    newBoard.move('d2-d4', 'g8-f6')
})
//End move piece