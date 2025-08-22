import React, { useContext, useMemo } from "react";
import { BookContext } from "./BookContext";

interface Question {
  id: string;
  prompt: {
    prompt: string;
    distractors: string[];
  };
  answer: {
    answer: string;
  };
  context?: string;
}
interface QuizProps {
  quiz: {
    questions: Question[];
  };
  chapterFile: string;
}

const Quiz: React.FC<QuizProps> = ({ quiz, chapterFile }) => {
  const { progress, updateProgress } = useContext(BookContext);

  return (
    <div className="quiz">
      {quiz.questions.map((q) => {
        const result = progress[chapterFile]?.[q.id];
        const options = useMemo(() => {
          const opts = [...q.prompt.distractors, q.answer.answer];
          return opts.sort(() => Math.random() - 0.5);
        }, [q]);

        const onSelect = (option: string) => {
          if (result !== undefined) return;
          updateProgress(chapterFile, q.id, option === q.answer.answer);
        };

        return (
          <div key={q.id} className="question" style={{ marginBottom: "16px" }}>
            <p>{q.prompt.prompt.trim()}</p>
            {result === undefined ? (
              <div className="options">
                {options.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => onSelect(opt)}
                    style={{
                      display: "block",
                      margin: "4px 0",
                      width: "100%",
                    }}>
                    {opt.trim()}
                  </button>
                ))}
              </div>
            ) : (
              <p style={{ color: result ? "green" : "red" }}>
                Your answer is {result ? "correct" : "incorrect"}.
              </p>
            )}
            {result !== undefined && q.context && (
              <details>
                <summary>Explanation</summary>
                <p>{q.context.trim()}</p>
              </details>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Quiz;
