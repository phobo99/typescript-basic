class Champion {
    private _name: string;

    constructor(_name: string) {
        this._name = _name;
    }

    public get name(): string {
        return this._name;
    }

    public set name(v: string) {
        this._name = v;
    }

}

let zeus = new Champion('Zeus')
console.log('ten tuong la : ', zeus.name);

zeus.name = "Zeus God!"
console.log("new name of Champion: ", zeus.name);

let password: string = 'pho dep trai';
class Person {
    private _name: string;

    public get name(): string {
        if (password == 'pho dep trai') {
            return this._name
        }
        else {
            return "Wrong password bae"
        }
    }

    public set name(v: string) {
        if (password == 'pho dep trai') {
            this._name = v;
        } else {
            this._name = "wrong password"
        }

    }

}

let per1 = new Person();

password = 'pho dep trai'

per1.name = "Pho dep trai that";

// use getter:

console.log(per1.name);
