const express = require('express');
const errorHandler = require('./src/middleware/errorMiddleware');
const dotEnv = require('dotenv').config();
const cors = require('cors');
const connectDB = require('./src/config/db');
const port = process.env.port || 5000;

connectDB();

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: false }));

app.use(cors({
  origin: ["https://goal-setter-opal.vercel.app", "https://goal-setter-dhaneshrajpm.vercel.app"],
  credentials: true
}));

app.use('/api/goals', require('./src/routes/goalRoutes'));
app.use('/api/users', require('./src/routes/userRoutes'));

app.use(errorHandler)

app.listen(port, () => {
  console.log('server is up and running on ' + port);
});
