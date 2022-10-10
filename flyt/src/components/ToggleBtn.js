import React from 'react';
import '../App.css';

const ToggleBtn = (props) => {
    return (
        <button className='button' onClick={props.onClick} style={props.style} >Toggle</button>
    )
}

export default ToggleBtn;