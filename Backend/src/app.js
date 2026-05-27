const express = require('express');
const cookieParser = require('cookie-parser')
const cors = require('cors')

const app = express();

/* requrie all the routes here */
const authRouter = require('./routes/auth.routes');

//middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true // as cookies se data handle karna hoga
}))

/* Using all the routes here */
app.use("/api/auth",authRouter)

module.exports = app