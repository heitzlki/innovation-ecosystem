import React, { memo } from 'react';

import { Handle, Position } from '@xyflow/react';
import { BorderBeam } from '@/components/magicui/border-beam';
import { useStore } from '@/lib/store';

function CenterNode({ data }: { data: { color: string; title: string } }) {
  const { color1, color2, setColor1, setColor2 } = useStore();
  return (
    <div
      className='px-8 py-4 bg-card text-card-foreground flex flex-col gap-6 rounded-xl border shadow-sm max-w-[280px] w-max'
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
      {/* <Handle type='target' position={Position.Top} className='w-16' />
      <Handle type='source' position={Position.Bottom} className='w-16 ' /> */}
      {/* <BorderBeam duration={8} size={20} /> */}
      <BorderBeam duration={3} size={40} colorFrom={color1} colorTo={color2} />
    </div>
  );
}

export default memo(CenterNode);
