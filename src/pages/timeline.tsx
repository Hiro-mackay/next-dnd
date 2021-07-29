import dynamic from 'next/dynamic';
import { CSSProperties } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const Timeline = dynamic(() => import('../components/Timeline'), { ssr: false });

const container: CSSProperties = {
  width: '100vw',
  height: '100vh'
};

const Page = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <div style={container}>
        <Timeline />
      </div>
    </DndProvider>
  );
};
export default Page;
