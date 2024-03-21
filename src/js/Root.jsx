import { useState, useEffect } from "react";
import Game from "./Game";
import { getRandomItems } from "./helpers";

export default function Root() {
  const [data, setData] = useState(null);
  const [game, setGame] = useState(false);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  useEffect(() => {
    async function getCharacters() {
      try {
        const response = await fetch(
          "https://dragonball-api.com/api/characters?limit=58"
        );
        const characters = await response.json();
        const arrayOfCharacters = getRandomItems(characters.items, 10);
        setData(arrayOfCharacters);
      } catch (error) {
        console.error("An error occurred:", error);
      }
    }

    getCharacters();
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    setGame((prevState) => !prevState);
  };

  return (
    <>
      <div className="main container py-4 px-3 mx-auto">
        <header className="d-flex justify-content-between">
          <div className="d-flex align-items-center">
            <h1>Hello, this is my Memory Card Game!</h1>
          </div>

          <div className="score">
            <p>{`Score: ${score}`}</p>
            <p>{`Best Score: ${bestScore}`}</p>
          </div>
        </header>

        <div className="startGame d-flex justify-content-center mt-4">
          {!game && (
            <button onClick={handleClick} className="btn btn-primary">
              Click to play
            </button>
          )}
        </div>
        {game && (data ? <Game data={data} /> : <p>Loading...</p>)}
      </div>
    </>
  );
}
