export default function Card({ character }) {
  return (
    <>
      <div className="col-md-4 col-lg-2">
        <div className="card-characters">
          <img src={character.image} alt={character.name} />
        </div>
      </div>
    </>
  );
}
