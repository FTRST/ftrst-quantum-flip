import React, { useState, useEffect, useRef } from "react";

const RandomText = ({ choice }) => {
  console.log("Choice is:", choice);
  const [elements, setElements] = useState([]);
  const containerRef = useRef(null);
  const [isFilled, setIsFilled] = useState(false);
  const [highlightEnabled, setHighlightEnabled] = useState(false);
  const requiredChars = choice.split("");
  let nextRequiredCharIndex = 0;

  useEffect(() => {
    // Function to generate a random character
    const generateRandomChar = () => {
      const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
      return characters.charAt(Math.floor(Math.random() * characters.length));
    };

    // Function to create a span element for a character
    const createCharSpan = (char, highlight = false) => {
      return { char, highlight };
    };

    // Calculate the number of characters that can fit
    const calculateMaxCharacters = () => {
      const container = containerRef.current;
      const style = window.getComputedStyle(container);
      const fontSize = parseFloat(style.fontSize);
      const charWidth = fontSize * 1; // Estimate - adjust based on your font
      const charHeight = fontSize;
      const maxCharsPerLine = Math.floor(container.offsetWidth / charWidth);
      const maxLines = Math.floor(container.offsetHeight / charHeight);
      return maxCharsPerLine * maxLines;
    };

    let charElements = [];
    const maxChars = calculateMaxCharacters();
    let charCount = 0;
    const charInterval = setInterval(() => {
      let newChar = generateRandomChar();

      if (
        nextRequiredCharIndex < requiredChars.length &&
        newChar.toLowerCase() ===
          requiredChars[nextRequiredCharIndex].toLowerCase()
      ) {
        charElements.push(createCharSpan(newChar, true));
        nextRequiredCharIndex++;
      } else {
        charElements.push(createCharSpan(newChar));
      }
      charCount++;

      if (charCount >= maxChars) {
        clearInterval(charInterval);
        // After filling the text, if some required characters are still missing, add them at the end
        while (nextRequiredCharIndex < requiredChars.length) {
          charElements.push(
            createCharSpan(requiredChars[nextRequiredCharIndex], true),
          );
          nextRequiredCharIndex++;
        }

        setElements([...charElements]);
        setIsFilled(true);
        setHighlightEnabled(true);
      } else {
        setElements([...charElements]);
      }
    }, 50);

    return () => {
      clearInterval(charInterval);
    };
  }, [choice]);

  return (
    <>
      <div style={{ padding: ".5em" }}>
        <div
          ref={containerRef}
          style={{
            backgroundColor: isFilled ? "#02111b" : "",
            margin: "auto",
            overflowWrap: "anywhere",
            color: "#6bf178",
            width: "10em",
            height: "10em",
            overflow: "hidden",
            border: isFilled ? ".25em double #6bf178" : ".25em double #6bf178",
            fontSize: "16px",
          }}
        >
          {elements.map((el, index) => (
            <span
              key={index}
              style={{
                color: highlightEnabled
                  ? el.highlight
                    ? "red"
                    : "#6bf178"
                  : "#6bf178",
              }}
            >
              {el.char}
            </span>
          ))}
        </div>
      </div>
      {isFilled && (
        <>
          <span
            style={{
              textAlign: "center",
              margin: "auto",
              display: "block",
              padding: ".5em",
            }}
          >
            You got {choice}!
          </span>
        </>
      )}
    </>
  );
};
export default RandomText;
