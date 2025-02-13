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
        this.xpToNextLevel = Math.floor(this.xpToNextLevel * 1.5);
        console.log(`Level up! You are now level ${this.level}`);
    }

    addExperience(exp) {
        this.xp +=exp

        //TODO: add check for levelUp here.
        // if(....)
        // this.levelUp()
    }
  };
  