function AnimalCard({ animal }) {
  return (
    <div>
      <h2>{animal.name}</h2>
      <p>{animal.description}</p>
    </div>
  );
}

export default AnimalCard;
