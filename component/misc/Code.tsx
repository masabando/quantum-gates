"use client"
import SyntaxHighlighter from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

export default function Code({ code, language = "javascript", className = "" }: { code: string, language?: string, className?: string }) {
  return (
    <div className={`mockup-code w-full text-start max-w-200 mx-auto ${className}`}>
      {code && code.split("\n").map((line, index) => (
        // <pre key={index}><code>
        <SyntaxHighlighter
          key={index}
          language={language}
          style={a11yDark}
          customStyle={{
            backgroundColor: "transparent",
            margin: 0,
            padding: 0,
            overflow: "initial",
          }}
          codeTagProps={{ style: { fontFamily: "inherit", fontSize: "inherit" } }}
        >
          {line}
        </SyntaxHighlighter>
        // </code></pre>
      ))}
    </div>
  )
}