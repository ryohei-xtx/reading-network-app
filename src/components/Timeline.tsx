import { useMemo } from 'react';
import type { TimelineEvent } from '../types';
import TimelineItem from './TimelineItem';
import './Timeline.css';

type Props = {
  events: TimelineEvent[];
  onEdit: (event: TimelineEvent) => void;
  onDelete: (id: string) => void;
  proportional?: boolean;
  isEventEditable: (eventId: string) => boolean;
  onAddCategories?: (eventId: string) => void;
  compact?: boolean;
};

function toDecimalYear(e: TimelineEvent): number {
  return e.year + ((e.month ?? 1) - 1) / 12 + ((e.day ?? 1) - 1) / 365;
}

const MIN_MARGIN = 16;
const PX_PER_YEAR = 8;
const MAX_MARGIN = 200;

export default function Timeline({ events, onEdit, onDelete, proportional, isEventEditable, onAddCategories, compact }: Props) {
  const margins = useMemo(() => {
    if (!proportional || events.length < 2) return null;
    const result: number[] = [0];
    for (let i = 1; i < events.length; i++) {
      const gapYears = toDecimalYear(events[i]) - toDecimalYear(events[i - 1]);
      result.push(Math.max(MIN_MARGIN, Math.min(gapYears * PX_PER_YEAR, MAX_MARGIN)));
    }
    return result;
  }, [events, proportional]);

  if (events.length === 0) {
    return <div className="timeline-empty">イベントがありません。追加してください。</div>;
  }

  return (
    <div className="timeline">
      {events.map((event, index) => (
        <TimelineItem
          key={event.id}
          event={event}
          position={index % 2 === 0 ? 'left' : 'right'}
          onEdit={onEdit}
          onDelete={onDelete}
          marginTop={margins?.[index]}
          isEditable={isEventEditable(event.id)}
          onAddCategories={onAddCategories}
          compact={compact}
        />
      ))}
    </div>
  );
}
