export type TimelineEvent = {
  id: string;
  year: number;
  month?: number;
  day?: number;
  title: string;
  description: string;
  categories?: string[];
};

export type ResourceType = 'book' | 'article' | 'other';

export type Resource = {
  id: string;
  title: string;
  author?: string;
  url?: string;
  type: ResourceType;
  note?: string;
};

export type Edge = { from: string; to: string };

export type ReadingGraph = {
  resources: Resource[];
  edges: Edge[];
};
