import { Application, json } from 'express';

import cors from 'cors';

export const configWeb = (app: Application) => {
  //Cors
  app.use(
    cors({
      origin: 'http://localhost:5173',
      credentials: true,
    }),
  );

  app.use(json());
};
