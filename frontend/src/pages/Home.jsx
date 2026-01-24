import { useNavigate } from "react-router-dom";
import FeatureCard from "../components/FeatureCard";
import "../styles/home.css";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home">
      {/* HERO SECTION */}
      <div className="hero">
        <h1>AI-Based Technical Debt Detection</h1>
        <p>Detect technical debt. Understand it. Fix it smarter.</p>
        <div className="hero-buttons">
          <button className="btn btn-primary" onClick={() => navigate("/analyze")}>
            Analyze Code
          </button>
          <button className="btn btn-secondary" onClick={() => navigate("/refactor")}>
            Refactor Code
          </button>
        </div>
      </div>

      {/* FEATURES */}
      <div className="features">
        <FeatureCard
          title="Detect Code Smells"
          description="Find long methods, duplication, and bad practices."
        />
        <FeatureCard
          title="AI Explanations"
          description="Understand why the issue matters."
        />
        <FeatureCard
          title="Refactoring"
          description="Get AI-powered refactoring suggestions."
        />
        <FeatureCard
          title="Visual Reports"
          description="Charts & maintainability scores."
        />
      </div>

      {/* HOW IT WORKS */}
      <div className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps">
          <div className="step">
            <h3>1. Upload Your Code</h3>
            <p>Paste or upload your source code for analysis.</p>
          </div>
          <div className="step">
            <h3>2. Detect Technical Debt</h3>
            <p>Our AI scans for code smells, complexity, and bad practices.</p>
          </div>
          <div className="step">
            <h3>3. Get Refactoring Suggestions</h3>
            <p>Receive actionable insights and smart fixes.</p>
          </div>
        </div>
      </div>

      {/* WHY US */}
      <div className="why-us">
        <h2>Why Choose Our Tool?</h2>
        <ul>
          <li>✅ AI-powered insights</li>
          <li>✅ Saves hours of manual review</li>
          <li>✅ Improves maintainability</li>
          <li>✅ Easy integration with GitHub</li>
        </ul>
      </div>

      {/* TESTIMONIALS */}
      <div className="testimonials">
        <h2>What Developers Say</h2>
        <blockquote>
          “This tool helped us cut down 40% of legacy code issues in a week.” — DevOps Lead, FinTech Co.
        </blockquote>
        <blockquote>
          “Finally, a smart way to tackle tech debt without drowning in refactor tickets.” — Full Stack Engineer
        </blockquote>
      </div>

      {/* CALL TO ACTION */}
      <div className="cta">
        <h2>Ready to clean up your code?</h2>
        <button className="btn btn-primary" onClick={() => navigate("/analyze")}>
          Start Free Analysis
        </button>
      </div>
    </div>
  );
}
