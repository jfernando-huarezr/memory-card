export default function Card({ character, onClick }) {
  return (
    <>
      <div className="col-md-4 col-lg-2">
        <div className="card-characters" onClick={onClick}>
          <img src={character.image} alt={character.name} />
        </div>
      </div>
    </>
  );
}
