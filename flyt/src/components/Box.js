import React from 'react';
import '../App.css';

const Box = (props) => {
  return (
    <div className='box' type='button' onClick={props.onClick} style={props.style}>{props.text}</div>
  )
}

export default Box