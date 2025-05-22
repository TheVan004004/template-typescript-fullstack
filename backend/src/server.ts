import express from 'express';

import { MongoTaskDao } from './daos/mongo';
import { initRoute } from './routes';
import { configWeb } from './config';
import { PgTaskDao } from './daos/pg';
import { errorHandler } from './middleware/error';

const app = express();
const PORT = process.env.PORT || 4000;
const HOST = process.env.HOST || 'localhost';

// config engine
configWeb(app);

const taskDao = new MongoTaskDao();
// const taskDao = new PgTaskDao();

// init api
initRoute(taskDao, app);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running at http://${HOST}:${PORT}`);
});
