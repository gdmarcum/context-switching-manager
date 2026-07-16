import { useState, useEffect } from 'react';
import { WorkspaceService } from '../services/WorkspaceService';
import { WorkspaceMap } from '../types/workspace';
import WorkspaceList from './WorkspaceList';
import WorkspaceDetail from './WorkspaceDetail';
import SaveWorkspaceModal from './SaveWorkspaceModal';

const service = new WorkspaceService();

export default function App() {
  const [workspaces, setWorkspaces] = useState<WorkspaceMap>({});
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    refresh();
  }, []);

  async function refresh() {
    const all = await service.loadAllWorkspaces();
    setWorkspaces(all);
  }

  async function handleSave(name: string) {
    await service.saveCurrentTabsAsWorkspace(name);
    await refresh();
    setModalOpen(false);
  }

  async function handleRestore(id: string) {
    await service.restoreWorkspace(id);
  }

  async function handleDelete(id: string) {
    await service.deleteWorkspace(id);
    await refresh();
    if (selectedId === id) {
      setSelectedId(null);
    }
  }

  return (
    <div style={{ padding: '8px', width: '250px' }}>
      <button onClick={() => setModalOpen(true)}>Save Current Tabs</button>

      {modalOpen && (
        <SaveWorkspaceModal
          onSave={handleSave}
          onClose={() => setModalOpen(false)}
        />
      )}

      <WorkspaceList
        workspaces={workspaces}
        selectedId={selectedId}
        onSelect={setSelectedId}
      />

      <WorkspaceDetail
        workspace={selectedId ? workspaces[selectedId] : null}
        onRestore={handleRestore}
        onDelete={handleDelete}
      />
    </div>
  );
}