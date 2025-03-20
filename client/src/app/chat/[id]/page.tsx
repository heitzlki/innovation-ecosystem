import DockBar from './DockBar';
import ChatWindow from './ChatWindow';

export default async function Chat({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div
      className='min-h-screen bg-background transition-colors duration-300'
      suppressHydrationWarning>
      <DockBar />
      <ChatWindow />
      <div className='flex justify-center items-center min-h-screen'>
        <h1 className='text-4xl font-bold'>Chat: {id}</h1>
      </div>
    </div>
  );
}
