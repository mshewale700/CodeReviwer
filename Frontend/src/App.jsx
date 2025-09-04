import { useEffect, useState } from "react";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import "prismjs/themes/prism-tomorrow.css";
import Editor from "react-simple-code-editor";
import "./App.css";
import prism from "prismjs";
import axios from "axios";
import Markdown from "react-markdown";
const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const [code, setCode] = useState(``);
  const [review, setReview] = useState(``);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    prism.highlightAll();
  }, []);

  async function Reviewcode() {
    console.log(API_URL+" tttt");
    
    try {
      setLoading(true);
      const response = await axios.post(`${API_URL}/ai/get-review`, {
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
              placeholder="Write your code here.."
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
