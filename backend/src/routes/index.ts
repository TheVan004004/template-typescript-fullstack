/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Application } from 'express';
import { TaskDao } from '~/daos';

const router = express.Router();

export const initRoute = (taskDao: TaskDao, app: Application) => {
  router.post('/create', async (req, res) => {
    const task = await taskDao.create(req.body);
    res.status(201).json(task);
  });

  router.get('/get/:id', async (req, res) => {
    const task = await taskDao.read(req.params.id);
    res.status(200).json(task);
  });

  router.put('/update/:id', async (req, res) => {
    const updatedTask = await taskDao.update(req.params.id, req.body);
    res.status(200).json(updatedTask);
  });

  router.delete('/delete/:id', async (req, res) => {
    await taskDao.delete(req.params.id);
    res.status(200).json({ message: 'Task deleted successfully' });
  });

  router.get('/get_all', async (_req, res) => {
    const tasks = await taskDao.getList();
    res.status(200).json(tasks);
  });

  app.use('/template', router);
};
