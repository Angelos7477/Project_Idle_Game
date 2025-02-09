// Initial player state
let player = {
    form: "Basic Goblin",
    skills: [],
  };
  
  // Available enemies with skills
  const enemies = [
    { name: "Wild Boar", skill: "Charge" },
    { name: "Fire Spirit", skill: "Flame Burst" },
    { name: "Stone Golem", skill: "Harden" },
  ];
  
  // Current enemy index
  let currentEnemyIndex = 0;
  
  // Update the player’s status on the screen
  function updateStatus() {
    document.getElementById("current-form").textContent = player.form;
    document.getElementById("skills").textContent = player.skills.length
      ? player.skills.join(", ")
      : "None";
  }
  
  // Update the enemy on the screen
  function updateEnemy() {
    const enemy = enemies[currentEnemyIndex];
    document.getElementById("enemy-name").textContent = enemy.name;
  }
  
  // Absorb the current enemy’s skill
  document.getElementById("consume-enemy").addEventListener("click", () => {
    const enemy = enemies[currentEnemyIndex];
    if (!player.skills.includes(enemy.skill)) {
      player.skills.push(enemy.skill);
      currentEnemyIndex = (currentEnemyIndex + 1) % enemies.length; // Cycle to the next enemy
      updateEnemy();
      updateStatus();
    }
  });
  
  // Initialize the game
  updateStatus();
  updateEnemy();
  