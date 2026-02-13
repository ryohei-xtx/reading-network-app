import type { TimelineEvent } from '../types';
import TimelineItem from './TimelineItem';
import './Timeline.css';

type Props = {
  events: TimelineEvent[];
  onEdit: (event: TimelineEvent) => void;
  onDelete: (id: string) => void;
};

export default function Timeline({ events, onEdit, onDelete }: Props) {
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
        />
      ))}
    </div>
  );
}
