import { useState, useEffect } from "react";
import Game from "./Game";

export default function Root() {
  const [data, setData] = useState(null);
  const [game, setGame] = useState(false);

  useEffect(() => {
    async function getCharacters() {
      try {
        const response = await fetch(
          "https://dragonball-api.com/api/characters"
        );
        const characters = await response.json();
        console.log(characters.items);
        setData(characters.items);
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
        <header>
          <h1>Hello, this is my Memory Card Game!</h1>
          {!game && (
            <button onClick={handleClick} className="btn btn-primary">
              Click to play
            </button>
          )}
        </header>
        {game && (data ? <Game data={data} /> : <p>Loading...</p>)}
      </div>
    </>
  );
}
