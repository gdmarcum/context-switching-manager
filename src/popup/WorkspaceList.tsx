import { WorkspaceMap } from '../types/workspace';

interface WorkspaceListProps {
  workspaces: WorkspaceMap;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export default function WorkspaceList({ workspaces, selectedId, onSelect }: WorkspaceListProps) {
  const list = Object.values(workspaces);

  if (list.length === 0) {
    return <p>No saved workspaces yet.</p>;
  }

  return (
    <ul>
      {list.map(workspace => (
        <li
          key={workspace.id}
          onClick={() => onSelect(workspace.id)}
          style={{
            fontWeight: workspace.id === selectedId ? 'bold' : 'normal',
            cursor: 'pointer',
          }}
        >
          {workspace.name}
        </li>
      ))}
    </ul>
  );
}