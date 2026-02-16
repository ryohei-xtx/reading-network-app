import { useState, useMemo, useEffect, useCallback } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import type { TimelineEvent, LibraryState, UserTimeline } from './types';
import initialEvents from './data/events.json';
import { defaultTimelines } from './data/defaultTimelines';
import Timeline from './components/Timeline';
import TimelineTable from './components/TimelineTable';
import EventForm from './components/EventForm';
import ReadingNetwork from './components/ReadingNetwork';
import './App.css';

const STORAGE_KEY = 'timeline-events';
const LIBRARY_KEY = 'timeline-library';
const USER_TIMELINES_KEY = 'timeline-user-timelines';
const HIDDEN_DEFAULTS_KEY = 'timeline-hidden-defaults';

function loadCustomEvents(): TimelineEvent[] {
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

function loadUserTimelines(): UserTimeline[] {
  const saved = localStorage.getItem(USER_TIMELINES_KEY);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      // ignore
    }
  }
  return [];
}

function loadHiddenDefaults(): string[] {
  const saved = localStorage.getItem(HIDDEN_DEFAULTS_KEY);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      // ignore
    }
  }
  return [];
}

function loadLibrary(): LibraryState {
  const saved = localStorage.getItem(LIBRARY_KEY);
  if (saved) {
    try {
      const parsed = JSON.parse(saved) as LibraryState;
      // Auto-activate newly added default timelines (unless explicitly hidden)
      const hidden = loadHiddenDefaults();
      const knownIds = new Set([...parsed.activeTimelines, ...hidden]);
      const newDefaults = defaultTimelines.filter((t) => !knownIds.has(t.id)).map((t) => t.id);
      if (newDefaults.length > 0) {
        parsed.activeTimelines = [...parsed.activeTimelines, ...newDefaults];
      }
      return parsed;
    } catch {
      // ignore
    }
  }
  // Migration from old theme key
  const oldTheme = localStorage.getItem('timeline-theme');
  if (oldTheme && oldTheme !== 'custom') {
    localStorage.removeItem('timeline-theme');
    return { activeTimelines: [oldTheme], categoryOverrides: {} };
  }
  localStorage.removeItem('timeline-theme');
  return { activeTimelines: ['custom', ...defaultTimelines.map((t) => t.id)], categoryOverrides: {} };
}

type ViewMode = 'timeline' | 'table';

export default function App() {
  const [activeTimelines, setActiveTimelines] = useState<string[]>(() => loadLibrary().activeTimelines);
  const [categoryOverrides, setCategoryOverrides] = useState<Record<string, string[]>>(() => loadLibrary().categoryOverrides);
  const [customEvents, setCustomEvents] = useState<TimelineEvent[]>(loadCustomEvents);
  const [editingEvent, setEditingEvent] = useState<TimelineEvent | undefined>();
  const [showForm, setShowForm] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('timeline');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [proportional, setProportional] = useState(false);
  const [showGaps, setShowGaps] = useState(false);
  const [compact, setCompact] = useState(false);
  const [categoryEditEvent, setCategoryEditEvent] = useState<string | null>(null);
  const [newCategory, setNewCategory] = useState('');
  const [userTimelines, setUserTimelines] = useState<UserTimeline[]>(loadUserTimelines);
  const [timelineFormData, setTimelineFormData] = useState<{ name: string; sourceTimelines: string[]; sourceCategories: string[] } | null>(null);
  const [hiddenDefaultTimelines, setHiddenDefaultTimelines] = useState<string[]>(loadHiddenDefaults);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(customEvents));
  }, [customEvents]);

  useEffect(() => {
    localStorage.setItem(LIBRARY_KEY, JSON.stringify({ activeTimelines, categoryOverrides }));
  }, [activeTimelines, categoryOverrides]);

  useEffect(() => {
    localStorage.setItem(USER_TIMELINES_KEY, JSON.stringify(userTimelines));
  }, [userTimelines]);

  useEffect(() => {
    localStorage.setItem(HIDDEN_DEFAULTS_KEY, JSON.stringify(hiddenDefaultTimelines));
  }, [hiddenDefaultTimelines]);

  const visibleDefaultTimelines = useMemo(
    () => defaultTimelines.filter((t) => !hiddenDefaultTimelines.includes(t.id)),
    [hiddenDefaultTimelines],
  );

  const mergedEvents = useMemo(() => {
    const eventMap = new Map<string, TimelineEvent>();
    for (const tid of activeTimelines) {
      if (tid === 'custom') {
        for (const e of customEvents) eventMap.set(e.id, e);
      } else {
        const theme = defaultTimelines.find((t) => t.id === tid);
        if (theme) {
          for (const e of theme.events) eventMap.set(e.id, e);
        } else {
          const ut = userTimelines.find((u) => u.id === tid);
          if (ut) {
            for (const srcId of ut.sourceTimelines) {
              if (srcId === 'custom') {
                for (const e of customEvents) eventMap.set(e.id, e);
              } else {
                const srcTheme = defaultTimelines.find((t) => t.id === srcId);
                if (srcTheme) {
                  for (const e of srcTheme.events) eventMap.set(e.id, e);
                }
              }
            }
            if (ut.sourceCategories.length > 0) {
              const allEvents = [
                ...customEvents,
                ...defaultTimelines.flatMap((t) => t.events),
              ];
              for (const e of allEvents) {
                if (e.categories?.some((c) => ut.sourceCategories.includes(c))) {
                  eventMap.set(e.id, e);
                }
              }
            }
          }
        }
      }
    }
    return Array.from(eventMap.values()).map((e) => {
      const overrides = categoryOverrides[e.id];
      if (overrides && overrides.length > 0) {
        return { ...e, categories: [...(e.categories ?? []), ...overrides] };
      }
      return e;
    });
  }, [activeTimelines, customEvents, categoryOverrides, userTimelines]);

  const sortedEvents = useMemo(() => {
    return [...mergedEvents].sort((a, b) => {
      if (a.year !== b.year) return a.year - b.year;
      if ((a.month ?? 0) !== (b.month ?? 0)) return (a.month ?? 0) - (b.month ?? 0);
      return (a.day ?? 0) - (b.day ?? 0);
    });
  }, [mergedEvents]);

  const categories = useMemo(() => {
    const cats = new Set(mergedEvents.flatMap((e) => e.categories ?? []));
    return Array.from(cats).sort();
  }, [mergedEvents]);

  const filteredEvents = useMemo(() => {
    if (selectedCategories.length === 0) return sortedEvents;
    return sortedEvents.filter((e) =>
      selectedCategories.some((cat) => e.categories?.includes(cat)),
    );
  }, [sortedEvents, selectedCategories]);

  const customEventIds = useMemo(() => {
    return new Set(customEvents.map((e) => e.id));
  }, [customEvents]);

  const effectiveTableCategories = useMemo(() => {
    return selectedCategories.length > 0 ? selectedCategories : categories;
  }, [selectedCategories, categories]);

  const isEventEditable = useCallback((eventId: string) => {
    return customEventIds.has(eventId);
  }, [customEventIds]);

  const toggleTimeline = (timelineId: string) => {
    setActiveTimelines((prev) => {
      if (prev.includes(timelineId)) {
        return prev.filter((t) => t !== timelineId);
      }
      return [...prev, timelineId];
    });
  };

  const handleSubmit = (event: TimelineEvent) => {
    if (editingEvent) {
      setCustomEvents((prev) => prev.map((e) => (e.id === event.id ? event : e)));
    } else {
      setCustomEvents((prev) => [...prev, event]);
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
      setCustomEvents((prev) => prev.filter((e) => e.id !== id));
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingEvent(undefined);
  };

  const addCategoryOverride = (eventId: string, category: string) => {
    setCategoryOverrides((prev) => {
      const existing = prev[eventId] ?? [];
      if (existing.includes(category)) return prev;
      return { ...prev, [eventId]: [...existing, category] };
    });
  };

  const removeCategoryOverride = (eventId: string, category: string) => {
    setCategoryOverrides((prev) => {
      const existing = prev[eventId] ?? [];
      const updated = existing.filter((c) => c !== category);
      if (updated.length === 0) {
        const next = { ...prev };
        delete next[eventId];
        return next;
      }
      return { ...prev, [eventId]: updated };
    });
  };

  const handleAddCategories = (eventId: string) => {
    setCategoryEditEvent(eventId);
    setNewCategory('');
  };

  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat],
    );
  };

  const allAvailableCategories = useMemo(() => {
    const cats = new Set<string>();
    for (const t of defaultTimelines) {
      for (const e of t.events) {
        for (const c of e.categories ?? []) cats.add(c);
      }
    }
    for (const e of customEvents) {
      for (const c of e.categories ?? []) cats.add(c);
    }
    return Array.from(cats).sort();
  }, [customEvents]);

  const formPreviewCount = useMemo(() => {
    if (!timelineFormData) return 0;
    const eventMap = new Map<string, boolean>();
    for (const srcId of timelineFormData.sourceTimelines) {
      if (srcId === 'custom') {
        for (const e of customEvents) eventMap.set(e.id, true);
      } else {
        const srcTheme = defaultTimelines.find((t) => t.id === srcId);
        if (srcTheme) {
          for (const e of srcTheme.events) eventMap.set(e.id, true);
        }
      }
    }
    if (timelineFormData.sourceCategories.length > 0) {
      const allEvents = [
        ...customEvents,
        ...defaultTimelines.flatMap((t) => t.events),
      ];
      for (const e of allEvents) {
        if (e.categories?.some((c) => timelineFormData.sourceCategories.includes(c))) {
          eventMap.set(e.id, true);
        }
      }
    }
    return eventMap.size;
  }, [timelineFormData, customEvents]);

  const saveUserTimeline = () => {
    if (!timelineFormData || !timelineFormData.name.trim()) return;
    const ut: UserTimeline = {
      id: `user-${Date.now()}`,
      name: timelineFormData.name.trim(),
      sourceTimelines: timelineFormData.sourceTimelines,
      sourceCategories: timelineFormData.sourceCategories,
    };
    setUserTimelines((prev) => [...prev, ut]);
    setTimelineFormData(null);
  };

  const deleteUserTimeline = (id: string) => {
    if (!window.confirm('このユーザー年表を削除しますか？')) return;
    setUserTimelines((prev) => prev.filter((u) => u.id !== id));
    setActiveTimelines((prev) => prev.filter((t) => t !== id));
  };

  const deleteDefaultTimeline = (id: string) => {
    if (!window.confirm('この外部年表を非表示にしますか？')) return;
    setHiddenDefaultTimelines((prev) => [...prev, id]);
    setActiveTimelines((prev) => prev.filter((t) => t !== id));
  };

  const isCustomActive = activeTimelines.includes('custom');

  const categoryEditEventData = categoryEditEvent
    ? mergedEvents.find((e) => e.id === categoryEditEvent)
    : null;

  return (
    <Routes>
      <Route
        path="/timeline"
        element={
          <div className="app">
            <header className="app-header">
              <h1>年表タイムライン</h1>
              <div className="timeline-selector">
                <span className="bulk-buttons">
                  <button
                    className="bulk-btn"
                    onClick={() => {
                      const allIds = ['custom', ...visibleDefaultTimelines.map((t) => t.id), ...userTimelines.map((u) => u.id)];
                      setActiveTimelines(allIds);
                    }}
                  >
                    全選択
                  </button>
                  <button
                    className="bulk-btn"
                    onClick={() => setActiveTimelines([])}
                  >
                    全解除
                  </button>
                </span>
                <label className="category-checkbox tl-custom">
                  <input
                    type="checkbox"
                    checked={activeTimelines.includes('custom')}
                    onChange={() => toggleTimeline('custom')}
                  />
                  カスタム（自分のデータ）
                </label>
                {visibleDefaultTimelines.map((theme) => (
                  <span key={theme.id} className="user-timeline-label">
                    <label className="category-checkbox tl-external">
                      <input
                        type="checkbox"
                        checked={activeTimelines.includes(theme.id)}
                        onChange={() => toggleTimeline(theme.id)}
                      />
                      {theme.name}
                    </label>
                    <button
                      className="user-timeline-delete tl-external-delete"
                      onClick={() => deleteDefaultTimeline(theme.id)}
                      title="非表示"
                    >
                      ×
                    </button>
                  </span>
                ))}
                {userTimelines.map((ut) => (
                  <span key={ut.id} className="user-timeline-label">
                    <label className="category-checkbox tl-user">
                      <input
                        type="checkbox"
                        checked={activeTimelines.includes(ut.id)}
                        onChange={() => toggleTimeline(ut.id)}
                      />
                      {ut.name}
                    </label>
                    <button
                      className="user-timeline-delete tl-user-delete"
                      onClick={() => deleteUserTimeline(ut.id)}
                      title="削除"
                    >
                      ×
                    </button>
                  </span>
                ))}
                <button
                  className="create-timeline-button"
                  onClick={() => setTimelineFormData({ name: '', sourceTimelines: [], sourceCategories: [] })}
                >
                  年表を作成
                </button>
              </div>
              <div className="view-toggle">
                <button
                  className={`tab-button ${viewMode === 'timeline' ? 'active' : ''}`}
                  onClick={() => setViewMode('timeline')}
                >
                  タイムライン
                </button>
                <button
                  className={`tab-button ${viewMode === 'table' ? 'active' : ''}`}
                  onClick={() => setViewMode('table')}
                >
                  テーブル
                </button>
              </div>
              <div className="app-controls">
                <div className="category-checkboxes">
                  <span className="bulk-buttons">
                    <button
                      className="bulk-btn"
                      onClick={() => setSelectedCategories([...categories])}
                    >
                      全選択
                    </button>
                    <button
                      className="bulk-btn"
                      onClick={() => setSelectedCategories([])}
                    >
                      全解除
                    </button>
                  </span>
                  {categories.map((cat) => (
                    <label key={cat} className="category-checkbox">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(cat)}
                        onChange={() => toggleCategory(cat)}
                      />
                      {cat}
                    </label>
                  ))}
                </div>
                {viewMode === 'timeline' && (
                  <label className="category-checkbox">
                    <input
                      type="checkbox"
                      checked={proportional}
                      onChange={(e) => setProportional(e.target.checked)}
                    />
                    時間間隔を反映
                  </label>
                )}
                {viewMode === 'table' && (
                  <label className="category-checkbox">
                    <input
                      type="checkbox"
                      checked={showGaps}
                      onChange={(e) => setShowGaps(e.target.checked)}
                    />
                    期間を表示
                  </label>
                )}
                <label className="category-checkbox">
                  <input
                    type="checkbox"
                    checked={compact}
                    onChange={(e) => setCompact(e.target.checked)}
                  />
                  名前のみ表示
                </label>
                {isCustomActive && (
                  <button className="add-button" onClick={() => setShowForm(true)}>
                    イベントを追加
                  </button>
                )}
              </div>
            </header>
            {viewMode === 'timeline' ? (
              <Timeline
                events={filteredEvents}
                onEdit={handleEdit}
                onDelete={handleDelete}
                proportional={proportional}
                isEventEditable={isEventEditable}
                onAddCategories={handleAddCategories}
                compact={compact}
              />
            ) : (
              <TimelineTable
                events={sortedEvents}
                selectedCategories={effectiveTableCategories}
                onEdit={handleEdit}
                onDelete={handleDelete}
                showGaps={showGaps}
                isEventEditable={isEventEditable}
                onAddCategories={handleAddCategories}
                compact={compact}
              />
            )}
            {showForm && isCustomActive && (
              <div className="modal-overlay" onClick={handleCancel}>
                <EventForm
                  event={editingEvent}
                  onSubmit={handleSubmit}
                  onCancel={handleCancel}
                  userTimelines={userTimelines}
                />
              </div>
            )}
            {categoryEditEvent && categoryEditEventData && (
              <div className="modal-overlay" onClick={() => setCategoryEditEvent(null)}>
                <div className="event-form" onClick={(e) => e.stopPropagation()}>
                  <h2>カテゴリ追加</h2>
                  <p className="category-edit-event-title">{categoryEditEventData.title}</p>
                  {(categoryOverrides[categoryEditEvent] ?? []).length > 0 && (
                    <div className="category-overrides-list">
                      <h3>追加済みカテゴリ</h3>
                      <div className="category-override-tags">
                        {(categoryOverrides[categoryEditEvent] ?? []).map((cat) => (
                          <span key={cat} className="category-override-tag">
                            {cat}
                            <button onClick={() => removeCategoryOverride(categoryEditEvent, cat)}>×</button>
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (newCategory.trim()) {
                        addCategoryOverride(categoryEditEvent, newCategory.trim());
                        setNewCategory('');
                      }
                    }}
                  >
                    <div className="form-group">
                      <input
                        type="text"
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        placeholder="カテゴリ名を入力"
                      />
                    </div>
                    <div className="form-actions">
                      <button type="button" onClick={() => setCategoryEditEvent(null)}>
                        閉じる
                      </button>
                      <button type="submit" className="submit-btn">追加</button>
                    </div>
                  </form>
                </div>
              </div>
            )}
            {timelineFormData && (
              <div className="modal-overlay" onClick={() => setTimelineFormData(null)}>
                <div className="event-form create-timeline-modal" onClick={(e) => e.stopPropagation()}>
                  <h2>年表を作成</h2>
                  <div className="form-group">
                    <label>年表名 *</label>
                    <input
                      type="text"
                      value={timelineFormData.name}
                      onChange={(e) => setTimelineFormData({ ...timelineFormData, name: e.target.value })}
                      placeholder="例: 科学技術史"
                    />
                  </div>
                  <div className="form-group">
                    <label>年表から追加</label>
                    <div className="category-checkboxes">
                      <label className="category-checkbox">
                        <input
                          type="checkbox"
                          checked={timelineFormData.sourceTimelines.includes('custom')}
                          onChange={() => {
                            const src = timelineFormData.sourceTimelines;
                            setTimelineFormData({
                              ...timelineFormData,
                              sourceTimelines: src.includes('custom') ? src.filter((s) => s !== 'custom') : [...src, 'custom'],
                            });
                          }}
                        />
                        カスタム
                      </label>
                      {visibleDefaultTimelines.map((t) => (
                        <label key={t.id} className="category-checkbox">
                          <input
                            type="checkbox"
                            checked={timelineFormData.sourceTimelines.includes(t.id)}
                            onChange={() => {
                              const src = timelineFormData.sourceTimelines;
                              setTimelineFormData({
                                ...timelineFormData,
                                sourceTimelines: src.includes(t.id) ? src.filter((s) => s !== t.id) : [...src, t.id],
                              });
                            }}
                          />
                          {t.name}
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="form-group">
                    <label>カテゴリから追加</label>
                    <div className="category-checkboxes">
                      {allAvailableCategories.map((cat) => (
                        <label key={cat} className="category-checkbox">
                          <input
                            type="checkbox"
                            checked={timelineFormData.sourceCategories.includes(cat)}
                            onChange={() => {
                              const src = timelineFormData.sourceCategories;
                              setTimelineFormData({
                                ...timelineFormData,
                                sourceCategories: src.includes(cat) ? src.filter((s) => s !== cat) : [...src, cat],
                              });
                            }}
                          />
                          {cat}
                        </label>
                      ))}
                    </div>
                  </div>
                  <p className="form-preview">→ {formPreviewCount}件のイベント</p>
                  <div className="form-actions">
                    <button type="button" onClick={() => setTimelineFormData(null)}>
                      キャンセル
                    </button>
                    <button
                      type="button"
                      className="submit-btn"
                      disabled={!timelineFormData.name.trim() || formPreviewCount === 0}
                      onClick={saveUserTimeline}
                    >
                      作成
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        }
      />
      <Route
        path="/reading-network"
        element={
          <div className="app">
            <header className="app-header">
              <h1>読書順ネットワーク</h1>
            </header>
            <ReadingNetwork />
          </div>
        }
      />
      <Route path="*" element={<Navigate to="/timeline" replace />} />
    </Routes>
  );
}
