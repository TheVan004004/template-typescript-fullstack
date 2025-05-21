import express from 'express';

const app = express();
const PORT = process.env.PORT || 4000;
const HOST = process.env.HOST || 'localhost';

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`Server is running at http://${HOST}:${PORT}`);
});
