import { WorkspaceMap, Workspace } from '../types/workspace';

export class WorkspaceRepository {
  saveAll(workspaces: WorkspaceMap): Promise<void> {
    return new Promise((resolve) => {
      chrome.storage.local.set({ workspaces }, resolve);
    });
  }

  loadAll(): Promise<WorkspaceMap> {
    return new Promise((resolve) => {
      chrome.storage.local.get(
        ['workspaces'],
        (result: { workspaces?: WorkspaceMap }) => {
          resolve(result.workspaces ?? {});
        }
      );
    });
  }

  async saveOne(workspace: Workspace): Promise<void> {
    const all = await this.loadAll();
    all[workspace.id] = workspace;
    await this.saveAll(all);
  }

  async deleteOne(id: string): Promise<void> {
    const all = await this.loadAll();
    delete all[id];
    await this.saveAll(all);
  }
}