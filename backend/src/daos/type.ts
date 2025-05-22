export type Task = {
  id: string;
  title: string;
  description: string;
  state: 'todo' | 'in-progress' | 'done';
};
