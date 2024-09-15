import dotenv from "dotenv"
dotenv.config();

import express from "express"
import cors from "cors"
import bodyParser from "body-parser"

import connectToDatabase from "./config/database.js";
// Import Routes
import AuthRoutes from "./routes/auth.js"
import ProductRouter from "./routes/products.js";


const app = express();

app.use(cors);
app.use(express.json());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.get('/' ,(req,res) => {
    res.end("Server is running")
})

// Auth Routes
app.use("/api/v1/user", AuthRoutes);
app.use("/api/v1/product", ProductRouter);

const startServer = async () => {
    try{
       const PORT = process.env.PORT || 9000;
       const DB_URL = process.env.DB_URL;

       await connectToDatabase(DB_URL);
       app.listen(PORT, () => {
         console.log(` Server is listing on port : ${PORT}`);
       })
    } catch(error) {
       console.log(error);
       exit(1)
    }
}

startServer();
