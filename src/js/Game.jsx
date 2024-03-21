import Card from "./Card";

export default function Game({ data }) {
  const charactersCards = data.map((character) => (
    <Card key={character.id} character={character} />
  ));

  return (
    <>
      <div className="gameboard">
        <div className="row gap-3 justify-content-center">
          {charactersCards}
        </div>
      </div>
    </>
  );
}
