/**
 * Created by artem on 26.06.17.
 */

import React, { Component } from 'react';
import Square from './Square';
import { findWhere } from './AILogic';
import './Board.css';

class Board extends Component {
    constructor({ n }) {
        super();
        this.state = {
            squares: Array(n).fill(0).map(() => Array(n).fill(0)),
            playerTurn: true
        };
        // console.log(this.state.squares,'n')
    }
    getCell(board,col,row) {
        return board[col][row];
    }
    equalElements(arr) {
        return !arr.some((val, i, arr) => {
            return val !== arr[0];
        });
    }
    isWinner(board) {
        let winner = false;
        const boardWidth = board.length;
        // rows
        for (let i = 0; i < boardWidth; i++) {
            // const [a,b,c] = board[i];
            // if ((a !== 0 && b !== 0 && c !== 0) && (a == b == c)) return 'equal';
            let row = board[i];
            if (this.equalElements(row) && row[i] !== 0) {
                winner = row[i];
                return winner;
            }
        }
        // columns
        for (let i = 0; i < boardWidth; i++) {
            let col = [];
            for (let j = 0; j < boardWidth; j++) {
                col.push(this.getCell(board,j,i));
            }
            if (this.equalElements(col) && col[i] !== 0) {
                winner = col[i];
                return winner;
            }
        }
        // diagonals?
        // tie?
    }
    move(col, row) {
        // console.log(`Move to ${col}, ${row}`);
        const squares = this.state.squares;
        const winner = this.isWinner(squares);
        if (squares[col][row] !== 0) return;
        squares[col][row] = this.state.playerTurn ? 1 : 2;
        this.setState({squares: squares, playerTurn: !this.state.playerTurn}, () => {
            const where = findWhere(squares);
            if (where === null || winner) {
                setTimeout(() => console.log('end'));
            } else {
                if (!this.state.playerTurn) {

                    this.move(...where);
                }
            }
            // console.log('clicked!', squares, 'squares');
        });
    }
    renderSquare(col, row, i) {
        return <Square
            val = {i}
            col = {col}
            row = {row}
            onClick = {(col, row) => this.move(col, row)}
        />;
    }
    // AILogic() {
    //     return <AILogic funcPlayerTurn = {this.state.playerTurn} />;
    // }

    render() {
        let caption = 'Still no winner';
        if (this.isWinner(this.state.squares) !== undefined) {
            if (this.isWinner(this.state.squares) === 1) {
                caption = 'Winner X';
            } else {
                caption = 'Winner O';
            }
        }

        return (
            <div>
                {/*<div>{this.AILogic()}</div>*/}
                <div className='caption'>{caption}</div>
                <div className='lines'>{this.state.squares.map((line, col) => {
                    return (
                        <div>
                            {line.map((cell, row) => {
                                // console.log(cell, 'i');
                                return this.renderSquare(col, row, cell)
                            })}
                        </div>
                    );
                })}</div>
            </div>
        );
    }
}

export default Board;