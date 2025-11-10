import express from "express";
import dotenv from "dotenv";

dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => res.send("Hello world"));

app.listen(PORT, () => console.log(`The server is running on port ${PORT}`));
