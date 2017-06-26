/**
 * Created by artem on 26.06.17.
 */

//function AILogic(props) {
// console.log(props.funcPlayerTurn, 'funcPlayerTurn');

export function findWhere(board) {
    for (let i = 0; i < board.length; i++) {
        const line = board[i];
        for (let j = 0; j < line.length; j++) {
            if (line[j] === 0) return [i,j];
        }
    }
    return null;
}

// return (
//     <div>{props.funcPlayerTurn ? 'PLAYER' : 'COMPUTER'} TURN</div>
//     <div></div>
// )
//}