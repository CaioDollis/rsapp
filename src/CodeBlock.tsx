import React from "react";

interface CodeBlockProps {
  element: {
    code: string;
  };
}

const CodeBlock: React.FC<CodeBlockProps> = ({ element }) => {
  return (
    <pre
      className="code-block"
      style={{ background: "#f9f9f9", padding: "8px", overflowX: "auto" }}>
      <code>{element.code}</code>
    </pre>
  );
};

export default CodeBlock;
