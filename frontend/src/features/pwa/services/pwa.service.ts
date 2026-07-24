import { OfflineDraft, OfflineResource } from '../types';

const DRAFTS_STORAGE_KEY = 'vedhkrit_offline_drafts';
const RESOURCES_STORAGE_KEY = 'vedhkrit_offline_resources';

export const PwaService = {
  // Save Offline Draft (Assignment / Note / Planner)
  saveOfflineDraft(type: 'assignment' | 'note' | 'planner', title: string, content: string): OfflineDraft {
    const drafts = this.getOfflineDrafts();
    const newDraft: OfflineDraft = {
      id: `draft_${Date.now()}`,
      type,
      title,
      content,
      savedAt: new Date().toISOString(),
      synced: false,
    };
    drafts.unshift(newDraft);
    if (typeof window !== 'undefined') {
      localStorage.setItem(DRAFTS_STORAGE_KEY, JSON.stringify(drafts));
    }
    return newDraft;
  },

  // Get All Offline Drafts
  getOfflineDrafts(): OfflineDraft[] {
    if (typeof window === 'undefined') return [];
    try {
      const data = localStorage.getItem(DRAFTS_STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  // Clear Synced Draft
  removeOfflineDraft(id: string) {
    const drafts = this.getOfflineDrafts().filter((d) => d.id !== id);
    if (typeof window !== 'undefined') {
      localStorage.setItem(DRAFTS_STORAGE_KEY, JSON.stringify(drafts));
    }
  },

  // Cache Learning Resource Metadata
  cacheResource(id: string, title: string, subject: string, type: string) {
    const resources = this.getCachedResources();
    if (!resources.some((r) => r.id === id)) {
      resources.push({ id, title, subject, type, cachedAt: new Date().toISOString() });
      if (typeof window !== 'undefined') {
        localStorage.setItem(RESOURCES_STORAGE_KEY, JSON.stringify(resources));
      }
    }
  },

  // Get Cached Resources
  getCachedResources(): OfflineResource[] {
    if (typeof window === 'undefined') return [];
    try {
      const data = localStorage.getItem(RESOURCES_STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },
};
