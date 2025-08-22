import React, { useContext, useEffect, useState } from "react";
import { BookContext } from "./BookContext";

interface NavProps {
  currentChapter: string | null;
  setCurrentChapter: (chapterFile: string) => void;
}
interface NavItem {
  title: string;
  file: string;
  children?: NavItem[];
}

const Nav: React.FC<NavProps> = ({ currentChapter, setCurrentChapter }) => {
  const { book, progress } = useContext(BookContext);
  const [firstChapter, setFirstChapter] = useState<string | null>(null);

  useEffect(() => {
    if (!currentChapter && book.nav.length > 0) {
      const findFirst = (items: NavItem[]): string | null => {
        for (const item of items) {
          if (item.file) return item.file;
          if (item.children) {
            const found = findFirst(item.children);
            if (found) return found;
          }
        }
        return null;
      };
      setFirstChapter(findFirst(book.nav as NavItem[]));
    }
  }, [book, currentChapter]);

  useEffect(() => {
    if (!currentChapter && firstChapter) {
      setCurrentChapter(firstChapter);
    }
  }, [firstChapter, currentChapter, setCurrentChapter]);

  const renderItems = (items: NavItem[], depth = 0) => {
    return items.map((item) => {
      const chapterProgress = progress[item.file] || {};
      const answered = Object.values(chapterProgress).filter(Boolean).length;
      const total = Object.keys(chapterProgress).length;
      const progressStr = total > 0 ? ` (${answered}/${total})` : "";
      return (
        <div
          key={item.file}
          style={{ marginLeft: depth * 16, padding: "4px 0" }}>
          <button
            onClick={() => setCurrentChapter(item.file)}
            style={{
              background:
                currentChapter === item.file ? "#f0f0f0" : "transparent",
              border: "none",
              padding: "4px",
              cursor: "pointer",
              textAlign: "left",
              width: "100%",
            }}>
            {item.title}
            {progressStr}
          </button>
          {item.children && renderItems(item.children, depth + 1)}
        </div>
      );
    });
  };

  return <div className="nav">{renderItems(book.nav as NavItem[])}</div>;
};

export default Nav;
