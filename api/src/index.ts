import express from 'express';
import cors from 'cors';
import { bookRoutes, loanRoutes, configRoutes } from './routes';
import { listBookLoans } from './endpoints/listBookLoans'; //TODO: remove

const API_PORT = 8080;

const api = express();

api.use(
  cors({
    origin: '*',
  }),
);
api.use(express.json());

api.use('/books', bookRoutes);
api.use('/loans', loanRoutes);
api.use('/config', configRoutes);

api.get('/', (req, res) => {
  res.send('API is up');
});
api.get('/book-loans', listBookLoans); // TODO: remove

api.listen(API_PORT, '0.0.0.0', () => {
  console.log(`API running on port ${API_PORT}`);
});
