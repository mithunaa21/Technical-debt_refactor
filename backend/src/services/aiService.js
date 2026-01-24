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
          "Explanation: Long methods reduce readability and testability.\n" +
          "Suggestion: Break the method into smaller, focused methods.\n\n";
        break;

      case "COMPLEX_METHOD":
        explanation +=
          "Explanation: High complexity increases the chance of bugs.\n" +
          "Suggestion: Simplify logic or split responsibilities.\n\n";
        break;

      case "SYSTEM_OUT":
        explanation +=
          "Explanation: System.out.println is not suitable for production.\n" +
          "Suggestion: Use logging frameworks like SLF4J or Log4j.\n\n";
        break;

      case "MAGIC_NUMBER":
        explanation +=
          "Explanation: Magic numbers reduce code clarity.\n" +
          "Suggestion: Replace them with static final constants.\n\n";
        break;

      case "EMPTY_CATCH":
        explanation +=
          "Explanation: Empty catch blocks hide runtime errors.\n" +
          "Suggestion: Log or properly handle the exception.\n\n";
        break;

      case "TOO_MANY_PARAMETERS":
        explanation +=
          "Explanation: Too many parameters indicate poor design.\n" +
          "Suggestion: Use objects to group related parameters.\n\n";
        break;

      case "HARDCODED_VALUE":
        explanation +=
          "Explanation: Hardcoded values reduce flexibility.\n" +
          "Suggestion: Move values to configuration files.\n\n";
        break;

      default:
        explanation += "Explanation: Code quality issue detected.\n\n";
    }
  });

  return explanation.trim();
}

module.exports = { generateAIExplanation };
