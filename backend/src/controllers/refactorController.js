const {
  generateAIRefactorSuggestions,
} = require("../services/aiService"); // ✅ THIS LINE WAS MISSING

exports.refactorCode = async (req, res) => {
  try {
    const { code, issues } = req.body;

    if (!code) {
      return res.status(400).json({ error: "Code is required" });
    }

    const refactoredCode = await generateAIRefactorSuggestions(
      code,
      issues || []
    );

    res.json({
      refactorSuggestions: [refactoredCode],
    });
  } catch (err) {
    console.error("REFACTOR ERROR:", err.message);
    res.status(500).json({ error: "Refactor failed" });
  }
};
