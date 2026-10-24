
import express from 'express';
import dotenv from 'dotenv';
import { ConnectDb } from './Config/ConnectDb.js';
import cors from 'cors';
import { router } from './Routers/Router.js';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

const allowedOrigins = [
  'http://localhost:5173',
  'https://task-management-system-five-pink.vercel.app'
];

const isAllowedOrigin = (origin) => {
  if (!origin) return true;

  if (allowedOrigins.includes(origin)) {
    return true;
  }

  return /^https:\/\/task-management-system(?:-[a-z0-9-]+)?-soumyakhare0001-1304s-projects\.vercel\.app$/.test(origin);
};

app.use(cors({
  origin: (origin, callback) => {
    if (isAllowedOrigin(origin)) {
      return callback(null, true);
    }

    console.error('Blocked CORS origin:', origin);
    return callback(new Error(`Origin not allowed by CORS: ${origin}`));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
  res.json('hello');
});

app.use('/api', router);

const startServer = async () => {
  try {
    await ConnectDb();

    app.listen(port, () => {
      console.log('Listening on port:', port);
    });
  } catch (error) {
    console.error('Failed to connect to the database:', error);
    process.exit(1);
  }
};

startServer();
