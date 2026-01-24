import { useState } from "react";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import "../styles/analyze.css";
import { analyzeCode } from "../services/api";

export default function Analyze() {
  const [code, setCode] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // Clear textarea
  const handleClear = () => {
    setCode("");
    setResult(null);
    setError("");
  };

  // Call backend analyze API
  const handleAnalyze = async () => {
    if (!code.trim()) {
      alert("Please paste code to analyze");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await analyzeCode(code);
      setResult(res.data);

    } catch (err) {
      console.error(err);
      setError("Failed to analyze code. Backend not reachable.");
    } finally {
      setLoading(false);
    }
  };

  // Download analysis result as PDF
  const handleDownloadPDF = () => {
    if (!result) {
      alert("No analysis result to download");
      return;
    }

    const pdf = new jsPDF();
    pdf.setFont("courier", "normal");
    pdf.setFontSize(12);

    const text = JSON.stringify(result, null, 2);
    const lines = pdf.splitTextToSize(text, 180);
    pdf.text(lines, 10, 10);
    pdf.save("analysis-result.pdf");
  };

  // Navigate to refactor page
  const handleRefactor = () => {
    navigate("/refactor", {
      state: {
        originalCode: code,
        issues: result?.issues,
      },
    });
  };

  return (
    <div className="analyze-container">
      <h2>Analyze Code</h2>

      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Paste your code here..."
      />

      <div className="button-group">
        <button className="analyze-btn" onClick={handleAnalyze}>
          {loading ? "Analyzing..." : "Analyze"}
        </button>

        <button className="clear-btn" onClick={handleClear}>
          Clear
        </button>

        <button className="download-btn" onClick={handleDownloadPDF}>
          Download PDF
        </button>
      </div>

      {/* Error */}
      {error && <p className="error">{error}</p>}

      {/* Result */}
      {result && (
        <div className="result-box">
          <h3>Detected Issues</h3>
          <pre>{JSON.stringify(result.issues, null, 2)}</pre>

          <h3>AI Explanation</h3>
          <pre>{result.aiResponse}</pre>

          <p className="refactor-text">
            Do you want to refactor this code?
          </p>

          <button className="refactor-btn" onClick={handleRefactor}>
            Refactor Code
          </button>
        </div>
      )}
    </div>
  );
}
