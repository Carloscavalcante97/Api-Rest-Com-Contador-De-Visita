import 'dotenv/config';
import express from 'express';
import routes from './routes/routes';
const app = express();
const port = process.env.HOST_PORT;

app.use(express.json());
app.use(routes)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})