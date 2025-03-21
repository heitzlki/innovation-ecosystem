import React, { memo } from 'react';
import { Handle, Position } from '@xyflow/react';

function InfoNode({ data }: { data: { color: string; title: string } }) {
  return (
    <div
      className='px-4 py-2 bg-card text-card-foreground flex flex-col gap-6 rounded-xl shadow-sm max-w-[280px] w-max border border-gray-800 border-opacity-10'
      style={{ borderColor: data.color }}>
      <div className='flex'>
        {/* <div className='rounded-full w-12 h-12 flex justify-center items-center '>
          {data.emoji}
        </div> */}
        <div className='ml-2 break-all'>
          <div className='text-lg font-bold break-words'>{data.title}</div>
          {/* <div className='dark:text-white'>{data.info}</div> */}
        </div>
      </div>

      <Handle
        type='target'
        position={Position.Top}
        className='opacity-0
  height-0
  width-0
  top-auto
  bottom-auto'
      />
      <Handle
        type='source'
        position={Position.Bottom}
        className='opacity-0
  height-0
  width-0
  top-auto
  bottom-auto'
      />
      {/* <BorderBeam duration={4} size={20} colorFrom=''/> */}
    </div>
  );
}

export default memo(InfoNode);
