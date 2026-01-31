import { useState } from "react";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import "../styles/analyze.css";
import { analyzeCode } from "../services/api";

export default function Analyze() {
  const [code, setCode] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  /* ===============================
     CLEAR
  =============================== */
  const handleClear = () => {
    setCode("");
    setResult(null);
    setError("");
    localStorage.removeItem("detectedIssues");
    localStorage.removeItem("originalCode");
  };

  /* ===============================
     ANALYZE
  =============================== */
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

      // Save for refactor page
      localStorage.setItem(
        "detectedIssues",
        JSON.stringify(res.data.issues || [])
      );
      localStorage.setItem("originalCode", code);

    } catch (err) {
      console.error(err);
      setError("Failed to analyze code. Backend not reachable.");
    } finally {
      setLoading(false);
    }
  };

  /* ===============================
     DOWNLOAD PDF REPORT
  =============================== */
  const handleDownloadPDF = () => {
    if (!result) {
      alert("No analysis result to download");
      return;
    }

    const pdf = new jsPDF("p", "mm", "a4");
    let y = 15;

    /* ===== TITLE ===== */
    pdf.setFontSize(18);
    pdf.text("AI Code Analysis Report", 105, y, { align: "center" });
    y += 10;

    pdf.setFontSize(10);
    pdf.text(`Generated on: ${new Date().toLocaleString()}`, 105, y, {
      align: "center",
    });
    y += 10;

    /* ===== SUMMARY ===== */
    pdf.setFontSize(14);
    pdf.text("Summary", 10, y);
    y += 6;

    const issues = result.issues || [];
    const totalIssues = issues.length;

    const severityCount = {
      LOW: 0,
      MEDIUM: 0,
      HIGH: 0,
    };

    issues.forEach((i) => {
      if (severityCount[i.severity] !== undefined) {
        severityCount[i.severity]++;
      }
    });

    pdf.setFontSize(11);
    pdf.text(`Total Issues Detected: ${totalIssues}`, 10, y);
    y += 6;
    pdf.text(`High Severity: ${severityCount.HIGH}`, 10, y);
    y += 6;
    pdf.text(`Medium Severity: ${severityCount.MEDIUM}`, 10, y);
    y += 6;
    pdf.text(`Low Severity: ${severityCount.LOW}`, 10, y);
    y += 10;

    /* ===== SIMPLE BAR CHART ===== */
    pdf.setFontSize(14);
    pdf.text("Issue Severity Distribution", 10, y);
    y += 8;

    const barX = 10;
    const barY = y;
    const barHeight = 6;
    const scale = 10;

    pdf.setFillColor(200, 0, 0);
    pdf.rect(barX, barY, severityCount.HIGH * scale, barHeight, "F");
    pdf.text("HIGH", barX + severityCount.HIGH * scale + 2, barY + 5);

    pdf.setFillColor(255, 165, 0);
    pdf.rect(barX, barY + 8, severityCount.MEDIUM * scale, barHeight, "F");
    pdf.text("MEDIUM", barX + severityCount.MEDIUM * scale + 2, barY + 13);

    pdf.setFillColor(0, 150, 0);
    pdf.rect(barX, barY + 16, severityCount.LOW * scale, barHeight, "F");
    pdf.text("LOW", barX + severityCount.LOW * scale + 2, barY + 21);

    y += 30;

    /* ===== ISSUES TABLE ===== */
    pdf.setFontSize(14);
    pdf.text("Detected Issues", 10, y);
    y += 4;

    autoTable(pdf, {
      startY: y,
      head: [["#", "Type", "Severity", "Line", "Message"]],
      body: issues.map((issue, index) => [
        index + 1,
        issue.type,
        issue.severity,
        issue.line || "-",
        issue.message,
      ]),
      styles: { fontSize: 9 },
      headStyles: { fillColor: [40, 40, 40] },
    });

    y = pdf.lastAutoTable.finalY + 10;

    /* ===== AI EXPLANATION ===== */
    pdf.setFontSize(14);
    pdf.text("AI Explanation", 10, y);
    y += 6;

    pdf.setFontSize(10);
    const explanationLines = pdf.splitTextToSize(
      result.aiResponse,
      180
    );
    pdf.text(explanationLines, 10, y);

    y += explanationLines.length * 5 + 10;

    /* ===== ORIGINAL CODE ===== */
    pdf.setFontSize(14);
    pdf.text("Analyzed Code", 10, y);
    y += 6;

    pdf.setFontSize(8);
    const codeLines = pdf.splitTextToSize(code, 180);
    pdf.text(codeLines, 10, y);

    /* ===== SAVE ===== */
    pdf.save("AI_Code_Analysis_Report.pdf");
  };

  /* ===============================
     NAVIGATE TO REFACTOR
  =============================== */
  const handleRefactor = () => {
    navigate("/refactor");
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

      {error && <p className="error">{error}</p>}

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
