// src/controllers/ai.controller.js

const { generateContent } = require("../services/ai.service");

// ✅ Controller
exports.getReview= async (req, res) => {
  console.log("Received request:", req.body.code);
  try {
    // Accept code from body
    const code = req.body.code;

    if (!code) {
      return res.status(400).json({ error: "Code is required" });
    }

    const aiResponse = await generateContent(code);
    res.status(200).json({ response: aiResponse });
  } catch (err) {
    console.error("AI Controller Error:", err.message);
    res.status(500).json({ error: "Something went wrong with Gemini API" });
  }
};
