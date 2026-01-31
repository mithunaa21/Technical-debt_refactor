// src/pages/Home.jsx
import { useNavigate } from "react-router-dom";
import FeatureCard from "../components/FeatureCard";
import "../styles/home.css";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      {/* HERO */}
      <header className="hero-section">
        <div className="hero-overlay">
          <h1>AI Technical Debt Analyzer</h1>
          <p>
            Detect code smells • Understand issues • Refactor smarter with AI
          </p>

          <div className="hero-actions">
            <button
              className="primary-btn"
              onClick={() => navigate("/analyze")}
            >
              Analyze Code
            </button>

            <button
              className="secondary-btn"
              onClick={() => navigate("/refactor")}
            >
              Refactor Code
            </button>
          </div>
        </div>
      </header>

      {/* FEATURES */}
      <section className="features-section">
        <h2>Powerful Features</h2>

        <div className="features-grid">
          <FeatureCard
            title="Code Smell Detection"
            description="Detect long methods, magic numbers, complexity and bad practices."
          />
          <FeatureCard
            title="AI Explanations"
            description="Understand why issues matter with simple AI explanations."
          />
          <FeatureCard
            title="Smart Refactoring"
            description="Get clean, production-ready refactored code."
          />
          <FeatureCard
            title="Professional Reports"
            description="Download beautiful PDF reports with charts and insights."
          />
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="workflow-section">
        <h2>How It Works</h2>

        <div className="workflow-steps">
          <div className="step-card">
            <span>1</span>
            <h3>Paste Code</h3>
            <p>Upload or paste your source code</p>
          </div>

          <div className="step-card">
            <span>2</span>
            <h3>Analyze</h3>
            <p>AI detects technical debt issues</p>
          </div>

          <div className="step-card">
            <span>3</span>
            <h3>Refactor</h3>
            <p>Get clean & optimized code</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <h2>Ready to improve your code quality?</h2>
        <button
          className="primary-btn"
          onClick={() => navigate("/analyze")}
        >
          Start Free Analysis
        </button>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <p>© 2026 AI Technical Debt Analyzer</p>
      </footer>
    </div>
  );
}
