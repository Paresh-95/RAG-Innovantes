import { answerQuestion } from "../services/ragService.js";

export async function askQuestion(req, res, next) {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({ error: "Question required" });
    }

    if(question.length>500){
      return res.status(400).json({
        error: "Question is too long. Please keep it under 500 characters"
      });
    }

    const answer = await answerQuestion(question);
    res.json({ answer });
  } catch (err) {
    next(err);
  }
}
