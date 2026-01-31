const { runJavaAnalyzer } = require("./javaAnalyzer");

exports.analyzeCode = (code) => {
  return runJavaAnalyzer(code);
};
