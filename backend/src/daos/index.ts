import { Task } from './type';

export interface TaskDao {
  // Tạo một task mới
  create(task: Task): Promise<Task>;

  read(id: string): Promise<Task | undefined>;

  update(id: string, newData: Partial<Task>): Promise<Task>;

  delete(id: string): Promise<void>;

  getList(): Promise<Task[]>;
}
