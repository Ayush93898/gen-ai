require('dotenv').config();
const app = require("./src/app");
const connectDb = require('./src/config/database');
connectDb() // connect to tha database


const PORT = process.env.PORT || 5500
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
