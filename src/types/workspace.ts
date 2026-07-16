export interface Tab {
  title: string;
  url: string;
}

export interface Workspace {
  id: string;
  name: string;
  tabs: Tab[];
}

export type WorkspaceMap = Record<string, Workspace>;