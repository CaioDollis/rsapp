import React, { useContext, useState, useEffect } from "react";
import { BookContext } from "./BookContext";
import CodeBlock from "./CodeBlock";
import Quiz from "./Quiz";

interface ChapterProps {
  chapterFile: string;
}
type ChapterElement =
  | { kind: "text"; content: string }
  | { kind: "code"; content: { language?: string; flags?: string[]; code: string } }
  | { kind: "quiz"; content: { questions: any[] } };
const Chapter: React.FC<ChapterProps> = ({ chapterFile }) => {
  const { book } = useContext(BookContext);
  const chapter = book.chapters.find(
    (c: { file: string }) => c.file === chapterFile
  );
  const [index, setIndex] = useState<number>(0);

  useEffect(() => {
    const key = "chapterIndex:" + chapterFile;
    const saved = localStorage.getItem(key);
    if (saved) {
      const n = parseInt(saved, 10);
      if (!Number.isNaN(n)) setIndex(n);
    }
  }, [chapterFile]);

  useEffect(() => {
    const key = "chapterIndex:" + chapterFile;
    localStorage.setItem(key, index.toString());
  }, [chapterFile, index]);

  if (!chapter)
    return (
      <div className="chapter">
        <p>Chapter not found.</p>
      </div>
    );

  const element = chapter.elements[index] as ChapterElement | undefined;
  const next = () => setIndex(Math.min(index + 1, chapter.elements.length - 1));
  const prev = () => setIndex(Math.max(index - 1, 0));

  return (
    <div className="chapter">
      <h2>{chapter.title}</h2>
      <div className="content">
        {element && (
          <>
            {element.kind === "text" && <p>{element.content}</p>}
            {element.kind === "code" && <CodeBlock element={element.content} />}
            {element.kind === "quiz" && (
              <Quiz quiz={element.content} chapterFile={chapter.file} />
            )}
          </>
        )}
      </div>
      <div className="nav-buttons">
        <button onClick={prev} disabled={index === 0}>
          Previous
        </button>
        <button onClick={next} disabled={index === chapter.elements.length - 1}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Chapter;
