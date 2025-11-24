// pet.service.js
// -----------------------------------------
// SERVICE LAYER = pure business logic + try/catch
// -----------------------------------------

import { PetRepo } from "./pet.repo.js";

function AppError(message, status = 400) {
  return { message, status };
}

// 🟢 1) Get All Pets
export function getAllPetsService() {
  try {
    // thinking: always wrap logic in try/catch for safety
    const pets = PetRepo.getAll();
    return pets;
  } catch (err) {
    throw AppError("Failed to fetch pets", 500);
  }
}

// 🟢 2) Get Pet By ID
export function getPetByIdService(id) {
  try {
    if (!id || typeof id !== "number") {
      throw AppError("Pet ID must be a valid number", 400);
    }

    const pet = PetRepo.getById(id);

    if (!pet) {
      throw AppError("Pet not found", 404);
    }

    return pet;
  } catch (err) {
    // thinking: bubble up proper error message instead of crashing
    throw err.message ? err : AppError("Failed to get pet", 500);
  }
}

// 🟢 3) Create Pet
export function createPetService(data) {
  try {
    if (!data?.name || !data?.type) {
      throw AppError("Name and type are required", 400);
    }

    // thinking: service cleans & prepares payload
    const petPayload = {
      name: data.name.trim(),
      type: data.type.toLowerCase(),
      age: data.age ?? 0,
      adopted: false,
    };

    const newPet = PetRepo.create(petPayload);
    return newPet;

  } catch (err) {
    throw err.message ? err : AppError("Failed to create pet", 500);
  }
}

// 🟢 4) Update Pet
export function updatePetService(id, data) {
  try {
    if (!id || typeof id !== "number") {
      throw AppError("Pet ID must be a valid number", 400);
    }

    const pet = PetRepo.getById(id);
    if (!pet) {
      throw AppError("Cannot update - Pet not found", 404);
    }

    // thinking: allow partial update + cleanup
    const updatePayload = {
      ...data,
      name: data?.name?.trim(),
      type: data?.type?.toLowerCase(),
    };

    const updated = PetRepo.update(id, updatePayload);
    return updated;

  } catch (err) {
    throw err.message ? err : AppError("Failed to update pet", 500);
  }
}

// 🟢 5) Delete Pet
export function deletePetService(id) {
  try {
    if (!id || typeof id !== "number") {
      throw AppError("Pet ID must be a valid number", 400);
    }

    const deleted = PetRepo.delete(id);

    if (!deleted) {
      throw AppError("Pet not found or already deleted", 404);
    }

    return { message: "Pet deleted successfully", id };

  } catch (err) {
    throw err.message ? err : AppError("Failed to delete pet", 500);
  }
}
