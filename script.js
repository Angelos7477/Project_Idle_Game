let player = {
    form: "Basic Goblin",
    skills: [],
    xp: 0,
    level: 1,
    xpToNextLevel: 100,
  };
  

// Abstracted data fetching functions
// Abstracted data fetching functions
async function fetchData(source) {
    if (source === "json") {
      // Load data from JSON files
      const enemiesResponse = await fetch("enemies.json");
      const skillsResponse = await fetch("skills.json");
      const worldsResponse = await fetch("worlds.json");
  
      return {
        enemies: await enemiesResponse.json(),
        skills: await skillsResponse.json(),
        worlds: await worldsResponse.json(),
      };
    } else if (source === "database") {
      // Placeholder for database fetching (replace with actual API/database calls)
      console.log("Fetching data from database...");
      return mockDatabaseFetch();
    }
  }
  
  // Mock function simulating a database fetch
  function mockDatabaseFetch() {
    return {
      enemies: [
        { name: "Wild Boar", level: 1, skills: ["Charge"], skillDropRate: 0.3, xpReward: 50 },
        { name: "Fire Spirit", level: 3, skills: ["Flame Burst"], skillDropRate: 0.2, xpReward: 100 },
        { name: "Stone Golem", level: 5, skills: ["Harden"], skillDropRate: 0.15, xpReward: 200 },
      ],
      skills: [
        { name: "Fireball", rank: "C", type: "Offensive", effect: "Deals moderate fire damage." },
        { name: "Regeneration", rank: "B", type: "Passive", effect: "Restores health over time." },
        { name: "Harden", rank: "D", type: "Defensive", effect: "Increases defense for a short duration." },
      ],
      worlds: {
        ForestWorld: {
          name: "Forest World",
          areas: [
            { name: "Goblin Camp", enemies: ["Wild Boar"], isCleared: false },
            { name: "Ancient Ruins", enemies: ["Stone Golem"], isCleared: false },
          ],
        },
        LavaWorld: {
          name: "Lava World",
          areas: [
            { name: "Molten Cavern", enemies: ["Fire Spirit"], isCleared: false },
          ],
        },
      },
    };
  }
    // Initialize game data
    let enemies = [];
    let skills = [];
    let worlds = {};
    

  // Load game data dynamically
  async function loadGameData(source = "json") {
    const data = await fetchData(source);
    enemies = data.enemies;
    skills = data.skills;
    worlds = data.worlds;

    console.log("Game Data Loaded:", { enemies, skills, worlds });

    // Update the first enemy on the screen
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
  loadGameData("json");
  updateStatus();
  