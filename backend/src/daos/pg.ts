import { Pool } from 'pg';
import { TaskDao } from './index';
import { Task } from './type';
import { db } from '~/config/database/pg';
import { HttpError } from '~/utils/error';

export class PgTaskDao implements TaskDao {
  private pool: Pool;

  constructor() {
    this.pool = db;
    db.connect();
  }

  async create(task: Task): Promise<Task> {
    const query = `
      INSERT INTO tasks (id, title, description, state)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    const values = [task.id, task.title, task.description, task.state];
    const result = await this.pool.query(query, values);
    return result.rows[0];
  }

  async read(id: string): Promise<Task | undefined> {
    const query = `
      SELECT * FROM tasks WHERE id = $1;
    `;
    const result = await this.pool.query(query, [id]);
    return result.rows[0] || undefined;
  }

  async update(id: string, newData: Partial<Task>): Promise<Task> {
    const fields = [];
    const values = [];
    let index = 1;

    for (const [key, value] of Object.entries(newData)) {
      fields.push(`${key} = $${index}`);
      values.push(value);
      index++;
    }

    const query = `
      UPDATE tasks
      SET ${fields.join(', ')}
      WHERE id = $${index}
      RETURNING *;
    `;
    values.push(id);

    const result = await this.pool.query(query, values);
    if (result.rows.length === 0) {
      throw new HttpError('Task not found', 404);
    }
    return result.rows[0];
  }

  async delete(id: string): Promise<void> {
    const query = `
      DELETE FROM tasks WHERE id = $1;
    `;
    const result = await this.pool.query(query, [id]);
    if (result.rowCount === 0) {
      throw new HttpError('Task not found', 404);
    }
  }

  async getList(): Promise<Task[]> {
    const query = `
      SELECT * FROM tasks ORDER BY id ASC;
    `;
    const result = await this.pool.query(query);
    return result.rows;
  }
}
