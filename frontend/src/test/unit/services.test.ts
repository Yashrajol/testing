import { describe, it, expect, beforeEach } from 'vitest';
import { PwaService } from '@/features/pwa/services/pwa.service';

describe('PWA & Offline Storage Services', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should save and retrieve offline assignment drafts', () => {
    const draft = PwaService.saveOfflineDraft('assignment', 'Calculus Homework', 'Solved problems 1-10');
    expect(draft.id).toBeDefined();
    expect(draft.type).toBe('assignment');
    expect(draft.title).toBe('Calculus Homework');

    const draftsList = PwaService.getOfflineDrafts();
    expect(draftsList.length).toBe(1);
    expect(draftsList[0].title).toBe('Calculus Homework');
  });

  it('should remove synced offline drafts cleanly', () => {
    const draft = PwaService.saveOfflineDraft('note', 'Physics Notes', 'Kinematics formulas');
    let draftsList = PwaService.getOfflineDrafts();
    expect(draftsList.length).toBe(1);

    PwaService.removeOfflineDraft(draft.id);
    draftsList = PwaService.getOfflineDrafts();
    expect(draftsList.length).toBe(0);
  });

  it('should cache and retrieve offline learning resources', () => {
    PwaService.cacheResource('res-1', 'Organic Chemistry Guide', 'Chemistry', 'PDF');
    const resources = PwaService.getCachedResources();
    expect(resources.length).toBe(1);
    expect(resources[0].title).toBe('Organic Chemistry Guide');
  });
});
