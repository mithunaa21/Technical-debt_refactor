import "./../styles/refactor.css";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

export default function Refactor() {
  const location = useLocation();

  const [beforeCode, setBeforeCode] = useState("");
  const [afterCode, setAfterCode] = useState("");
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(false);

  /* ===============================
     GET DATA FROM ANALYZE PAGE
  =============================== */
  useEffect(() => {
    if (location.state?.originalCode) {
      setBeforeCode(location.state.originalCode);
    }
    if (location.state?.issues) {
      setIssues(location.state.issues);
    }
  }, [location.state]);

  /* ===============================
     CALL BACKEND REFACTOR API
  =============================== */
  const refactorCode = async () => {
    if (!beforeCode.trim()) {
      alert("Please enter code to refactor");
      return;
    }

    try {
      setLoading(true);
      setAfterCode("");

      const payload =
        issues && issues.length > 0
          ? { code: beforeCode, issues }
          : { code: beforeCode };

      const res = await axios.post(
        "http://localhost:8080/api/refactor",
        payload
      );

      let output = "";

      if (
        res.data &&
        Array.isArray(res.data.refactorSuggestions) &&
        res.data.refactorSuggestions.length > 0
      ) {
        output = res.data.refactorSuggestions.join("\n\n");
      } else {
        output = "No refactor suggestions returned";
      }

      // 🔥 CLEAN ```java ``` BLOCKS IF AI RETURNS THEM
      output = output
        .replace(/```java/g, "")
        .replace(/```/g, "")
        .trim();

      setAfterCode(output);
    } catch (err) {
      console.error("Refactor failed:", err);
      setAfterCode("❌ Refactor failed. Check backend logs.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="refactor-container">
      <h2>AI Code Refactor</h2>

      <div className="code-grid">
        {/* BEFORE */}
        <div className="code-card">
          <h3>Before</h3>
          <textarea
            placeholder="Paste Java code here..."
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
          <h3>AI Refactored Output</h3>
          <textarea
            placeholder="AI refactored code will appear here..."
            value={afterCode}
            readOnly
          />
        </div>
      </div>
    </div>
  );
}
