// pet.repo.js
// Simulating DB with an in-memory array

let PETS_DB = [
  { id: 1, name: "Chiku", type: "dog", age: 2, adopted: false },
  { id: 2, name: "Mimi", type: "cat", age: 1, adopted: false },
  { id: 3, name: "Snow", type: "rabbit", age: 3, adopted: true },
  { id: 4, name: "Bruno", type: "dog", age: 5, adopted: false },
];

export const PetRepo = {
  getAll() {
    return PETS_DB;
  },

  getById(id) {
    return PETS_DB.find(p => p.id === id);
  },

  create(petData) {
    const nextId = PETS_DB.length + 1;
    const newPet = { id: nextId, ...petData };
    PETS_DB.push(newPet);
    return newPet;
  },

  update(id, data) {
    let index = PETS_DB.findIndex(p => p.id === id);
    if (index === -1) return null;
    PETS_DB[index] = { ...PETS_DB[index], ...data };
    return PETS_DB[index];
  },

  delete(id) {
    const before = PETS_DB.length;
    PETS_DB = PETS_DB.filter(p => p.id !== id);
    return PETS_DB.length < before;
  }
};
  