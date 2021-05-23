import mongoose from 'mongoose';
import 'dotenv/config';
import app from './app';

mongoose.connect(
  process.env.MONGO_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
);

app.listen(3333);