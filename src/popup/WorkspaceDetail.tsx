import { Workspace } from '../types/workspace';

interface WorkspaceDetailProps {
  workspace: Workspace | null;
  onRestore: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function WorkspaceDetail({ workspace, onRestore, onDelete }: WorkspaceDetailProps) {
  if (!workspace) {
    return <p>Select a workspace to see its tabs.</p>;
  }

  return (
    <div>
      <h3>{workspace.name}</h3>
      <ul>
        {workspace.tabs.map((tab, i) => (
          <li key={i}>{tab.title}</li>
        ))}
      </ul>
      <button onClick={() => onRestore(workspace.id)}>Restore</button>
      <button onClick={() => onDelete(workspace.id)}>Delete</button>
    </div>
  );
}