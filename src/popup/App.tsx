import { useState, useEffect } from 'react';
import { WorkspaceService } from '../services/WorkspaceService';
import { Tab } from '../types/workspace';

const service = new WorkspaceService();

export default function App() {
  const [tabs, setTabs] = useState<Tab[]>([]);

  useEffect(() => {
    service.loadSaved().then(workspace => {
      if (workspace) setTabs(workspace.tabs);
    });
  }, []);

  async function handleSave() {
    await service.saveCurrentTabs();
    const workspace = await service.loadSaved();
    if (workspace) setTabs(workspace.tabs);
  }

  async function handleRestore() {
    await service.restoreTabs();
  }

  return (
    <div>
      <button onClick={handleSave}>Save Workspace</button>
      <button onClick={handleRestore}>Restore Workspace</button>
      <ul>
        {tabs.map((tab, i) => (
          <li key={i}>{tab.title}</li>
        ))}
      </ul>
    </div>
  );
}