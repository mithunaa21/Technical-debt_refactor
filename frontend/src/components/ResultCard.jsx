export default function ResultCard({ result }) {
  return (
    <div className="result-card">
      <h3>Detected Issues</h3>

      {result.issues.length === 0 && <p>No issues found 🎉</p>}

      {result.issues.map((issue, index) => (
        <div key={index} className="issue">
          <p><b>Issue:</b> {issue.issue}</p>
          <p><b>Method:</b> {issue.method}</p>
          <p><b>Lines:</b> {issue.lines}</p>
        </div>
      ))}

      <h4>AI Explanation</h4>
      <p>{result.aiResponse.explanation}</p>
    </div>
  );
}
