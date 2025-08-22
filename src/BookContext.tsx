import React, { createContext, useState, useEffect, ReactNode } from 'react';
import bookData from './book.json';

interface QuizProgress {
  [questionId: string]: boolean;
}
interface ChapterProgress {
  [chapterFile: string]: QuizProgress;
}
interface BookContextProps {
  book: typeof bookData;
  progress: ChapterProgress;
  updateProgress: (chapterFile: string, questionId: string, correct: boolean) => void;
}

export const BookContext = createContext<BookContextProps>({
  book: bookData,
  progress: {},
  updateProgress: () => {},
});

export const BookProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [progress, setProgress] = useState<ChapterProgress>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('bookProgress');
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch {
          /* ignore parse errors */
        }
      }
    }
    return {};
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('bookProgress', JSON.stringify(progress));
    }
  }, [progress]);

  const updateProgress = (chapterFile: string, questionId: string, correct: boolean) => {
    setProgress(prev => {
      const newProg = { ...prev };
      if (!newProg[chapterFile]) newProg[chapterFile] = {};
      newProg[chapterFile][questionId] = correct;
      return newProg;
    });
  };

  return (
    <BookContext.Provider value={{ book: bookData, progress, updateProgress }}>
      {children}
    </BookContext.Provider>
  );
};
