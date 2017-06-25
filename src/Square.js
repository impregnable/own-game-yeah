/**
 * Created by artem on 26.06.17.
 */
import React from 'react';

function Square(props) {
    const getDisplayText = (val) => {
        const o = {1: 'X', 2: 'O', 0: ''};
        return o[val];
    };
    return (
        <div className='sq' onClick={() => { props.onClick(props.col, props.row) }}>{getDisplayText(props.val)}</div>
    )
}


export default Square;