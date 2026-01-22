import Editor from "react-simple-code-editor";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";

export default function CodeEditor({ code, setCode }) {
  return (
    <Editor
      value={code}
      onValueChange={setCode}
      highlight={(code) =>
        Prism.highlight(code, Prism.languages.java, "java")
      }
      padding={15}
      className="code-editor"
      placeholder="Paste your Java code here..."
    />
  );
}
