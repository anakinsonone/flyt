import React from 'react';
import Box from './components/Box';
import Button from './components/Button';
import ToggleBtn from './components/ToggleBtn';
import { useState, useEffect } from 'react';

import './App.css';

const App = () => {
  const [boxes, setBoxes] = useState([]);
  const [selectedBox, setSelectedBox] = useState();
  const [toggle, setToggle] = useState(false);
  const incrementPix = 10;

  const findMaxId = () => {
    if (boxes.length > 0) {
      return boxes[boxes.length - 1].id;
    }

    return 0;
  }

  function addBox() {
    const newBoxes = [...boxes, {
      id: findMaxId() + 1,
      top: 0,
      left: 0,
    }]

    setBoxes(newBoxes);
  }

  function selectBox(id) {
    setSelectedBox(id);
  }

  const moveBox = (dir) => {
    const newBoxes = boxes.map(box => {
      if (box.id === selectedBox) {
        const newBox = { ...box };
        switch (dir) {
          case 'up': {
            newBox.top = newBox.top - incrementPix >= 0 ? newBox.top - incrementPix : 0;
            break;
          }
          case 'down': {
            newBox.top = newBox.top + incrementPix <= 470 ? newBox.top + incrementPix : 470
            break;
          }
          case 'left': {
            newBox.left = newBox.left - incrementPix >= 0 ? newBox.left - incrementPix : 0
            break;
          }
          case 'right': {
            newBox.left = newBox.left + incrementPix <= 770 ? newBox.left + incrementPix : 770
            break;
          }
          default: break;
        }

        return newBox;
      }
      return box
    })

    setBoxes(newBoxes);
  }

  function deleteBox() {
    const newBoxes = boxes.filter(box =>
      box.id !== selectedBox
    )

    setBoxes(newBoxes);
  }

  const onKeyPress = (e) => {
    if (!toggle) return;
    switch (e.code) {
      case 'ArrowUp': moveBox('up');
        break;
      case 'ArrowDown': moveBox('down');
        break;
      case 'ArrowLeft': moveBox('left');
        break;
      case 'ArrowRight': moveBox('right');
        break;
      case 'Delete': deleteBox();
        break;
      default:
        break;
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', onKeyPress);
    return () => {
      document.removeEventListener('keydown', onKeyPress);
    }
  }
  )

  return (
    <div className='app' >
      <div style={{ margin: `1px` }}>
        <Button onClick={addBox} />
        <ToggleBtn style={{ backgroundColor: toggle ? "#76b852" : "#DC281E" }} onClick={() => { setToggle(!toggle) }} />
      </div>
      <div className='container'>
        {boxes.map((item) => (
          <Box
            onClick={(() => {
              selectBox(item.id);
            })}
            key={item.id}
            text={item.id}
            style={{
              backgroundColor: selectedBox === item.id ? "#fe8c00" : "#38ef7d",
              zIndex: item.id,
              top: `${item.top}px`,
              left: `${item.left}px`
            }}
          />))}
      </div>
    </div>
  )
}

export default App;