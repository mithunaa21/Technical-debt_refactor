import { useState } from "react";
import jsPDF from "jspdf";
import "../styles/analyze.css";

export default function Analyze() {
  const [code, setCode] = useState("");

  // Clear textarea
  const handleClear = () => {
    setCode("");
  };

  // Download entered text as PDF
  const handleDownloadPDF = () => {
    if (!code.trim()) {
      alert("No content to download");
      return;
    }

    const pdf = new jsPDF();
    pdf.setFont("courier", "normal");
    pdf.setFontSize(12);

    const lines = pdf.splitTextToSize(code, 180);
    pdf.text(lines, 10, 10);
    pdf.save("analysis-result.pdf");
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
        <button className="analyze-btn">Analyze</button>
        <button className="clear-btn" onClick={handleClear}>
          Clear
        </button>
        <button className="download-btn" onClick={handleDownloadPDF}>
          Download PDF
        </button>
      </div>
    </div>
  );
}
