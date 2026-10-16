require('dotenv').config();
const app = require("./src/app");
const connectDb = require('./src/config/database');
const generateInterviewReport = require('./src/services/ai.service');
const { resume,selfDescription,jobDescription } = require('./src/services/temp');


connectDb() // connect to tha database

generateInterviewReport({resume,selfDescription,jobDescription})

const PORT = process.env.PORT || 5500
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
