//Send data when piece is moved
const onChange = (oldPos, newPos) => {
    const newArrPos = Object.entries(newPos).sort();
    const oldArrPos = Object.entries(oldPos).sort();

    let move;

    for(let i = 0; i < newArrPos.length; i++){
        if(oldArrPos[i][0] != newArrPos[i][0]){
            move = {
                from: oldArrPos[i][0],
                to: newArrPos[i][0],
                piece: newArrPos[i][1]
            }

            console.log(move); 
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
    onChange: onChange // fires when the board position changes.
}
let newBoard = Chessboard('board', config);
newBoard.start();
$('#clearBtn').on('click', newBoard.start)

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