import express from 'express';
import cors from 'cors';
import routes from './routes';
import dotenv from 'dotenv';

dotenv.config({ path: '../../../.env' });

const PORT = Number(process.env.I18N_PORT);
const HOST = process.env.I18N_HOST!;

const app = express();

app.use(express.json());
app.use(cors({
  credentials: true,
}));

app.use('/', routes);

app.listen(PORT, HOST,() => {
  // eslint-disable-next-line no-console
  console.log(`Listening to ${HOST}:${PORT}`);
});