import { useEffect, useState } from "react";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import "prismjs/themes/prism-tomorrow.css";
import Editor from "react-simple-code-editor";
import "./App.css";
import prism from "prismjs";
import axios from "axios";
import Markdown from "react-markdown";
function App() {
  const [code, setCode] = useState(`function sum(a,b){return a+b;}`);
  const [review, setReview] = useState(``);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    prism.highlightAll();
  }, []);

  async function Reviewcode() {
    try {
      setLoading(true);
      const response = await axios.post("http://localhost:3000/ai/get-review", {
        code,
      });
      setReview(response.data.response);
    } catch (error) {
      setReview("⚠️ Error fetching review.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <main>
        <div className="left">
          <div className="code">
            <Editor
              value={code}
              onValueChange={(code) => setCode(code)}
              highlight={(code) =>
                prism.highlight(code, prism.languages.javascript, "javascript")
              }
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 16,
                border: null,
                borderRadius: "0.7rem",
                color: "#fff",
              }}
            />
          </div>
          <div onClick={Reviewcode} className="review">
            Review
          </div>
        </div>
        {/* <div className="right">
          <Markdown rehypePlugins={[rehypeHighlight]}>{review}</Markdown>
        </div> */}

        <div className="right">
          {loading ? (
            <div className="loader">⏳ Loading...</div>
          ) : (
            <Markdown rehypePlugins={[rehypeHighlight]}>{review}</Markdown>
          )}
        </div>
      </main>
    </>
  );
}

export default App;
