import { Collection } from 'mongodb';
import { TaskDao } from './index';
import { mongoClient, DatabaseName } from '~/config/database/mongo';
import { HttpError } from '~/utils/error';
import { Task } from './type';

export class MongoTaskDao implements TaskDao {
  private collection: Collection<Task & { _id: string }>;

  constructor() {
    this.collection = mongoClient.db(DatabaseName).collection('tasks');
  }

  async create(task: Task): Promise<Task> {
    // Gán _id = task.id để MongoDB không tự tạo ObjectId
    await this.collection.insertOne({ ...task, _id: task.id });
    return task;
  }

  async read(id: string): Promise<Task | undefined> {
    const task = await this.collection.findOne({ _id: id });
    if (!task) return undefined;

    const { _id, ...rest } = task;
    return { ...rest, id: _id };
  }

  async update(id: string, newData: Partial<Task>): Promise<Task> {
    const result = await this.collection.findOneAndUpdate({ _id: id }, { $set: newData }, { returnDocument: 'after' });

    if (!result?.title) {
      throw new HttpError('Task not found', 404);
    }

    const { _id, ...rest } = result;
    return { ...rest, id: _id };
  }

  async delete(id: string): Promise<void> {
    const result = await this.collection.deleteOne({ _id: id });
    if (result.deletedCount === 0) {
      throw new HttpError('Task not found', 404);
    }
  }

  async getList(): Promise<Task[]> {
    const tasks = await this.collection.find().toArray();
    return tasks.map(({ _id, ...rest }) => ({
      ...rest,
      id: _id,
    }));
  }
}
