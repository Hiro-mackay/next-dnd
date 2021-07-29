import { MouseEventHandler, useCallback, useEffect, useState } from 'react';

const INIT_POSITION = { x: 0, y: 0 };

export const useDrag = (
  callback: (origin: { x: number; y: number }, diff: { x: number; y: number }, state: 'start' | 'move' | 'end') => void
) => {
  const state = {
    isDragging: false,
    origin: INIT_POSITION,
    translation: INIT_POSITION
  };

  const handleMouseDown: MouseEventHandler<HTMLDivElement> = ({ clientX, clientY }) => {
    state.origin = { x: clientX, y: clientY };

    callback({ x: clientX, y: clientY }, { x: 0, y: 0 }, 'start');
  };

  const handleMouseMove = ({ clientX, clientY }: MouseEvent) => {
    console.log(state);
    if (!state.isDragging) return;

    const translation = {
      x: clientX - state.origin.x + state.translation.x,
      y: clientY - state.origin.y + state.translation.y
    };

    state.translation = translation;
    callback(state.origin, translation, 'move');
  };

  const handleMouseUp = () => {
    state.isDragging = true;
    callback(state.origin, state.translation, 'end');
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return { handleMouseDown };
};
