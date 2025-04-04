import React from "react";
import AnimalCard from "../AnimalCard";
import axios from "axios";
import AnimalSkeletonCard from "../AnimalCard/AnimalSkeletonCard";
import animalApi from "../../api/animals";
import AnimalForm from "../AnimalForm";

// import animalsJson from "../../data/animals.json";

function AnimalList() {
  const [loading, setLoading] = React.useState(true);
  const [animals, setAnimals] = React.useState([]);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    setLoading(true);
    setError(null);

    const fetchAnimals = async () => {
      try {
        const data = await animalApi.getAnimals();
        setAnimals(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnimals();
  }, []);

  const getLastAnimal = (animal) => {
    setAnimals((prevAnimals) => [...prevAnimals, animal]);
  };

  return (
    <div className="container mx-auto p-4">
      <AnimalForm submitEffect={getLastAnimal} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {!loading
          ? animals.map((animal) => (
              <AnimalCard key={animal.id} animal={animal} />
            ))
          : [...Array(6)].map((_, index) => <AnimalSkeletonCard key={index} />)}
        {error && (
          <div className="col-span-1 sm:col-span-2 md:col-span-3">
            <p className="text-red-500 text-center">Error loading animals</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default AnimalList;
