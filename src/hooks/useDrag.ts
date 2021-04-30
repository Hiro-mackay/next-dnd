import { useCallback, useEffect, useState } from 'react';

const INIT_POSITION = { x: 0, y: 0 };

export const useDrag = (
  callback: (origin: { x: number; y: number }, diff: { x: number; y: number }, state: 'start' | 'move' | 'end') => void
) => {
  const [state, setState] = useState({
    isDragging: false,
    origin: INIT_POSITION,
    translation: INIT_POSITION
  });

  const handleMouseDown = useCallback(({ clientX, clientY }) => {
    setState((state) => ({
      ...state,
      isDragging: true,
      origin: { x: clientX, y: clientY }
    }));
    callback({ x: clientX, y: clientY }, { x: 0, y: 0 }, 'start');
  }, []);

  const handleMouseMove = useCallback(
    ({ clientX, clientY }) => {
      const translation = {
        x: clientX - state.origin.x + state.translation.x,
        y: clientY - state.origin.y + state.translation.y
      };

      setState((state) => ({
        ...state,
        translation
      }));
      callback(state.origin, translation, 'move');
    },
    [state.origin]
  );

  const handleMouseUp = useCallback(() => {
    setState((state) => ({
      ...state,
      isDragging: false
    }));
    callback(state.origin, state.translation, 'end');
  }, []);

  useEffect(() => {
    if (state.isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }
  }, [state.isDragging]);

  return { handleMouseDown };
};
