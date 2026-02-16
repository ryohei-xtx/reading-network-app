import { useState, useEffect } from 'react';
import type { TimelineEvent, UserTimeline } from '../types';
import './EventForm.css';

type Props = {
  event?: TimelineEvent;
  onSubmit: (event: TimelineEvent) => void;
  onCancel: () => void;
  userTimelines?: UserTimeline[];
};

export default function EventForm({ event, onSubmit, onCancel, userTimelines = [] }: Props) {
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [targetUserTimelines, setTargetUserTimelines] = useState<string[]>([]);

  useEffect(() => {
    if (event) {
      setYear(String(event.year));
      setMonth(event.month ? String(event.month) : '');
      setDay(event.day ? String(event.day) : '');
      setTitle(event.title);
      setDescription(event.description);
      setCategory(event.categories?.join('、') ?? '');
    }
  }, [event]);

  const toggleTarget = (id: string) => {
    setTargetUserTimelines((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id],
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!year || !title) return;

    const inputCategories = category
      ? category.split(/[、,]/).map((s) => s.trim()).filter(Boolean)
      : [];

    // Merge sourceCategories from selected user timelines
    const extraCategories = new Set<string>();
    for (const utId of targetUserTimelines) {
      const ut = userTimelines.find((u) => u.id === utId);
      if (ut) {
        for (const c of ut.sourceCategories) extraCategories.add(c);
      }
    }
    const merged = [...new Set([...inputCategories, ...extraCategories])];

    onSubmit({
      id: event?.id ?? crypto.randomUUID(),
      year: Number(year),
      month: month ? Number(month) : undefined,
      day: day ? Number(day) : undefined,
      title,
      description,
      categories: merged.length > 0 ? merged : undefined,
    });
  };

  return (
    <form className="event-form" onSubmit={handleSubmit} onClick={(e) => e.stopPropagation()}>
      <h2>{event ? 'イベントを編集' : 'イベントを追加'}</h2>

      <div className="form-row">
        <div className="form-group">
          <label>年 *</label>
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>月</label>
          <input
            type="number"
            min="1"
            max="12"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>日</label>
          <input
            type="number"
            min="1"
            max="31"
            value={day}
            onChange={(e) => setDay(e.target.value)}
          />
        </div>
      </div>

      <div className="form-group">
        <label>タイトル *</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label>説明</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>カテゴリ</label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="例: 科学、政治、技術（カンマ区切りで複数入力）"
        />
      </div>

      {userTimelines.length > 0 && !event && (
        <div className="form-group">
          <label>追加先の年表</label>
          <div className="category-checkboxes">
            {userTimelines.map((ut) => (
              <label key={ut.id} className="category-checkbox">
                <input
                  type="checkbox"
                  checked={targetUserTimelines.includes(ut.id)}
                  onChange={() => toggleTarget(ut.id)}
                />
                {ut.name}
              </label>
            ))}
          </div>
        </div>
      )}

      <div className="form-actions">
        <button type="button" onClick={onCancel}>キャンセル</button>
        <button type="submit" className="submit-btn">
          {event ? '更新' : '追加'}
        </button>
      </div>
    </form>
  );
}
