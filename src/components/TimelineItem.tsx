import type { TimelineEvent } from '../types';

type Props = {
  event: TimelineEvent;
  position: 'left' | 'right';
  onEdit: (event: TimelineEvent) => void;
  onDelete: (id: string) => void;
  marginTop?: number;
  isEditable: boolean;
  onAddCategories?: (eventId: string) => void;
  compact?: boolean;
};

function formatDate(event: TimelineEvent): string {
  const parts: string[] = [String(event.year) + '年'];
  if (event.month) parts.push(String(event.month) + '月');
  if (event.day) parts.push(String(event.day) + '日');
  const start = parts.join('');
  if (event.endYear && event.endYear !== event.year) {
    return `${start}〜${event.endYear}年`;
  }
  return start;
}

export default function TimelineItem({ event, position, onEdit, onDelete, marginTop, isEditable, onAddCategories, compact }: Props) {
  return (
    <div
      className={`timeline-item ${position}`}
      style={marginTop != null ? { marginTop: `${marginTop}px` } : undefined}
    >
      <div className="timeline-card">
        <div className="timeline-card-header">
          <span className="timeline-date">{formatDate(event)}</span>
          {!compact && event.categories && event.categories.length > 0 && (
            <span className="timeline-categories">
              {event.categories.map((cat) => (
                <span key={cat} className="timeline-category">{cat}</span>
              ))}
            </span>
          )}
        </div>
        <h3 className="timeline-title">{event.title}</h3>
        {!compact && <p className="timeline-description">{event.description}</p>}
        {!compact && (
          <div className="timeline-actions">
            {isEditable ? (
              <>
                <button onClick={() => onEdit(event)}>編集</button>
                <button className="delete-btn" onClick={() => onDelete(event.id)}>
                  削除
                </button>
              </>
            ) : (
              <button onClick={() => onAddCategories?.(event.id)}>カテゴリ追加</button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
