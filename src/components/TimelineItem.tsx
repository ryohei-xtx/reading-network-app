import type { TimelineEvent } from '../types';

type Props = {
  event: TimelineEvent;
  position: 'left' | 'right';
  onEdit: (event: TimelineEvent) => void;
  onDelete: (id: string) => void;
};

function formatDate(event: TimelineEvent): string {
  const parts: string[] = [String(event.year) + '年'];
  if (event.month) parts.push(String(event.month) + '月');
  if (event.day) parts.push(String(event.day) + '日');
  return parts.join('');
}

export default function TimelineItem({ event, position, onEdit, onDelete }: Props) {
  return (
    <div className={`timeline-item ${position}`}>
      <div className="timeline-card">
        <div className="timeline-card-header">
          <span className="timeline-date">{formatDate(event)}</span>
          {event.categories && event.categories.length > 0 && (
            <span className="timeline-categories">
              {event.categories.map((cat) => (
                <span key={cat} className="timeline-category">{cat}</span>
              ))}
            </span>
          )}
        </div>
        <h3 className="timeline-title">{event.title}</h3>
        <p className="timeline-description">{event.description}</p>
        <div className="timeline-actions">
          <button onClick={() => onEdit(event)}>編集</button>
          <button className="delete-btn" onClick={() => onDelete(event.id)}>
            削除
          </button>
        </div>
      </div>
    </div>
  );
}
