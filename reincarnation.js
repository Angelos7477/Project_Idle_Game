//reincarnation.js
let reincarnationOptions = [];

export function checkReincarnationTrigger(player) {
  if (player.level >= 100 && !player.readyToReincarnate) {
    player.readyToReincarnate = true;
    showReincarnationOptions(player);
  }
}

export function showReincarnationOptions(player) {
  const container = document.getElementById("reincarnation-options");
  container.innerHTML = ""; // Clear previous options
  container.style.display = "block";

  const options = getReincarnationOptions(3);
  options.forEach(option => {
    const btn = document.createElement("button");
    btn.textContent = `${option.name}: ${option.description}`;
    btn.onclick = () => applyReincarnation(player, option);
    container.appendChild(btn);
  });
}

function applyReincarnation(player, option) {
  player.form = option.form;
  player.level = 1;
  player.xp = 0;
  player.xpToNextLevel = 100;
  player.hp = Math.floor(player.hp * (option.effects.hpMultiplier || 1));
  player.attack += option.effects.attackBonus || 0;
  if (option.effects.mana) player.mana = option.effects.mana;
  if (option.effects.newSkill) player.skills.push(option.effects.newSkill);
  if (!option.effects.retainSkills) player.skills = [option.effects.newSkill];

  player.readyToReincarnate = false;
  document.getElementById("reincarnation-options").style.display = "none";
  console.log(`Reincarnated as: ${option.form}`);
}

export async function loadReincarnations() {
  const response = await fetch("reincarnations.json");
  reincarnationOptions = await response.json();
}

function getReincarnationOptions(count = 3) {
  const shuffled = reincarnationOptions.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}
