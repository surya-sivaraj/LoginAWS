const express = require("express");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const connectDB = require("./config/db");
const cors = require("cors");

dotenv.config();

const app = express();

const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
connectDB();

app.use("/api/auth/",authRoutes);
app.get("/", (req, res) => {
    res.send("Login AWS Server is running");
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

console.log("Node process started");