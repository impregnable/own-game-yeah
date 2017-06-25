/**
 * Created by artem on 25.06.17.
 */
import React, { Component } from 'react';
import Board from './Board';

class Game extends Component {
    render() {
        return (
            <Board n={5} />
        )
    }
}

export default Game;