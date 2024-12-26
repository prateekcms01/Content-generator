const express = require("express");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const app = express();
require("dotenv").config();
app.use(express.json());
const cors = require("cors");
app.use(cors());

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

app.get("/", (req, res) => {
  try {
    res.send("Hello World Gemini");
  } catch (err) {
    res.send({ error: err });
  }
});

const generate = async (prompt) => {
  try {
    const result = await model.generateContent(prompt);
    // console.log(result.response.text());
    return result.response.text();
  } catch (err) {
    console.log({ Error: err });
  }
};

app.post("/api/content", async (req, res) => {
  try {
    const prompt = req.body.question;
    if (!prompt) {
      return res.status(400).send({ error: "Prompt is required" });
    }

    const result = await generate(prompt);
    res.status(200).send({ Result: result });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}`);
});
