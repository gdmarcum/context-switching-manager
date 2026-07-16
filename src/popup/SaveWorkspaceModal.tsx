import { useState } from 'react';

interface SaveWorkspaceModalProps {
  onSave: (name: string) => void;
  onClose: () => void;
}

export default function SaveWorkspaceModal({ onSave, onClose }: SaveWorkspaceModalProps) {
  const [name, setName] = useState('');

  function handleSubmit() {
    if (name.trim() === '') return;
    onSave(name.trim());
    setName('');
  }

  return (
    <div style={{ border: '1px solid black', padding: '8px', marginTop: '8px' }}>
      <input
        type="text"
        placeholder="Workspace name"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <button onClick={handleSubmit}>Save</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
}