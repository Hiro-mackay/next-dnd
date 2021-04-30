import dynamic from 'next/dynamic';

const Dnd = dynamic(() => import('../components/Box'), { ssr: false });

const Page = () => {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Dnd />
    </div>
  );
};

export default Page;
