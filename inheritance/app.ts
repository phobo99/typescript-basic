class Champion {
    name: string;
    description: string;
    skills: string[];


    constructor(name: string, description: string, skills: string[]) {
        this.name = name;
        this.description = description;
        this.skills = skills;
    }

    showInfo(): void {
        let skill: string = '';

        for (let i = 0; i < this.skills.length; i++) {
            skill += this.skills[i];
            skill += "|"
        }
        console.log(`Show info:
        Name: ${this.name},
        description: ${this.description},
        skill: ${skill}`);
    }
}

class Killer extends Champion {
    critSkill: string;

    constructor(name: string, description: string, skills: string[], critSkill: string) {
        super(name, description, skills);
        this.critSkill = critSkill
    }

    showInfo(): void {
        super.showInfo();

        console.log("Don sat thu cua tuong nay la : ", this.critSkill);

    }
}

let malphite = new Champion('malphite', 'cuc da to dung', ['cuc da to dung', 'dam chan tai cho', 'oanh ra lua', 'khong the can pha'])
malphite.showInfo();

let ahri = new Champion('ahri', 'ho li 9 duoi', ['qua cau ma thuat', '3 qua cau', 'hon gio', 'phi tien'])
ahri.showInfo();

let talon = new Killer('talon', 'sat thu dang gom', ['luoi hai linh hon', 'qua khung khiep', 'manh cuc ky', 'vong xoay dinh menh'], 'xuyen thau')
talon.showInfo();

