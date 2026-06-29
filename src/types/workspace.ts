export interface Tab {
  title: string;
  url: string;
}

export interface Workspace {
  tabs: Tab[];
}