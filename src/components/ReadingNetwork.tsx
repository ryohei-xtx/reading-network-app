import { useState, useMemo, useEffect, useCallback } from 'react';
import type { Resource, Edge, ReadingGraph } from '../types';
import {
  transitiveReduction,
  wouldCreateCycle,
  computeLayout,
} from '../utils/graph';
import GraphCanvas from './GraphCanvas';
import ResourceForm from './ResourceForm';
import './ReadingNetwork.css';

const STORAGE_KEY = 'reading-graph';

function loadGraph(): ReadingGraph {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      // ignore
    }
  }
  return { resources: [], edges: [] };
}

export default function ReadingNetwork() {
  const [graph, setGraph] = useState<ReadingGraph>(loadGraph);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [edgeMode, setEdgeMode] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingResource, setEditingResource] = useState<Resource | undefined>();
  const [message, setMessage] = useState('');

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(graph));
  }, [graph]);

  const nodeIds = useMemo(
    () => graph.resources.map((r) => r.id),
    [graph.resources],
  );

  const positions = useMemo(
    () => computeLayout(nodeIds, graph.edges),
    [nodeIds, graph.edges],
  );

  const showMessage = useCallback((msg: string) => {
    setMessage(msg);
    setTimeout(() => setMessage(''), 3000);
  }, []);

  const handleAddResource = (resource: Resource) => {
    if (editingResource) {
      setGraph((prev) => ({
        ...prev,
        resources: prev.resources.map((r) =>
          r.id === resource.id ? resource : r,
        ),
      }));
    } else {
      setGraph((prev) => ({
        ...prev,
        resources: [...prev.resources, resource],
      }));
    }
    setShowForm(false);
    setEditingResource(undefined);
  };

  const handleDeleteSelected = () => {
    if (!selectedId) return;
    if (!window.confirm('このリソースを削除しますか？')) return;
    setGraph((prev) => ({
      resources: prev.resources.filter((r) => r.id !== selectedId),
      edges: prev.edges.filter(
        (e) => e.from !== selectedId && e.to !== selectedId,
      ),
    }));
    setSelectedId(null);
  };

  const handleEditSelected = () => {
    if (!selectedId) return;
    const res = graph.resources.find((r) => r.id === selectedId);
    if (res) {
      setEditingResource(res);
      setShowForm(true);
    }
  };

  const handleNodeClick = (id: string) => {
    if (edgeMode && selectedId && selectedId !== id) {
      // Add edge selectedId → id
      const from = selectedId;
      const to = id;

      // Check duplicate
      if (graph.edges.some((e) => e.from === from && e.to === to)) {
        showMessage('このエッジは既に存在します');
        return;
      }

      // Check cycle
      if (wouldCreateCycle(nodeIds, graph.edges, from, to)) {
        showMessage('サイクルが発生するため追加できません');
        return;
      }

      const newEdges = [...graph.edges, { from, to }];
      const reduced = transitiveReduction(nodeIds, newEdges);
      const removed = newEdges.length - reduced.length;

      setGraph((prev) => ({ ...prev, edges: reduced }));
      setEdgeMode(false);
      setSelectedId(null);

      if (removed > 0) {
        showMessage(`エッジを追加し、冗長な${removed}本のエッジを自動削除しました`);
      } else {
        showMessage('エッジを追加しました');
      }
    } else {
      setSelectedId((prev) => (prev === id ? null : id));
    }
  };

  const handleStartEdgeMode = () => {
    if (!selectedId) {
      showMessage('先にノードを選択してください');
      return;
    }
    setEdgeMode(true);
    showMessage('接続先のノードをクリックしてください');
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingResource(undefined);
  };

  return (
    <div className="reading-network">
      <div className="network-toolbar">
        <button
          className="primary"
          onClick={() => {
            setEditingResource(undefined);
            setShowForm(true);
          }}
        >
          リソースを追加
        </button>
        {selectedId && (
          <>
            <button onClick={handleEditSelected}>編集</button>
            <button
              className={edgeMode ? 'active' : ''}
              onClick={handleStartEdgeMode}
            >
              エッジを追加
            </button>
            <button className="danger" onClick={handleDeleteSelected}>
              削除
            </button>
          </>
        )}
        {edgeMode && (
          <button
            onClick={() => {
              setEdgeMode(false);
              setMessage('');
            }}
          >
            キャンセル
          </button>
        )}
      </div>

      <p className="network-hint">{message}</p>

      {graph.resources.length === 0 ? (
        <div className="network-empty">
          <p>リソースがまだありません。「リソースを追加」で始めましょう。</p>
        </div>
      ) : (
        <GraphCanvas
          resources={graph.resources}
          edges={graph.edges}
          positions={positions}
          selectedId={selectedId}
          edgeMode={edgeMode}
          onNodeClick={handleNodeClick}
        />
      )}

      {showForm && (
        <div className="modal-overlay" onClick={handleCancel}>
          <ResourceForm
            resource={editingResource}
            onSubmit={handleAddResource}
            onCancel={handleCancel}
          />
        </div>
      )}
    </div>
  );
}
