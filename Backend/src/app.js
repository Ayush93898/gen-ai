const express = require('express');

const app = express();
const authRouter = require('./routes/auth.routes');

//middleware
app.use(express.json());

/* Using all the routes here */
app.use("/api/auth",authRouter)

module.exports = app