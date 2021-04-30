import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { useDrag } from '../hooks/useDrag';
const INIT_POSITION = { x: 0, y: 0 };
const Box = () => {
  const [state, setState] = useState({
    isDragging: false,
    origin: INIT_POSITION,
    translation: INIT_POSITION
  });
  const { handleMouseDown } = useDrag((origin, diff, state) => {
    if (state === 'start') {
      setState((prevState) => ({
        ...prevState,
        isDragging: true,
        origin: origin
      }));
    }

    if (state === 'move') {
      setState((prevState) => ({
        ...prevState,
        translation: { x: diff.x < 0 ? 0 : diff.x, y: prevState.translation.y }
      }));
    }

    if (state === 'end') {
      setState((prevState) => ({
        ...prevState,
        isDragging: false
      }));
    }
  });

  return (
    <div
      style={{
        cursor: state.isDragging ? '-webkit-grabbing' : '-webkit-grab',
        transform: `translate(${state.translation.x}px, ${state.translation.y}px)`,
        transition: state.isDragging ? 'none' : 'transform 500ms',
        zIndex: state.isDragging ? 2 : 1,
        padding: 30,
        display: 'inline-block',
        backgroundColor: 'green'
      }}
      onMouseDown={handleMouseDown}
    >
      BOX
    </div>
  );
};

export default Box;
