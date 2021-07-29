import { useCallback, useState } from 'react';
import { useDrop, XYCoord } from 'react-dnd';
import update from 'immutability-helper';
import { CSSProperties, FC } from 'react';
import { useDrag } from 'react-dnd';

const style: CSSProperties = {
  position: 'absolute',
  border: '1px dashed gray',
  backgroundColor: 'white',
  padding: '0.5rem 1rem',
  cursor: 'move'
};

export interface BoxProps {
  id: any;
  left: number;
  top: number;
  hideSourceOnDrag?: boolean;
}

const ItemTypes = {
  BOX: 'box'
};

interface DragItem {
  type: string;
  id: string;
  top: number;
  left: number;
}

export const Box: FC<BoxProps> = ({ id, left, top, hideSourceOnDrag, children }) => {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: ItemTypes.BOX,
      item: { id, left, top },
      collect: (monitor) => ({
        isDragging: monitor.isDragging()
      })
    }),
    [id, left, top]
  );

  if (isDragging && hideSourceOnDrag) {
    return <div ref={drag} />;
  }
  return (
    <div ref={drag} style={{ ...style, left, top }} role="Box">
      {children}
    </div>
  );
};

const dnd = () => {
  const [boxes, setBoxes] = useState<{
    [key: string]: {
      top: number;
      left: number;
      title: string;
    };
  }>({
    a: { top: 20, left: 80, title: 'Drag me around' },
    b: { top: 180, left: 20, title: 'Drag me too' }
  });

  const moveBox = useCallback(
    (id: string, left: number, top: number) => {
      setBoxes(
        update(boxes, {
          [id]: {
            $merge: { left, top }
          }
        })
      );
    },
    [boxes, setBoxes]
  );

  const [, drop] = useDrop(
    () => ({
      accept: ItemTypes.BOX,
      drop: (item: DragItem, monitor) => {
        const delta = monitor.getDifferenceFromInitialOffset() as XYCoord;
        const left = Math.round(item.left + delta.x);
        const top = Math.round(item.top + delta.y);
        moveBox(item.id, left, top);
        console.log('drop');
        return undefined;
      }
    }),
    [moveBox]
  );

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <div ref={drop} style={{ width: 400, height: 400, border: '1px solid #ccc' }}>
        {Object.keys(boxes).map((key) => {
          const { left, top, title } = boxes[key];
          return (
            <Box key={key} id={key} left={left} top={top}>
              {title}
            </Box>
          );
        })}
      </div>
    </div>
  );
};

export default dnd;
