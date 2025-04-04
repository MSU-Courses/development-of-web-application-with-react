import api from "../api";

export default {
  getAnimals: async () => {
    return (await api.get("/animals")).data;
  },
  createAnimal: async (animal) => {
    return (await api.post("/animals", animal)).data;
  },
};
