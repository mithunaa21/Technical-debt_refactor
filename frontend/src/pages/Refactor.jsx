import "./../styles/refactor.css";
import { useState } from "react";
import axios from "axios";

export default function Refactor() {
  const [beforeCode, setBeforeCode] = useState("");
  const [afterCode, setAfterCode] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [descLoading, setDescLoading] = useState(false);

  const refactorCode = async () => {
    if (!beforeCode.trim()) return;

    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:8080/api/refactor",
        { code: beforeCode }
      );
      setAfterCode(response.data.refactoredCode);
    } catch (error) {
      console.error("Refactor failed", error);
      alert("Refactoring failed. Check backend.");
    } finally {
      setLoading(false);
    }
  };

  const downloadRefactoredCode = () => {
    if (!afterCode) return;

    const blob = new Blob([afterCode], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "refactored_code.java";
    a.click();

    URL.revokeObjectURL(url);
  };

  const fetchDescription = async () => {
    if (!beforeCode.trim()) return;

    try {
      setDescLoading(true);
      const response = await axios.post(
        "http://localhost:8080/api/description",
        { code: beforeCode }
      );
      setDescription(response.data.description);
    } catch (error) {
      console.error("Description fetch failed", error);
      alert("Fetching description failed. Check backend.");
    } finally {
      setDescLoading(false);
    }
  };

  return (
    <div className="refactor-container">
      <h2>Refactoring Recommendation</h2>

      <div className="code-grid">
        {/* BEFORE */}
        <div className="code-card">
          <h3>Before</h3>
          <textarea
            placeholder="Paste your code here..."
            value={beforeCode}
            onChange={(e) => setBeforeCode(e.target.value)}
          />
          <button
            className="action-btn"
            onClick={refactorCode}
            disabled={loading}
          >
            {loading ? "Refactoring..." : "Refactor Code"}
          </button>
        </div>

        {/* AFTER */}
        <div className="code-card">
          <h3>After (Refactored)</h3>
          <textarea
            placeholder="Refactored code will appear here..."
            value={afterCode}
            readOnly
          />
          <button
            className="action-btn"
            onClick={downloadRefactoredCode}
            disabled={!afterCode}
          >
            Download Code
          </button>
        </div>
      </div>

      {/* Description button and box below the container */}
      <div className="description-section">
        <button
          className="desc-btn"
          onClick={fetchDescription}
          disabled={descLoading}
        >
          {descLoading ? "Processing..." : "Show Description"}
        </button>

        {description && (
          <div className="description-box">
            <p>{description}</p>
          </div>
        )}
      </div>
    </div>
  );
}
