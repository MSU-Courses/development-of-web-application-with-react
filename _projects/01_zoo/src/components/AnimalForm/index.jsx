import { useForm } from "react-hook-form";
import animalApi from "../../api/animals";

function AnimalForm({ submitEffect }) {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const animal = await animalApi.createAnimal(data);
      submitEffect(data);
      reset();
    } catch (e) {
      console.error("Error creating animal:", e);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-wrap items-center gap-4 p-4 bg-gray-100 rounded-lg shadow-md"
      >
        <div className="flex flex-col">
          <label htmlFor="name" className="mb-2 font-bold">
            Name
          </label>
          <input
            {...register("name")}
            type="text"
            id="name"
            name="name"
            className="p-2 rounded border border-gray-300"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="description" className="mb-2 font-bold">
            Description
          </label>
          <input
            {...register("description")}
            type="text"
            id="description"
            name="description"
            className="p-2 rounded border border-gray-300"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="species" className="mb-2 font-bold">
            Species
          </label>
          <input
            {...register("species")}
            type="text"
            id="species"
            name="species"
            className="p-2 rounded border border-gray-300"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="age" className="mb-2 font-bold">
            Age
          </label>
          <input
            {...register("age")}
            type="number"
            id="age"
            name="age"
            className="p-2 rounded border border-gray-300 w-24"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="type" className="mb-2 font-bold">
            Type
          </label>
          <select
            {...register("type")}
            id="type"
            name="type"
            className="p-2 rounded border border-gray-300"
          >
            <option value="">Select type</option>
            <option value="mammal">Mammal</option>
            <option value="bird">Bird</option>
            <option value="reptile">Reptile</option>
            <option value="amphibian">Amphibian</option>
            <option value="fish">Fish</option>
            <option value="insect">Insect</option>
          </select>
        </div>

        <button
          type="submit"
          className="px-4 py-2 rounded bg-blue-500 text-white font-bold"
        >
          Submit
        </button>
      </form>
    </>
  );
}

export default AnimalForm;
