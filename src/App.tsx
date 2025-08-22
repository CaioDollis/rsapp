import React, { useState } from "react";
import { BookProvider } from "./BookContext";
import Nav from "./Nav";
import Chapter from "./Chapter";
import "./App.css";

const App: React.FC = () => {
  const [currentChapter, setCurrentChapter] = useState<string | null>(null);

  return (
    <BookProvider>
      <div className="app">
        <Nav
          currentChapter={currentChapter}
          setCurrentChapter={setCurrentChapter}
        />
        {currentChapter ? (
          <Chapter chapterFile={currentChapter} />
        ) : (
          <div className="chapter" style={{ padding: "20px" }}>
            <h2>Welcome</h2>
            <p>Select a chapter from the menu to begin.</p>
          </div>
        )}
      </div>
    </BookProvider>
  );
};

export default App;
