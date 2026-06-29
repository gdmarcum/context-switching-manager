import { Workspace } from '../types/workspace';

export class WorkspaceRepository {
  save(workspace: Workspace): Promise<void> {
    return new Promise((resolve) => {
      chrome.storage.local.set({ workspace }, resolve);
    });
  }

  load(): Promise<Workspace | null> {
    return new Promise((resolve) => {
      chrome.storage.local.get(
        ['workspace'],
        (result: { workspace?: Workspace }) => {
          resolve(result.workspace ?? null);
        }
      );
    });
  }
}