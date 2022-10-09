import React from 'react';
import Box from './components/Box';
import Button from './components/Button';
import ToggleBtn from './components/ToggleBtn';
import { useState, useEffect, useCallback } from 'react';

import './App.css';

const incrementPix = 10;

const App = () => {
  const [boxes, setBoxes] = useState([]);
  const [selectedBox, setSelectedBox] = useState();
  const [toggle, setToggle] = useState(false);

  const findMaxId = () => {
    if (boxes.length > 0) {
      return boxes[boxes.length - 1].id;
    }

    return 0;
  }

  function addBox() {
    // box.left = ;
    // box.top= ;
    const newBoxes = [...boxes, {
      id: findMaxId() + 1,
      top: 0,
    }]

    setBoxes(newBoxes);
  }

  function selectBox(id) {
    setSelectedBox(id);
  }

  const moveBox = useCallback((direction) => {
    switch (direction) {
      case 'up': setTop((top) => (top - incrementPix >= 0 ? top - incrementPix : 0))
        break;
      case 'down': setTop((top) => (top + incrementPix <= 470 ? top + incrementPix : 470))
        break;
      case 'left': setLeft((left) => (left - incrementPix >= 0 ? left - incrementPix : 0))
        break;
      case 'right': setLeft((left) => (left + incrementPix <= 470 ? left - incrementPix : 470))
        break;
      default: break;
    }
  }, []);

  const onKeyPress = useCallback((e) => {
    // find the box object using id from selectedBox boxes.find
    // add left and top attr 
    switch (e.code) {
      case 'ArrowUp': moveBox('up');
        break;
      case 'ArrowDown': moveBox('down');
        break;
      case 'ArrowLeft': moveBox('left');
        break;
      case 'ArrowRight': moveBox('right');
        break;
      default:
        break;
    }
  }, [moveBox])

  if (toggle) {
    useEffect(() => {
      document.addEventListener('keydown', onKeyPress);
      return () => {
        document.removeEventListener('keydown', onKeyPress);
      }
    })
  }

  return (
    <div className='app' >
      <div>
        <Button onClick={addBox} />
        <ToggleBtn onClick={() => { setToggle(!toggle) }} />
      </div>
      <div className='container'>
        {boxes.map((item, index) => (
          <Box
            onClick={(() => {
              selectBox(item.id)
            })}
            key={item.id}
            style={{ zIndex: item.id, top: index * incrementPix, left: index * incrementPix }}
          />))}
      </div>
    </div>
  )
}

export default App;