import React from 'react';
import '../App.css';

const Box = (props) => {
  return (
    <div className='box' type='button' onClick={props.onClick} style={props.style}></div>
  )
}

export default Box