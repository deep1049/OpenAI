const express = require("express");
require("dotenv").config();

const OpenAI = require("openai");
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
const Router = express.Router();

Router.post("/", async (req, res) => {
  try {
    const { topic, language, category } = req.body;
    const messages = [
      { role: "system", content: "You are a joker,poet and wise man" },
      { role: "user", content: `${category} about ${topic} in ${language}` },
    ];
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: messages,
      temperature: 0,
      max_tokens: 400,
      // frequency_penalty: 0,
      // presence_penalty: 0,
    });
    const result = response.choices[0];
    res.send({ result });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});
Router.post("/code", async (req, res) => {
  try {
    const { prompt, language } = req.body;
    const messages = [
      { role: "system", content: "You are a code converter" },
      { role: "user", content: `convert ${prompt} in ${language}` },
    ];
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: messages,
      temperature: 0,
      max_tokens: 200,
      // frequency_penalty: 0,
      // presence_penalty: 0,
    });
    const result = response.choices[0];
    res.send({ result });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});
Router.post("/pincode", async (req, res) => {
  try {
    const userMessage = req.body.message;

    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: `Pincode of ${userMessage}` }],
      temperature: 0.6,
      max_tokens: 30,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    // Send the response back to the client
    res.json({ response: chatCompletion.choices[0].message.content });
  } catch (error) {
    // Handle any errors that occur during the request
    console.error("Error:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});
Router.post("/state", async (req, res) => {
  try {
    const userMessage = req.body.message;

    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: `Area of ${userMessage} in Sqkm` }],
      temperature: 1,
      max_tokens: 30,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    res.json({ response: chatCompletion.choices[0].message.content });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});
module.exports = { Router };
