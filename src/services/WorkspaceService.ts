import { Tab, Workspace, WorkspaceMap } from '../types/workspace';
import { WorkspaceRepository } from '../repositories/WorkspaceRepository';

export class WorkspaceService {
  private repo = new WorkspaceRepository();

  async saveCurrentTabsAsWorkspace(name: string): Promise<Workspace> {
    const tabs = await this.queryTabs();
    const workspace: Workspace = {
      id: crypto.randomUUID(),
      name,
      tabs,
    };
    await this.repo.saveOne(workspace);
    return workspace;
  }

  async restoreWorkspace(id: string): Promise<void> {
    const all = await this.repo.loadAll();
    const workspace = all[id];
    if (!workspace) return;
    workspace.tabs.forEach(tab => chrome.tabs.create({ url: tab.url }));
  }

  async deleteWorkspace(id: string): Promise<void> {
    await this.repo.deleteOne(id);
  }

  async loadAllWorkspaces(): Promise<WorkspaceMap> {
    return this.repo.loadAll();
  }

  private queryTabs(): Promise<Tab[]> {
    return new Promise((resolve) => {
      chrome.tabs.query({ currentWindow: true }, (tabs) => {
        resolve(tabs.map(tab => ({
          title: tab.title ?? 'Untitled',
          url: tab.url ?? ''
        })));
      });
    });
  }
}