listPets → query parameters

getPet → id

addPet → pet data

adoptPet → id

removePet → id

// Service Layer: This is where we write the real thinking part.
// It handles validation, filtering, searching, sorting, pagination,
// and talks to the Repo (DB layer) to get/save data.

2. Above paginate()
// Small helper to cut a big list into pages.
// Page = which slice to show, Limit = how many items per page.

3. Above listPets()
// List all pets with filters, search, sorting and pagination.
// We NEVER trust input → always check and clean values.

4. Inside filtering part
// Apply filters only if user has given them.
// This avoids crashing and keeps results clean.

5. Inside search
// Search is always done in lowercase → makes matching flexible.

6. Inside sorting
// Sorting logic: choose what field to sort and in which direction.

7. Before pagination
// After all transformations → finally cut results into pages.

8. In catch block
// Any unexpected error is reshaped into a readable message.

9. Above getPet()
// Get a single pet by id. We must verify it exists.

10. Above addPet()
// Add new pet → Always validate required fields first.
// Never create incomplete data.

11. Above adoptPet()
// Change adoption status. Double-check pet exists and is not already adopted.

12. Above removePet()
// Delete pet safely → If already deleted or invalid id, tell the user.
