import React, { memo } from 'react';
import { Handle, Position } from '@xyflow/react';

function RoadmapNode() {
  return (
    <div className='px-4 py-2 bg-card text-card-foreground flex flex-col gap-6 rounded-xl shadow-sm max-w-[280px] w-max border  border-opacity-10 border-muted'>
      <div className='flex'>
        {/* <div className='rounded-full w-12 h-12 flex justify-center items-center '>
          {data.emoji}
        </div> */}
        <div className='ml-2 break-all'>
          <div className='text-lg font-bold break-words'>gdusgdjhgsh</div>
          {/* <div className='dark:text-white'>{data.info}</div> */}
        </div>
      </div>
      *{/* <Handle type='source' position={Position.Right} /> */}
    </div>
  );
}

export default memo(RoadmapNode);
