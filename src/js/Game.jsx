import Card from "./Card";
import { useState } from "react";

export default function Game({ data, handleScoring }) {
  const [elementsClicked, setElementsClicked] = useState([]);

  const handleCardClick = (id) => {
    if (elementsClicked.includes(id)) {
      setElementsClicked([]);
      handleScoring(false);
    } else {
      setElementsClicked((prevData) => {
        const newElementsClicked = [...prevData, id];
        if (newElementsClicked.length === data.length) {
          return [];
        }

        return newElementsClicked;
      });
      handleScoring(true);
    }
  };

  const charactersCards = data.map((character) => (
    <Card
      key={character.id}
      character={character}
      onClick={() => handleCardClick(character.id)}
    />
  ));

  return (
    <>
      <div className="gameboard mt-2">
        <div className="row gap-3 justify-content-center">
          {charactersCards}
        </div>
      </div>
    </>
  );
}
