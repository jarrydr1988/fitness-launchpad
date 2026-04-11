import { useState, useEffect } from "react";

const words = ["STRENGTH", "CONFIDENCE", "POTENTIAL"];

const RotatingWord = () => {
  const [currentWord, setCurrentWord] = useState(words[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prevWord) => {
        const currentIndex = words.indexOf(prevWord);
        const nextIndex = (currentIndex + 1) % words.length;
        return words[nextIndex];
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return <span className="text-primary">{currentWord}</span>;
};

export default RotatingWord;
