const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

/* =====================================================
   ANALYZE → AI EXPLANATION (NO AI CALL, RULE-BASED)
===================================================== */
async function generateAIExplanation(issues) {
  if (!issues || issues.length === 0) {
    return "No major technical debt detected.";
  }

  let explanation = "";

  issues.forEach((issue, index) => {
    explanation += `Issue ${index + 1}: ${issue.type}\n`;

    switch (issue.type) {
      case "LONG_METHOD":
        explanation +=
          "Explanation: Long methods reduce readability.\n" +
          "Suggestion: Split into smaller methods.\n\n";
        break;

      case "COMPLEX_METHOD":
        explanation +=
          "Explanation: High complexity increases bugs.\n" +
          "Suggestion: Reduce nesting or extract helpers.\n\n";
        break;

      case "SYSTEM_OUT":
        explanation +=
          "Explanation: System.out.println is not production-ready.\n" +
          "Suggestion: Use Logger.\n\n";
        break;

      case "MAGIC_NUMBER":
        explanation +=
          "Explanation: Magic numbers reduce clarity.\n" +
          "Suggestion: Use named constants.\n\n";
        break;

      case "EMPTY_CATCH":
        explanation +=
          "Explanation: Empty catch blocks hide errors.\n" +
          "Suggestion: Log or handle exceptions.\n\n";
        break;

      case "TOO_MANY_PARAMETERS":
        explanation +=
          "Explanation: Too many parameters indicate poor design.\n" +
          "Suggestion: Use a parameter object.\n\n";
        break;

      case "HARDCODED_VALUE":
        explanation +=
          "Explanation: Hardcoded values reduce flexibility.\n" +
          "Suggestion: Move values to configuration.\n\n";
        break;

      default:
        explanation +=
          "Explanation: Code quality issue detected.\n" +
          "Suggestion: Refactor for better readability.\n\n";
    }
  });

  return explanation.trim();
}

/* =====================================================
   REFACTOR → GROQ AI (REAL AI REFACTOR)
===================================================== */
async function generateAIRefactorSuggestions(code, issues = []) {
  const issueText =
    issues.length > 0
      ? issues.map((i) => `- ${i.type}`).join("\n")
      : "No issues detected";

  const prompt = `
You are a senior Java developer.

Refactor the following Java code:
- Replace System.out.println with Logger
- Remove magic numbers
- Improve readability and structure

ONLY return the refactored Java code.

Code:
${code}

Detected Issues:
${issueText}
`;

  const response = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.2,
  });

  return response.choices[0].message.content;
}

/* =====================================================
   EXPORTS (VERY IMPORTANT)
===================================================== */
module.exports = {
  generateAIExplanation,
  generateAIRefactorSuggestions,
};
