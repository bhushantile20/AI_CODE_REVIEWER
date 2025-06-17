import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Editor from "react-simple-code-editor"


import "prismjs/themes/prism-tomorrow.css"
import "prismjs/components/prism-jsx"
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import prism from "prismjs"
import Markdown from "react-markdown"
import axios from 'axios'
import './App.css'

function App() {
  const [code, setCode] = useState(`function sum(){ 
    return 1+1 
  }`)

  const[ review ,setReview] =useState(``)

  useEffect(() => {
    Prism.highlightAll()
  }, [])

  async function reviewCode() {
    try {
      const response = await axios.post('http://localhost:3000/ai/get-review', { code })
      console.log('Review response:', response.data)
    } catch (error) {
      console.error('Error during review:', error)
    }

    setReview(response.data.review)
  }


  return (
    <>
      <main>
        <div className="left">
          <div className="code">
            <Editor
              value={code}
              onValueChange={code => setCode(code)}
              highlight={code => Prism.highlight(code, Prism.languages.jsx, "jsx")}
              padding={10}
              style={{
                fontFamily: '"Fira Code", "Fira Mono", monospace',
                fontSize: 16,
                border: "1px solid #ddd",
                borderRadius: "5px",
                height: "100%",
                width: "100%"
              }}
            />
          </div>

          <div
            onClick={reviewCode}
            className="review"
            style={{ cursor: 'pointer', marginTop: '10px', padding: '8px', backgroundColor: '#333', color: 'white', textAlign: 'center' }}   >
            Review
          </div>
        </div>

        <div className="right">
        <Markdown 
        rehypePlugins ={ [ rehypeHighlight]}
        >{review} </Markdown>
        </div>
      </main>
    </>
  )
}


export default App

