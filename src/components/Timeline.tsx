import { TimelineItem } from './TimelineItem';
import { useState } from 'react';

interface Props {
  id: string;
  width: number;
  x: number;
  y: number;
}
const Timeline = () => {
  const [state, setState] = useState<Props>({ id: 'timeline', width: 200, x: 0, y: 0 });

  return (
    <div>
      <TimelineItem {...state} setter={setState} />
    </div>
  );
};

export default Timeline;
