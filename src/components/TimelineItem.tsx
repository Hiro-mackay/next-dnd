import { CSSProperties, Dispatch, FC, SetStateAction, useRef, useState } from 'react';
import { useDrag, useDrop, XYCoord } from 'react-dnd';

const item: CSSProperties = {
  width: 200,
  height: 40,
  borderRadius: 5,
  backgroundColor: '#1e90ff',
  position: 'relative'
};

const focus: CSSProperties = {
  position: 'absolute',
  width: '100%',
  height: '100%',
  boxSizing: 'border-box',
  borderRadius: 10
};

const lineFocus: CSSProperties = {
  position: 'absolute',
  inset: '0 0 0 0',
  width: '100%',
  height: '100%',
  border: '2px solid #ffa500',
  boxSizing: 'border-box',
  borderRadius: 5,
  zIndex: 2
};

const leftFocs: CSSProperties = {
  position: 'absolute',
  backgroundColor: '#FFC666',
  borderRadius: '3px 0 0 3px',
  width: 18,
  height: 'calc(100% - 4px)',
  top: 0,
  left: 0,
  cursor: 'ew-resize',
  margin: 2,
  zIndex: 3
};
const rightFocs: CSSProperties = {
  position: 'absolute',
  backgroundColor: '#FFC666',
  borderRadius: '0px 3px 3px 0px',
  width: 18,
  height: 'calc(100% - 4px)',
  top: 0,
  right: 0,
  cursor: 'ew-resize',
  margin: 2,
  zIndex: 3
};

interface Props {
  id: string;
  width: number;
  x: number;
  y: number;
}

export const TimelineItem: FC<Props & { setter: Dispatch<SetStateAction<Props>> }> = ({ id, width, x, y, setter }) => {
  const right = useRef<HTMLSpanElement>(null);
  const left = useRef<HTMLSpanElement>(null);
  const [w, setW] = useState(width);
  const [_x, setX] = useState(x);

  const [, connectLeftDrag] = useDrag(
    () => ({
      type: 'Timeline',
      item: { id, width, x, y },
      collect: (monitor) => ({
        isDragging: monitor.isDragging()
      })
    }),
    [id, width, x, y]
  );

  const [, connectLeftDrop] = useDrop({
    accept: 'Timeline',
    hover: (target: Props, monitor) => {
      const delta = monitor.getDifferenceFromInitialOffset();
      if (!delta?.x) return;
      setX(target.x + delta.x);
      setW(target.width - delta.x);
    },
    drop: (target, monitor) => {
      const delta = monitor.getDifferenceFromInitialOffset();
      if (!delta?.x) return;
      setter((prev) => ({
        ...prev,
        x: target.x + delta.x,
        width: target.width - delta.x
      }));
    }
  });

  const [, connectRightDrag] = useDrag(
    () => ({
      type: 'Timeline',
      item: { id, width, x, y },
      collect: (monitor) => ({
        isDragging: monitor.isDragging()
      })
    }),
    [id, width, x, y]
  );

  const [, connectRightDrop] = useDrop({
    accept: 'Timeline',
    hover: (target: Props, monitor) => {
      const delta = monitor.getDifferenceFromInitialOffset();
      if (!delta?.x) return;
      setW(target.width + delta.x);
    },
    drop: (target, monitor) => {
      const delta = monitor.getDifferenceFromInitialOffset();
      if (!delta?.x) return;
      setter((prev) => ({
        ...prev,
        width: target.width + delta.x
      }));
    }
  });

  connectRightDrag(right);
  connectRightDrop(right);

  connectLeftDrag(left);
  connectLeftDrop(left);
  return (
    <div style={{ ...item, left: _x, width: w }}>
      <div style={focus}>
        <span style={leftFocs} ref={left}></span>
        <span style={lineFocus}></span>
        <span style={rightFocs} ref={right}></span>
      </div>
    </div>
  );
};
