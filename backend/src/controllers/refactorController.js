const { runJavaAnalyzer } = require("../services/javaAnalyzer");
const { generateRefactor } = require("../services/aiService");

exports.refactorCode = async (req, res) => {
  try {
    const { code } = req.body;

    // 1. Analyze technical debt
    const issues = runJavaAnalyzer(code);

    // 2. Generate refactor + description
    const aiResult = await generateRefactor(code, issues);

    res.json({
      refactoredCode: aiResult.refactoredCode,
      description: aiResult.description
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Refactor failed" });
  }
};
