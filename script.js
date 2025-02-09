let player = {
    form: "Basic Goblin",
    skills: [],
    xp: 0,
    level: 1,
    xpToNextLevel: 100,
  };
  
  // Load JSON data
  let enemies = [];
  let skills = [];
  
  // Fetch JSON files and initialize data
  async function loadGameData() {
    const enemyResponse = await fetch("enemies.json");
    enemies = await enemyResponse.json();
  
    const skillResponse = await fetch("skills.json");
    skills = await skillResponse.json();
  
    console.log("Enemies:", enemies);
    console.log("Skills:", skills);
  
    // Display the first enemy
    updateEnemy();
  }
  
  // Display the current enemy
  let currentEnemyIndex = 0;
  
  function updateEnemy() {
    const enemy = enemies[currentEnemyIndex];
    document.getElementById("enemy-name").textContent = enemy.name;
  }
  
  // Update the player's status
  function updateStatus() {
    document.getElementById("current-form").textContent = player.form;
    document.getElementById("skills").textContent =
      player.skills.length > 0 ? player.skills.join(", ") : "None";
    document.getElementById("player-level").textContent = player.level;
    document.getElementById("player-xp").textContent = player.xp;
    document.getElementById("xp-to-next-level").textContent = player.xpToNextLevel;
  }
  
  
  // Absorb the current enemy's skill
  document.getElementById("consume-enemy").addEventListener("click", () => {
    const enemy = enemies[currentEnemyIndex];
    const dropChance = Math.random(); // Random chance to drop the skill
  
    // Handle skill drop
    if (dropChance <= enemy.skillDropRate) {
      const skillName = enemy.skills[0]; // Assume one skill per enemy for now
      if (!player.skills.includes(skillName)) {
        player.skills.push(skillName);
        console.log(`Acquired skill: ${skillName}`);
      } else {
        console.log("Skill already acquired!");
      }
    } else {
      console.log("No skill acquired this time!");
    }
  
    // Gain XP and check for level up
    player.xp += enemy.xpReward;
    if (player.xp >= player.xpToNextLevel) {
      player.level++;
      player.xp -= player.xpToNextLevel;
      player.xpToNextLevel = Math.floor(player.xpToNextLevel * 1.5); // Increase XP requirement
      console.log(`Level up! You are now level ${player.level}`);
    }
  
  // Move to the next enemy
  currentEnemyIndex = (currentEnemyIndex + 1) % enemies.length; // Cycle through enemies
  updateEnemy();
  updateStatus();
});
  
  // Start the game
  loadGameData();
  updateStatus();
  