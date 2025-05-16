import 'dotenv/config'
import express from 'express'
import cors from 'cors';
import connectDB from './configs/mongodb.js';

// app config
const PORT = process.env.PORT || 4000
const app = express()
await connectDB();

// intialize middleware
app.use(express.json())
app.use(cors())


// API Routes
app.get('/',(req,res) => res.send("API working"))


app.listen(PORT, () => console.log(`server is running on port ${PORT}`))

