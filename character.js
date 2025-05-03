export default class Character{
    constructor(form, skills, xp, level, xpToNextLevel) {
        this.form = form;
        this.skills = skills
        this.xp=xp,
        this.level=level,
        this.xpToNextLevel=xpToNextLevel
    }

    levelUp() {
        this.level++;
        this.xp -=this.xpToNextLevel;
        this.xpToNextLevel = Math.floor(this.xpToNextLevel * 1);
        console.log(`Level up! You are now level ${this.level}`);
    }

    addExperience(exp, onLevelUpCallback = null) {
        this.xp += exp;
        while (this.xp >= this.xpToNextLevel) {
          this.levelUp();
          // Optional callback hook for external logic like reincarnation
          if (onLevelUpCallback) {
            onLevelUpCallback(this);
          }
        }
      }      
  };
  