import { useCallback } from 'react';
import { Position, MarkerType, Node, Edge, InternalNode } from '@xyflow/react';

export interface NodeWithMeasured extends InternalNode<Node> {
  id: string;
  measured: {
    width: number;
    height: number;
  };
  internals: {
    positionAbsolute: {
      x: number;
      y: number;
    };
    z: number;
    userNode: Node;
  };
}

interface IntersectionPoint {
  x: number;
  y: number;
}

interface EdgeParams {
  sx: number;
  sy: number;
  tx: number;
  ty: number;
  sourcePos: Position;
  targetPos: Position;
}

interface InitialElements {
  nodes: Node[];
  edges: Edge[];
}

/**
 * Returns the intersection point between the center of the intersection node and the target node
 */
const getNodeIntersection = (
  intersectionNode: NodeWithMeasured,
  targetNode: NodeWithMeasured
): IntersectionPoint => {
  // https://math.stackexchange.com/questions/1724792/an-algorithm-for-finding-the-intersection-point-between-a-center-of-vision-and-a
  const { width: intersectionNodeWidth, height: intersectionNodeHeight } =
    intersectionNode.measured;
  const intersectionNodePosition = intersectionNode.internals.positionAbsolute;
  const targetPosition = targetNode.internals.positionAbsolute;

  const w = intersectionNodeWidth / 2;
  const h = intersectionNodeHeight / 2;
  const x2 = intersectionNodePosition.x + w;
  const y2 = intersectionNodePosition.y + h;
  const x1 = targetPosition.x + targetNode.measured.width / 2;
  const y1 = targetPosition.y + targetNode.measured.height / 2;

  const xx1 = (x1 - x2) / (2 * w) - (y1 - y2) / (2 * h);
  const yy1 = (x1 - x2) / (2 * w) + (y1 - y2) / (2 * h);
  const a = 1 / (Math.abs(xx1) + Math.abs(yy1));
  const xx3 = a * xx1;
  const yy3 = a * yy1;
  const x = w * (xx3 + yy3) + x2;
  const y = h * (-xx3 + yy3) + y2;

  return { x, y };
};

/**
 * Returns the position (top, right, bottom, or left) of the passed node compared to the intersection point
 */
const getEdgePosition = (
  node: NodeWithMeasured,
  intersectionPoint: IntersectionPoint
): Position => {
  const n = { ...node.internals.positionAbsolute, ...node };
  const nx = Math.round(n.x);
  const ny = Math.round(n.y);
  const px = Math.round(intersectionPoint.x);
  const py = Math.round(intersectionPoint.y);

  if (px <= nx + 1) {
    return Position.Left;
  }
  if (px >= nx + n.measured.width - 1) {
    return Position.Right;
  }
  if (py <= ny + 1) {
    return Position.Top;
  }
  if (py >= n.y + n.measured.height - 1) {
    return Position.Bottom;
  }

  return Position.Top;
};

/**
 * Custom hook that provides functions for edge parameter calculation and initial elements
 */
export const useEdgeParams = () => {
  /**
   * Returns the parameters (sx, sy, tx, ty, sourcePos, targetPos) needed to create an edge
   */
  const getEdgeParams = useCallback(
    (source: NodeWithMeasured, target: NodeWithMeasured): EdgeParams => {
      const sourceIntersectionPoint = getNodeIntersection(source, target);
      const targetIntersectionPoint = getNodeIntersection(target, source);
      const sourcePos = getEdgePosition(source, sourceIntersectionPoint);
      const targetPos = getEdgePosition(target, targetIntersectionPoint);

      return {
        sx: sourceIntersectionPoint.x,
        sy: sourceIntersectionPoint.y,
        tx: targetIntersectionPoint.x,
        ty: targetIntersectionPoint.y,
        sourcePos,
        targetPos,
      };
    },
    []
  );

  /**
   * Generates initial nodes and edges in a circular layout
   */
  const initialElements = useCallback((): InitialElements => {
    const nodes: Node[] = [];
    const edges: Edge[] = [];
    // const center = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const center = { x: 0, y: 0 };

    nodes.push({
      id: 'target',
      // type: 'center',
      // draggable: false,
      // selectable: false,
      data: { color: '#FD84FF', title: 'Marketing' },
      position: center,
    });

    for (let i = 0; i < 8; i++) {
      const degrees = i * (360 / 8);
      const radians = degrees * (Math.PI / 180);
      const x = 250 * Math.cos(radians) + center.x;
      const y = 250 * Math.sin(radians) + center.y;

      nodes.push({
        id: `${i}`,
        type: 'custom',
        draggable: false,
        selectable: false,
        data: { color: '#FD84FF', title: 'Marketing' },
        position: { x, y },
      });

      edges.push({
        id: `edge-${i}`,
        target: 'target',
        source: `${i}`,
        type: 'floating',
        markerEnd: {
          type: MarkerType.Arrow,
        },
      });
    }

    return { nodes, edges };
  }, []);

  return {
    getEdgeParams,
    initialElements,
  };
};
