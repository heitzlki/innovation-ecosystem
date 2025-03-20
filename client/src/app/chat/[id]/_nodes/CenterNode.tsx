import React, { memo } from 'react';

import { Handle, Position } from '@xyflow/react';
import { BorderBeam } from '@/components/magicui/border-beam';

function CenterNode({ data }: { data: { color: string; title: string } }) {
  return (
    <div
      className='px-4 py-2 bg-card text-card-foreground flex flex-col gap-6 rounded-xl border shadow-sm max-w-[280px] w-max'
      // style={{ background: data.color }}
    >
      <div className='flex'>
        {/* <div className='rounded-full w-12 h-12 flex justify-center items-center '>
          {data.emoji}
        </div> */}
        <div className='ml-2 break-all'>
          <div className='text-lg font-bold break-words'>{data.title}</div>
          {/* <div className='dark:text-white'>{data.info}</div> */}
        </div>
      </div>

      {/* <Handle type='target' position={Position.Top} className='w-16' />
      <Handle type='source' position={Position.Bottom} className='w-16 ' /> */}
      <BorderBeam duration={8} size={20} />
    </div>
  );
}

export default memo(CenterNode);
