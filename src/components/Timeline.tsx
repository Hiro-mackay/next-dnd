import { TimelineItem } from './TimelineItem';
import { useDrop } from 'react-dnd';
import { useState } from 'react';

interface Props {
  id: string;
  width: number;
  x: number;
  y: number;
}
const Timeline = () => {
  const [state, setState] = useState<Props>({ id: 'timeline', width: 200, x: 0, y: 0 });

  const [, drop] = useDrop({
    accept: 'Timeline'
    // drop: (target: Props, monitor) => {
    //   const delta = monitor.getDifferenceFromInitialOffset();
    //   if (!delta?.x) return;
    //   const x = Math.round(target.x + delta.x);
    //   setState((prev) => ({ ...prev, x }));
    //   return undefined;
    // }
  });
  return (
    <div ref={drop}>
      <TimelineItem {...state} setter={setState} />
    </div>
  );
};

export default Timeline;
