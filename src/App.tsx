import { useState, useMemo, useEffect } from 'react';
import type { TimelineEvent } from './types';
import initialEvents from './data/events.json';
import Timeline from './components/Timeline';
import EventForm from './components/EventForm';
import ReadingNetwork from './components/ReadingNetwork';
import './App.css';

const STORAGE_KEY = 'timeline-events';

function loadEvents(): TimelineEvent[] {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      // ignore
    }
  }
  return initialEvents;
}

type Page = 'timeline' | 'network';

export default function App() {
  const [page, setPage] = useState<Page>('timeline');
  const [events, setEvents] = useState<TimelineEvent[]>(loadEvents);
  const [editingEvent, setEditingEvent] = useState<TimelineEvent | undefined>();
  const [showForm, setShowForm] = useState(false);
  const [filterCategory, setFilterCategory] = useState('');

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
  }, [events]);

  const categories = useMemo(() => {
    const cats = new Set(events.flatMap((e) => e.categories ?? []));
    return Array.from(cats).sort();
  }, [events]);

  const filteredEvents = useMemo(() => {
    let result = events;
    if (filterCategory) {
      result = result.filter((e) => e.categories?.includes(filterCategory));
    }
    return result.sort((a, b) => {
      if (a.year !== b.year) return a.year - b.year;
      if ((a.month ?? 0) !== (b.month ?? 0)) return (a.month ?? 0) - (b.month ?? 0);
      return (a.day ?? 0) - (b.day ?? 0);
    });
  }, [events, filterCategory]);

  const handleSubmit = (event: TimelineEvent) => {
    if (editingEvent) {
      setEvents((prev) => prev.map((e) => (e.id === event.id ? event : e)));
    } else {
      setEvents((prev) => [...prev, event]);
    }
    setShowForm(false);
    setEditingEvent(undefined);
  };

  const handleEdit = (event: TimelineEvent) => {
    setEditingEvent(event);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('このイベントを削除しますか？')) {
      setEvents((prev) => prev.filter((e) => e.id !== id));
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingEvent(undefined);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>{page === 'timeline' ? '年表タイムライン' : '読書順ネットワーク'}</h1>
        <nav className="tab-nav">
          <button
            className={`tab-button ${page === 'timeline' ? 'active' : ''}`}
            onClick={() => setPage('timeline')}
          >
            年表
          </button>
          <button
            className={`tab-button ${page === 'network' ? 'active' : ''}`}
            onClick={() => setPage('network')}
          >
            読書ネットワーク
          </button>
        </nav>
        {page === 'timeline' && (
          <div className="app-controls">
            <select
              className="filter-select"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              <option value="">すべてのカテゴリ</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <button className="add-button" onClick={() => setShowForm(true)}>
              イベントを追加
            </button>
          </div>
        )}
      </header>

      {page === 'timeline' ? (
        <>
          <Timeline events={filteredEvents} onEdit={handleEdit} onDelete={handleDelete} />
          {showForm && (
            <div className="modal-overlay" onClick={handleCancel}>
              <EventForm
                event={editingEvent}
                onSubmit={handleSubmit}
                onCancel={handleCancel}
              />
            </div>
          )}
        </>
      ) : (
        <ReadingNetwork />
      )}
    </div>
  );
}
