import React from 'react';
import '../App.css';

const ToggleBtn = (props) => {
    return (
        <button className='button' onClick={props.onClick} >Toggle</button>
    )
}

export default ToggleBtn;