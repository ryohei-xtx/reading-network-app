import { useState } from 'react';
import type { Resource, ResourceType } from '../types';

type Props = {
  resource?: Resource;
  onSubmit: (resource: Resource) => void;
  onCancel: () => void;
};

export default function ResourceForm({ resource, onSubmit, onCancel }: Props) {
  const [title, setTitle] = useState(resource?.title ?? '');
  const [author, setAuthor] = useState(resource?.author ?? '');
  const [url, setUrl] = useState(resource?.url ?? '');
  const [type, setType] = useState<ResourceType>(resource?.type ?? 'book');
  const [note, setNote] = useState(resource?.note ?? '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSubmit({
      id: resource?.id ?? crypto.randomUUID(),
      title: title.trim(),
      author: author.trim() || undefined,
      url: url.trim() || undefined,
      type,
      note: note.trim() || undefined,
    });
  };

  return (
    <form
      className="resource-form"
      onSubmit={handleSubmit}
      onClick={(e) => e.stopPropagation()}
    >
      <h2>{resource ? 'リソースを編集' : 'リソースを追加'}</h2>

      <label>
        タイプ
        <select value={type} onChange={(e) => setType(e.target.value as ResourceType)}>
          <option value="book">本</option>
          <option value="article">Web記事</option>
          <option value="other">その他</option>
        </select>
      </label>

      <label>
        タイトル *
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </label>

      <label>
        著者
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
      </label>

      <label>
        URL
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://..."
        />
      </label>

      <label>
        メモ
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={3}
        />
      </label>

      <div className="form-actions">
        <button type="button" onClick={onCancel}>
          キャンセル
        </button>
        <button type="submit" className="primary">
          {resource ? '更新' : '追加'}
        </button>
      </div>
    </form>
  );
}
