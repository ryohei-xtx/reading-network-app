import { useState, useEffect } from 'react';
import type { TimelineEvent } from '../types';
import './EventForm.css';

type Props = {
  event?: TimelineEvent;
  onSubmit: (event: TimelineEvent) => void;
  onCancel: () => void;
};

export default function EventForm({ event, onSubmit, onCancel }: Props) {
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!year || !title) return;

    onSubmit({
      id: event?.id ?? crypto.randomUUID(),
      year: Number(year),
      month: month ? Number(month) : undefined,
      day: day ? Number(day) : undefined,
      title,
      description,
      categories: category
        ? category.split(/[、,]/).map((s) => s.trim()).filter(Boolean)
        : undefined,
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

      <div className="form-actions">
        <button type="button" onClick={onCancel}>キャンセル</button>
        <button type="submit" className="submit-btn">
          {event ? '更新' : '追加'}
        </button>
      </div>
    </form>
  );
}
