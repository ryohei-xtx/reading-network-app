import { useMemo } from 'react';
import type { TimelineEvent } from '../types';
import './TimelineTable.css';

type Props = {
  events: TimelineEvent[];
  selectedCategories: string[];
  onEdit: (event: TimelineEvent) => void;
  onDelete: (id: string) => void;
  showGaps?: boolean;
  isEventEditable: (eventId: string) => boolean;
  onAddCategories?: (eventId: string) => void;
  compact?: boolean;
};

const SHARED_COLORS = [
  '#fde68a', // amber
  '#a7f3d0', // emerald
  '#bfdbfe', // blue
  '#ddd6fe', // violet
  '#fecaca', // red
  '#fbcfe8', // pink
  '#99f6e4', // teal
  '#fed7aa', // orange
];

function formatDate(event: TimelineEvent): string {
  const parts: string[] = [String(event.year) + '年'];
  if (event.month) parts.push(String(event.month) + '月');
  if (event.day) parts.push(String(event.day) + '日');
  return parts.join('');
}

function toDecimalYear(e: TimelineEvent): number {
  return e.year + ((e.month ?? 1) - 1) / 12 + ((e.day ?? 1) - 1) / 365;
}

function formatGap(from: TimelineEvent, to: TimelineEvent): string {
  const diff = toDecimalYear(to) - toDecimalYear(from);
  if (diff >= 1) {
    const years = Math.floor(diff);
    const months = Math.round((diff - years) * 12);
    if (months === 0) return `${years}年`;
    return `${years}年${months}ヶ月`;
  }
  const months = Math.round(diff * 12);
  if (months === 0) return '';
  return `${months}ヶ月`;
}

export default function TimelineTable({
  events,
  selectedCategories,
  onEdit,
  onDelete,
  showGaps,
  isEventEditable,
  onAddCategories,
  compact,
}: Props) {
  const sharedColorMap = useMemo(() => {
    const map = new Map<string, string>();
    let colorIndex = 0;
    for (const event of events) {
      const matched = selectedCategories.filter((cat) =>
        event.categories?.includes(cat),
      );
      if (matched.length >= 2) {
        map.set(event.id, SHARED_COLORS[colorIndex % SHARED_COLORS.length]);
        colorIndex++;
      }
    }
    return map;
  }, [events, selectedCategories]);

  if (selectedCategories.length === 0) {
    return (
      <div className="table-empty">
        カテゴリを選択してください。
      </div>
    );
  }

  const relevantEvents = events;

  if (relevantEvents.length === 0) {
    return (
      <div className="table-empty">
        該当するイベントがありません。
      </div>
    );
  }

  const colCount = selectedCategories.length + 2;

  const rows: React.ReactNode[] = [];
  for (let i = 0; i < relevantEvents.length; i++) {
    if (showGaps && i > 0) {
      const gap = formatGap(relevantEvents[i - 1], relevantEvents[i]);
      if (gap) {
        rows.push(
          <tr key={`gap-${i}`} className="gap-row">
            <td colSpan={colCount}>
              <span className="gap-label">{gap}</span>
            </td>
          </tr>,
        );
      }
    }

    const event = relevantEvents[i];
    const bgColor = sharedColorMap.get(event.id);
    const editable = isEventEditable(event.id);
    rows.push(
      <tr key={event.id}>
        <td className="col-date">{formatDate(event)}</td>
        <td className="cell-active col-summary">
          <div className="cell-content">
            <strong>{event.title}</strong>
            {!compact && <p>{event.description}</p>}
            {!compact && (
              <div className="cell-actions">
                {editable ? (
                  <>
                    <button onClick={() => onEdit(event)}>編集</button>
                    <button
                      className="delete-btn"
                      onClick={() => onDelete(event.id)}
                    >
                      削除
                    </button>
                  </>
                ) : (
                  <button onClick={() => onAddCategories?.(event.id)}>
                    カテゴリ追加
                  </button>
                )}
              </div>
            )}
          </div>
        </td>
        {selectedCategories.map((cat) => {
          const belongs = event.categories?.includes(cat);
          return (
            <td
              key={cat}
              className={belongs ? 'cell-active' : 'cell-empty'}
              style={belongs && bgColor ? { backgroundColor: bgColor } : undefined}
            >
              {belongs && (
                <div className="cell-content">
                  <strong>{event.title}</strong>
                </div>
              )}
            </td>
          );
        })}
      </tr>,
    );
  }

  return (
    <div className="timeline-table-wrapper">
      <table className="timeline-table">
        <thead>
          <tr>
            <th className="col-date">日付</th>
            <th className="col-summary">まとめ</th>
            {selectedCategories.map((cat) => (
              <th key={cat}>{cat}</th>
            ))}
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </div>
  );
}
