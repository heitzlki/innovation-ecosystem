'use client';

import React, { useCallback } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  BackgroundVariant,
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';

import { useEdgeParams } from '@/hooks/use-elements';

// const initialNodes = [
//   // {
//   //   id: 'annotation-1',
//   //   type: 'annotation',
//   //   draggable: false,
//   //   selectable: false,
//   //   data: {
//   //     level: 1,
//   //     label:
//   //       'Built-in node and edge types. Draggable, deletable and connectable!',
//   //     arrowStyle: {
//   //       right: 0,
//   //       bottom: 0,
//   //       transform: 'translate(-30px,10px) rotate(-80deg)',
//   //     },
//   //   },
//   //   position: { x: -200, y: -30 },
//   // },
//   {
//     id: '0',
//     type: 'custom',
//     data: { color: '#e57373', title: 'Your Problem' },
//     position: { x: 0, y: 0 },
//   },

//   {
//     id: '1',
//     type: 'custom',
//     data: { color: '#FD84FF', title: 'Marketing' },
//     position: { x: 0, y: 75 },
//   },
//   {
//     id: '2',
//     type: 'custom',
//     data: { color: '#8BFFAC', title: 'Sales' },
//     position: { x: 0, y: 130 },
//   },
//   {
//     id: '3',
//     type: 'custom',
//     data: { color: '#00C2FF', title: 'Innovation' },
//     position: { x: 10, y: -70 },
//   },
// ];
// const initialEdges = [{ id: 'e1-2', source: '1', target: '2', animated: true }];

import AnnotationNode from './_nodes/AnnotationNode';
import InfoNode from './_nodes/InfoNode';

import FloatingEdge from './_edges/FloatingEdge';
import CenterNode from './_nodes/CenterNode';

const nodeTypes = {
  annotation: AnnotationNode,
  custom: InfoNode,
  center: CenterNode,
};

const edgeTypes = {
  floating: FloatingEdge,
  // button: ButtonEdge,
};

interface GraphProps {
  startData?: any;
}

export default function Graph({ startData }: GraphProps) {
  console.log('startData:', startData);
  const { nodes: initialNodes, edges: initialEdges } =
    useEdgeParams().initialElements(3, 250);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        proOptions={{ hideAttribution: true }}
        fitView>
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}
