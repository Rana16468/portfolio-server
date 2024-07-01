import express from 'express';
import cors from 'cors';
import notFound from './app/middleware/notFound';
import globalErrorHandelar from './app/middleware/globalErrorHandelar';
import router from './app/routes';

const app = express();

app.use(express.json());
//middlewere
//credentials:true
//https://shoes-client.vercel.app
app.use(cors());

app.get('/', (req, res) => {
  res.send({ status: true, message: 'Well Come To My Portfolio Server' });
});
// username:myportfolio
// password: 7MzHVFzfOUneZsEg

// Error Handeller

// router handeller
app.use('/api/v1',router);

app.use(notFound);
app.use(globalErrorHandelar);

export default app;
