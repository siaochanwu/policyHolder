import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import sequelize from './configs/db';
import policyholderRoute from './routes/policyholderRoute';
import setupSwagger from './swaggerConfig';

const app = express();
app.use(bodyParser.json());
setupSwagger(app);
app.use('/api', policyholderRoute);

const start = async (): Promise<void> => {
  try {
    await sequelize.sync();
  } catch (err) {
    console.error(err);
  }
};
void start();

const port = process.env.PORT || 3000;

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
  });
};

export default app;
