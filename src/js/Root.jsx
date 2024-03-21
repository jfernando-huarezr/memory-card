import { useState, useEffect } from "react";
import Game from "./Game";
import { getRandomItems } from "./helpers";
import { shuffleArray } from "./helpers";

export default function Root() {
  const [data, setData] = useState(null);
  const [game, setGame] = useState(false);
  const [message, setMessage] = useState(false);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);

  const handleScoring = (mode = true) => {
    if (score !== data.length) {
      if (mode) {
        setScore((prevScore) => {
          const newScore = prevScore + 1;
          if (newScore > bestScore) {
            setBestScore(newScore);
          }
          if (newScore == data.length) setMessage("You win!");
          return newScore;
        });
      } else {
        setScore(0);
        setMessage("Try Again!");
      }
    }
  };

  useEffect(() => {
    async function getCharacters() {
      try {
        const response = await fetch(
          "https://dragonball-api.com/api/characters?limit=58"
        );
        const characters = await response.json();
        const arrayOfCharacters = getRandomItems(characters.items, 10);
        setData(arrayOfCharacters);
        setDataLoaded(true);
      } catch (error) {
        console.error("An error occurred:", error);
      }
    }

    getCharacters();
  }, []);

  useEffect(() => {
    if (dataLoaded) {
      const shuffledData = shuffleArray([...data]);
      setData(shuffledData);
    }
  }, [score, dataLoaded]);

  const handleFirstPlay = (e) => {
    e.preventDefault();
    setGame((prevState) => !prevState);
  };

  return (
    <>
      <div className="main container py-4 px-3 mx-auto">
        <header className="d-flex justify-content-center">
          <div className="d-flex align-items-center">
            <h1>Dragon Ball Memory Card Game</h1>
          </div>
        </header>

        <div className="startGame d-flex flex-column justify-content-center align-items-center mt-4">
          {!game && (
            <button onClick={handleFirstPlay} className="btn btn-primary">
              Click to play
            </button>
          )}

          {game && (
            <>
              <div className="d-flex gap-4">
                <p>{`Score: ${score}`}</p>
                <p>{`Best Score: ${bestScore}`}</p>
              </div>

              {message && (
                <>
                  <p>{message}</p>
                  {score == 10 && (
                    <button
                      onClick={() => {
                        setScore(0);
                        setMessage("");
                      }}
                      className="btn btn-primary"
                    >
                      Play Again!
                    </button>
                  )}
                </>
              )}
            </>
          )}
        </div>

        {game &&
          (data ? (
            <Game data={data} handleScoring={handleScoring} />
          ) : (
            <p>Loading...</p>
          ))}
      </div>
    </>
  );
}
