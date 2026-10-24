import express from 'express';
import dotenv from 'dotenv';
import { ConnectDb } from './Config/ConnectDb.js';
import cors from 'cors';
import { router } from './Routers/Router.js';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();
app.use(express.json());
const allowedOrigins = [
  "http://localhost:5173",
  "https://task-management-system-five-pink.vercel.app",
   "https://task-management-system-7imna6jo1-soumyakhare0001-1304s-projects.vercel.app"
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error(`Origin not allowed by CORS: ${origin}`));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(cookieParser());
app.use('/api', router);






const port = process.env.PORT || 5000

app.get('/', (req, res) => {
    res.json("hello");
})

app.listen(port, () => {
    console.log("listening to the port : ", port);
    ConnectDb();
})