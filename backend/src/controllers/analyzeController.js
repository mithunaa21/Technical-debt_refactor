const { generateAIExplanation } = require("../services/aiService");

exports.analyzeCode = async (req, res) => {
  try {
    const { code } = req.body;

    if (!code) {
      return res.status(400).json({ error: "Code is required" });
    }

    const issues = [];
    const lines = code.split("\n");

    /* ===============================
       1️⃣ System.out.println
    =============================== */
    lines.forEach((line, index) => {
      if (line.includes("System.out.println")) {
        issues.push({
          type: "SYSTEM_OUT",
          severity: "LOW",
          line: index + 1,
          message: "Avoid System.out.println. Use a logging framework."
        });
      }
    });

    /* ===============================
       2️⃣ Magic Numbers
    =============================== */
    const magicNumberRegex = /\b\d{2,}\b/;
    lines.forEach((line, index) => {
      if (magicNumberRegex.test(line)) {
        issues.push({
          type: "MAGIC_NUMBER",
          severity: "MEDIUM",
          line: index + 1,
          message: "Magic number detected. Use constants instead."
        });
      }
    });

    /* ===============================
       3️⃣ Hardcoded Strings / URLs
    =============================== */
    const hardcodedRegex = /"(http|https):\/\/|"(jdbc:|localhost)/;
    lines.forEach((line, index) => {
      if (hardcodedRegex.test(line)) {
        issues.push({
          type: "HARDCODED_VALUE",
          severity: "MEDIUM",
          line: index + 1,
          message: "Hardcoded URL or string detected."
        });
      }
    });

    /* ===============================
       4️⃣ Empty catch block
    =============================== */
    const emptyCatchRegex = /catch\s*\(.*\)\s*\{\s*\}/;
    if (emptyCatchRegex.test(code)) {
      issues.push({
        type: "EMPTY_CATCH",
        severity: "HIGH",
        message: "Empty catch block detected. Exception is ignored."
      });
    }

    /* ===============================
       5️⃣ Too many parameters
    =============================== */
    const methodRegex = /\w+\s+\w+\s*\(([^)]*)\)/g;
    let match;
    while ((match = methodRegex.exec(code)) !== null) {
      const params = match[1].split(",").filter(p => p.trim() !== "");
      if (params.length > 5) {
        issues.push({
          type: "TOO_MANY_PARAMETERS",
          severity: "HIGH",
          message: `Method has ${params.length} parameters. Consider refactoring.`
        });
      }
    }

    /* ===============================
       6️⃣ Long Method
    =============================== */
    let methodStart = -1;
    let braceCount = 0;

    lines.forEach((line, index) => {
      if (line.match(/\)\s*\{/)) {
        methodStart = index;
        braceCount = 1;
      } else if (methodStart !== -1) {
        if (line.includes("{")) braceCount++;
        if (line.includes("}")) braceCount--;

        if (braceCount === 0) {
          const length = index - methodStart;
          if (length > 25) {
            issues.push({
              type: "LONG_METHOD",
              severity: "HIGH",
              lines: length,
              message: `Method too long (${length} lines).`
            });
          }
          methodStart = -1;
        }
      }
    });

    /* ===============================
       7️⃣ Complex Method (Cyclomatic)
    =============================== */
    const complexityKeywords = ["if", "for", "while", "case", "&&", "||"];
    let complexity = 0;

    complexityKeywords.forEach(keyword => {
      const regex = new RegExp(`\\b${keyword}\\b`, "g");
      const matches = code.match(regex);
      if (matches) complexity += matches.length;
    });

    if (complexity > 10) {
      issues.push({
        type: "COMPLEX_METHOD",
        severity: "HIGH",
        complexity,
        message: "High cyclomatic complexity detected."
      });
    }

    /* ===============================
       AI Explanation (NOT detection)
    =============================== */
    const aiResponse = await generateAIExplanation(issues);

    res.json({
      issues,
      aiResponse
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
