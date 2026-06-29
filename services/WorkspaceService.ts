import { Tab, Workspace } from '../types/workspace';
import { WorkspaceRepository } from '../repositories/workspaceRepository';

export class WorkspaceService {
  private repo = new WorkspaceRepository();

  async saveCurrentTabs(): Promise<void> {
    const tabs = await this.queryTabs();
    await this.repo.save({ tabs });
  }

  async restoreTabs(): Promise<void> {
    const workspace = await this.repo.load();
    if (!workspace) return;
    workspace.tabs.forEach(tab => chrome.tabs.create({ url: tab.url }));
  }

  async loadSaved(): Promise<Workspace | null> {
    return this.repo.load();
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