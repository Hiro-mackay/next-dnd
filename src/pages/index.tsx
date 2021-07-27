import dynamic from 'next/dynamic';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const Dnd = dynamic(() => import('../components/DnD'), { ssr: false });

const Page = () => {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <DndProvider backend={HTML5Backend}>
        <Dnd />
      </DndProvider>
    </div>
  );
};

export default Page;
