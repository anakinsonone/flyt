import React from 'react';

const Button = (props) => {
  return (
    <button className='button' type='button' onClick={props.onClick}  >Add Box</button>
  )
}

export default Button