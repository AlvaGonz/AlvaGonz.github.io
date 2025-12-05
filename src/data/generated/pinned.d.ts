import type { Project } from '../../content/types';

export interface PinnedData {
  projects: Project[];
  fetchedAt: string;
  source: 'graphql' | 'rest' | 'fallback';
}

declare const pinnedData: PinnedData;
export default pinnedData;

