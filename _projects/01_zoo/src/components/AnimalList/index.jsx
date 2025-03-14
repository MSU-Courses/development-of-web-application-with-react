import React from "react";
import AnimalCard from "../AnimalCard";

import animalsJson from "../../data/animals.json";

function AnimalList() {
  const [animals, setAnimals] = React.useState([]);

  React.useEffect(() => {
    setAnimals(animalsJson);
  }, []);

  return (
    <div>
      {animals.map((animal) => (
        <AnimalCard key={animal.id} animal={animal} />
      ))}
    </div>
  );
}

export default AnimalList;
