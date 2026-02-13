import type { Resource, Edge } from '../types';
import type { NodePosition } from '../utils/graph';

const NODE_W = 180;
const NODE_H = 60;
const NODE_RX = 10;

const TYPE_COLORS: Record<string, { fill: string; stroke: string }> = {
  book: { fill: '#dbeafe', stroke: '#3b82f6' },
  article: { fill: '#dcfce7', stroke: '#22c55e' },
  other: { fill: '#f3f4f6', stroke: '#6b7280' },
};

type Props = {
  resources: Resource[];
  edges: Edge[];
  positions: NodePosition[];
  selectedId: string | null;
  edgeMode: boolean;
  onNodeClick: (id: string) => void;
};

export default function GraphCanvas({
  resources,
  edges,
  positions,
  selectedId,
  edgeMode,
  onNodeClick,
}: Props) {
  const posMap = new Map(positions.map((p) => [p.id, p]));
  const resMap = new Map(resources.map((r) => [r.id, r]));

  // Compute viewBox to fit all nodes with padding
  const padding = 60;
  let minX = 0, maxX = 0, minY = 0, maxY = 0;
  if (positions.length > 0) {
    minX = Math.min(...positions.map((p) => p.x)) - NODE_W / 2 - padding;
    maxX = Math.max(...positions.map((p) => p.x)) + NODE_W / 2 + padding;
    minY = Math.min(...positions.map((p) => p.y)) - NODE_H / 2 - padding;
    maxY = Math.max(...positions.map((p) => p.y)) + NODE_H / 2 + padding;
  } else {
    minX = -200; maxX = 200; minY = -100; maxY = 200;
  }
  const vw = maxX - minX;
  const vh = maxY - minY;

  return (
    <svg
      className="graph-canvas"
      viewBox={`${minX} ${minY} ${vw} ${vh}`}
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <marker
          id="arrowhead"
          markerWidth="10"
          markerHeight="7"
          refX="10"
          refY="3.5"
          orient="auto"
        >
          <polygon points="0 0, 10 3.5, 0 7" fill="#64748b" />
        </marker>
      </defs>

      {/* Edges */}
      {edges.map((edge) => {
        const from = posMap.get(edge.from);
        const to = posMap.get(edge.to);
        if (!from || !to) return null;
        // Line from bottom-center of `from` to top-center of `to`
        const x1 = from.x;
        const y1 = from.y + NODE_H / 2;
        const x2 = to.x;
        const y2 = to.y - NODE_H / 2;
        return (
          <line
            key={`${edge.from}-${edge.to}`}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="#64748b"
            strokeWidth={2}
            markerEnd="url(#arrowhead)"
          />
        );
      })}

      {/* Nodes */}
      {positions.map((pos) => {
        const res = resMap.get(pos.id);
        if (!res) return null;
        const colors = TYPE_COLORS[res.type] ?? TYPE_COLORS.other;
        const isSelected = pos.id === selectedId;
        return (
          <g
            key={pos.id}
            transform={`translate(${pos.x - NODE_W / 2}, ${pos.y - NODE_H / 2})`}
            onClick={() => onNodeClick(pos.id)}
            style={{ cursor: edgeMode ? 'crosshair' : 'pointer' }}
          >
            <rect
              width={NODE_W}
              height={NODE_H}
              rx={NODE_RX}
              fill={colors.fill}
              stroke={isSelected ? '#f59e0b' : colors.stroke}
              strokeWidth={isSelected ? 3 : 2}
            />
            <text
              x={NODE_W / 2}
              y={NODE_H / 2 - 6}
              textAnchor="middle"
              fontSize="13"
              fontWeight="600"
              fill="#1e293b"
            >
              {res.title.length > 16 ? res.title.slice(0, 15) + '…' : res.title}
            </text>
            <text
              x={NODE_W / 2}
              y={NODE_H / 2 + 14}
              textAnchor="middle"
              fontSize="11"
              fill="#64748b"
            >
              {res.type === 'book' ? '本' : res.type === 'article' ? '記事' : 'その他'}
              {res.author ? ` / ${res.author.length > 10 ? res.author.slice(0, 9) + '…' : res.author}` : ''}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
