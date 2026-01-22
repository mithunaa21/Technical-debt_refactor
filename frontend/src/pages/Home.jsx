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
        <button onClick={() => navigate("/analyze")}>
          Analyze Code
        </button>
        <button onClick={() => navigate("/refactor")}>
            Refactor Code
          </button>
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
    </div>
  );
}
