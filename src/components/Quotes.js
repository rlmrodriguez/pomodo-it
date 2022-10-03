import { useEffect, useState } from "react";
import GetNewButton from "./GetNewButton";

const Quotes = () => {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    fetch(
      "https://api.quotable.io/random?tags=inspirational|motivational&maxLength=100"
    )
      .then((res) => res.json())
      .then((quote) => {
        setQuote(quote.content);
        setAuthor(quote.author);
      });
  }, []);

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  const getNewQuote = () => {
    fetch("https://api.quotable.io/random?tags=inspirational&maxLength=75")
      .then((res) => res.json())
      .then((quote) => {
        setQuote(quote.content);
        setAuthor(quote.author);
      });
  };
  return (
    <div
      className="quote-container"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="quote">
        <p>"{quote}"</p>
        <span>- {author} -</span>
      </div>
      {isHovering && <GetNewButton onClick={getNewQuote} />}
    </div>
  );
};

export default Quotes;
