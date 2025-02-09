let resources = 0;

// Update resource count on the screen
function updateResourceCount() {
  const resourceCountElement = document.getElementById("resource-count");
  resourceCountElement.textContent = resources;
}

// Add resources when the button is clicked
document.getElementById("generate-resource").addEventListener("click", () => {
  resources += 1; // Increment resource count
  updateResourceCount();
});

// Initialize the game
updateResourceCount();
