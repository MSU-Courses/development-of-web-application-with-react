function AnimalCard({ animal }) {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white p-4">
      <h3 className="text-xl font-bold text-gray-800 mb-2">{animal.name}</h3>
      <p className="text-gray-600 mb-4 text-base/5">{animal.description}</p>
      <i className="text-sm text-gray-500">{animal.species}</i>
    </div>
  );
}

export default AnimalCard;
