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
    let currentAreaEnemies = []; // Holds enemies of the current area
    let currentEnemyIndex = 0; // Keeps track of the enemy being displayed
    

  //    Display worlds
  function displayWorlds() {
    const worldsList = document.getElementById("worlds-list");
    worldsList.innerHTML = ""; // Clear previous content

    for (const worldName in worlds) {
        const world = worlds[worldName];

        // Create a world container
        const worldDiv = document.createElement("div");
        worldDiv.className = "world";

        // Add world title
        const worldTitle = document.createElement("h3");
        worldTitle.textContent = world.name;
        worldDiv.appendChild(worldTitle);

        // Add areas in the world
        world.areas.forEach((area) => {
            const areaButton = document.createElement("button");
            areaButton.textContent = `${area.name} ${area.isCleared ? "(Cleared)" : ""}`;
            areaButton.disabled = false; // Enable all buttons
            areaButton.addEventListener("click", () => enterArea(worldName, area.name));
            worldDiv.appendChild(areaButton);
        });

        worldsList.appendChild(worldDiv);
    }
}




        //add function to enter worlds
        function enterArea(worldName, areaName) {
          console.log(`Entering ${areaName} in ${worldName}...`);
          const area = worlds[worldName].areas.find((area) => area.name === areaName);
      
          if (area) {
              console.log("Area enemies to load:", area.enemies);
              const areaEnemies = area.enemies
                  .map((enemyName) => {
                      const enemy = enemies.find((enemy) => enemy.name === enemyName);
                      console.log(`Looking for enemy: ${enemyName} - Found:`, enemy);
                      return enemy;
                  })
                  .filter((enemy) => enemy !== undefined);
      
              console.log("Filtered enemies for this area:", areaEnemies);
      
              if (areaEnemies.length > 0) {
                  currentEnemyIndex = 0; // **Reset to the first enemy**
                  currentAreaEnemies = areaEnemies; // **Store enemies in temporary array**
                  console.log("Current area enemies:", currentAreaEnemies);
      
                  updateEnemy();
                  updateStatus();
              } else {
                  console.log("No enemies found for this area.");
                  currentAreaEnemies = []; // Clear enemies if none are found
                  updateEnemy();
              }
          } else {
              console.log("Area not found!");
          }
      }
      
        
  // Load game data dynamically
  async function loadGameData(source = "json") {
    const data = await fetchData(source);
    enemies = data.enemies; // Set the global enemies array
    skills = data.skills;
    worlds = data.worlds;

    console.log("Game Data Loaded:", { enemies, skills, worlds });

    // Load the first world and area by default
    const firstWorldName = Object.keys(worlds)[0]; // Get the first world
    const firstArea = worlds[firstWorldName].areas[0]; // Get the first area in the first world

    if (firstArea) {
        console.log(`Loading default area: ${firstArea.name} in ${firstWorldName}`);
        enterArea(firstWorldName, firstArea.name); // Enter the first area
    }

    displayWorlds(); // Display the worlds and areas
    updateStatus(); // Update the player stats
}
  // Display the current enemy
     function updateEnemy() {
    console.log("Updating enemy...");
    console.log("Current enemy index:", currentEnemyIndex);
    console.log("Current area enemies:", currentAreaEnemies);

    if (currentAreaEnemies.length > 0 && currentEnemyIndex < currentAreaEnemies.length) {
        const enemy = currentAreaEnemies[currentEnemyIndex];
        console.log("Displaying enemy:", enemy);
        if (enemy) {
            document.getElementById("enemy-name").textContent = enemy.name;
            document.getElementById("consume-enemy").disabled = false; // Enable button
        }
    } else {
        console.log("No enemies available.");
        document.getElementById("enemy-name").textContent = "No enemies here!";
        document.getElementById("consume-enemy").disabled = true; // Disable button
    }
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
    if (currentAreaEnemies.length > 0) {  // ✅ Fix: Use `currentAreaEnemies` instead of `enemies`
        const enemy = currentAreaEnemies[currentEnemyIndex]; // ✅ Fix: Reference `currentAreaEnemies`
        const dropChance = Math.random();

        // Handle skill drop
        if (dropChance <= enemy.skillDropRate) {
            const skillName = enemy.skills[0];
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
            player.xpToNextLevel = Math.floor(player.xpToNextLevel * 1.5);
            console.log(`Level up! You are now level ${player.level}`);
        }

        // ✅ Fix: Use `currentAreaEnemies.length`
        currentEnemyIndex++;
        if (currentEnemyIndex >= currentAreaEnemies.length) {  
            console.log("All enemies defeated in this area!");
            currentEnemyIndex = 0; // Reset index
            updateEnemy(); // This will correctly show "No enemies here!" when the area is empty
        } else {
            updateEnemy();
        }

        updateStatus();
    }
});

  
  // Start the game
  loadGameData("json");
  updateStatus();
  