import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import sequelize from './configs/db';
import policyholderRoute from './routes/policyholderRoute';


const app = express();
app.use(bodyParser.json());
app.use('/api', policyholderRoute);


const port = process.env.PORT || 3000;


sequelize.sync().then(() => {
    console.log('Database synced');
  }).catch((err) => {
    console.error('Failed to sync database:', err);
  });

app.listen(port, async () => {
    console.log(`Server is running on port ${port}`);
});
