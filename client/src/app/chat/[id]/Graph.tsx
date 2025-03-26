'use client';

import React, { useCallback } from 'react';
import {
  ReactFlow,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  BackgroundVariant,
  Connection,
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';

import { useEdgeParams } from '@/hooks/use-elements';

import AnnotationNode from './_nodes/AnnotationNode';
import InfoNode from './_nodes/InfoNode';

import FloatingEdge from './_edges/FloatingEdge';
import CenterNode from './_nodes/CenterNode';
import { useStore } from '@/lib/store';

const nodeTypes = {
  annotation: AnnotationNode,
  custom: InfoNode,
  center: CenterNode,
};

const edgeTypes = {
  floating: FloatingEdge,
  // button: ButtonEdge,
};

export default function Graph() {
  const { graphData, setSelectedNode } = useStore();
  const { nodes: initialNodes, edges: initialEdges } =
    useEdgeParams().initialElements(3, 260, graphData);

  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // Handle node click
  const onNodeClick = useCallback(
    (event: React.MouseEvent, node: any) => {
      console.log('Node clicked:', node.data.title);
      console.log('Node clicked:', node);
      // Find more detailed information about the node
      let nodeDetails = null;
      let nodeType = node.type;

      // Handle different node types
      if (node.id === 'target') {
        // Center node (main problem)
        return;
      } else if (parseInt(node.id) < 3) {
        // Main area nodes
        const areaIndex = parseInt(node.id);
        // console.log(graphData, areaIndex >= 0, areaIndex < 3);
        // console.log('garphdata Length: ', graphData.length);
        // console.log('GraphData: ', graphData);
        // console.log('areaIndex: ', areaIndex);
        if (graphData && areaIndex >= 0 && areaIndex < 3) {
          const area = graphData[areaIndex].area;
          nodeDetails = {
            rating: area.rating,
            contacts: area.contacts,
          };
          // console.log('Node Details:', nodeDetails);
        }
      } else {
        // Contact nodes
        const parentId = Math.floor(parseInt(node.id) / 3);
        const contactIndex = parseInt(node.id) % 3;

        // console.log('Parent ID:', parentId);
        // console.log('Contact Index:', contactIndex);

        if (graphData && parentId >= 0 && parentId <= 3) {
          const contacts = graphData[parentId - 1].area.contacts;
          if (contactIndex >= 0 && contactIndex < 3) {
            const contact = contacts[contactIndex];
            nodeDetails = {
              description: contact.description,
              institution: contact.institution,
              email: contact.email,
              website: contact.website,
            };
          }
        }
      }

      // Set the selected node in the store
      setSelectedNode({
        id: node.id,
        title: node.data.title,
        color: node.data.color,
        type: nodeType,
        details: nodeDetails,
      });
    },
    [graphData, setSelectedNode]
  );

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
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
        onNodeClick={onNodeClick}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        proOptions={{ hideAttribution: true }}
        fitView>
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}
