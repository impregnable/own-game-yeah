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
        if (n >= 5 && typeof n === 'number') {
            this.state = {
                squares: Array(n).fill(0).map(() => Array(n).fill(0)),
                playerTurn: true
            };
        } else {
            throw new Error('Board\'s width can\'t be less than 5');
        }
        this.board = this.state.squares;
    }

    getCell(col,row) {
        return this.board[col][row];
    }
    equalElements(arr) {
        return !arr.some((val, i, arr) => {
            return val !== arr[0];
        });
    }
    isWinner() {
        let winner = false;
        const boardWidth = this.board.length;
        // rows
        for (let i = 0; i < boardWidth; i++) {
            // const [a,b,c] = board[i];
            // if ((a !== 0 && b !== 0 && c !== 0) && (a == b == c)) return 'equal';
            let row = this.board[i];
            if (this.equalElements(row) && row[i] !== 0) {
                winner = row[i];
                return winner;
            }
        }
        // columns
        for (let i = 0; i < boardWidth; i++) {
            let col = [];
            for (let j = 0; j < boardWidth; j++) {
                col.push(this.getCell(j,i));
            }
            if (this.equalElements(col) && col[i] !== 0) {
                winner = col[i];
                return winner;
            }
        }
        // diagonals?
        let diagonals = {first: [], second: []};
        for (let i = 0; i < boardWidth; i++) {
            diagonals.first.push(this.getCell(i,i));
            diagonals.second.push(this.getCell(boardWidth - i - 1, i))
        }
        for (let key in diagonals) {
            let val = diagonals[key];
            if (this.equalElements(val) && val[0] !== 0) {
                winner = val[0];
                return winner;
            }
        }
        // tie?
    }
    move(col, row) {
        console.log(`Move to ${col}, ${row}`);
        // const squares = this.state.squares;
        this.winner = this.isWinner(this.board);
        let certainCell = this.getCell(col,row);
        if (certainCell !== 0) return;
        this.board[col][row] = this.state.playerTurn ? 1 : 2;
        this.setState({squares: this.board, playerTurn: !this.state.playerTurn}, () => {
            const where = findWhere(this.board);
            if (where === null || this.winner) {
                setTimeout(() => console.log('end'));
            } else {
                if (!this.state.playerTurn) {
                    // AI turn with a slight delay
                    setTimeout(() => this.move(...where), 100);
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
            onClick = {(col, row) => this.winner === undefined ? this.move(col, row) : null}
        />;
    }
    render() {
        let caption = 'Still no winner';
        if (this.winner !== undefined) {
            if (this.winner === 1) {
                caption = 'Winner X';
            } else {
                caption = 'Winner O';
            }
        }

        return (
            <div>
                <div className='caption'>{caption}</div>
                <div className='lines'>{this.board.map((line, col) => {
                    return (
                        <div>
                            {line.map((cell, row) => {
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