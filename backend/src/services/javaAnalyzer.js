const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

exports.runJavaAnalyzer = (code) => {
  try {
    const analyzerDir = path.join(__dirname, "../../analyzer");
    const inputFile = path.join(analyzerDir, "InputCode.java");

    // 1️⃣ Write incoming code to InputCode.java
    fs.writeFileSync(inputFile, code);

    // 2️⃣ Run Java analyzer (DO NOT recompile every time)
    const output = execSync(
      'java -cp ".;gson-2.10.1.jar" TechnicalDebtAnalyzer',
      { cwd: analyzerDir }
    );

    // 3️⃣ Parse JSON output
    return JSON.parse(output.toString());

  } catch (err) {
    console.error("Java Analyzer Error:", err.message);
    throw err; // important
  }
};
