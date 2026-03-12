const express = require('express');
const cookieParser = require('cookie-parser')

const app = express();
const authRouter = require('./routes/auth.routes');

//middleware
app.use(express.json());
app.use(cookieParser())

/* Using all the routes here */
app.use("/api/auth",authRouter)

module.exports = app