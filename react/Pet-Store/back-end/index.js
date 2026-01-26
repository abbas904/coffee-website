//PACKAGES
import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { fileURLToPath } from "url";

//UTILS
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js"
import productRoutes from './routes/productRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import orderRoutes from './routes/orderRoutes.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config()
const port = process.env.PORT || 5000;

connectDB()

const app = express();

// CORS configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL || (process.env.NODE_ENV === 'production' ? false : 'http://localhost:5173'),
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

app.use(express.json());
app.use (express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/users", userRoutes) 
app.use("/api/category",categoryRoutes)
app.use('/api/products',productRoutes)
app.use('/api/upload',uploadRoutes)
app.use('/api/orders',orderRoutes)
app.get("/api/config/paypal", (req, res) => {
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID });
});


app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// Serve static files from the React app in production
if (process.env.NODE_ENV === 'production') {
  const frontendPath = path.join(__dirname, '../front-end/dist');
  app.use(express.static(frontendPath));
  
  // Handle React routing, return all requests to React app
  app.get('*', (req, res) => {
    res.sendFile(path.join(frontendPath, 'index.html'));
  });
}

app.listen(port, () => console.log(`Server running on port ${port}`));
