class Course {
    public id: number;
    private name: string;
    protected length: number;

    constructor(id: number, name: string, length: number) {
        this.id = id;
        this.name = name;
        this.length = length
    }

    watchCourse() {
        console.log(`
        Id khoa hoc la : ${this.id}
        Ten khoa hoc la : ${this.name}
        Do dai: ${this.length}
        `);
    }
    test2() {
        console.log('test private in class');
    }

}

class CodingCourse extends Course {
    public file: string;

    constructor(id: number, name: string, length: number, file: string) {
        super(id, name, length)
        this.file = file
    }
    watchCourse() {
        super.watchCourse()
        console.log(`file dinh kem : `, this.file);
    }
    test1() {
        console.log('log test 1');
        // console.log(this.ten) // err
        console.log(this.length);   // OK
        
    }
}


//test public


//test trong class
let khoa01 = new Course(1, 'hoc photoshop', 50)
let khoa02 = new CodingCourse(2, 'Typescript', 100, 'ex1.zip')

console.log(khoa01);
// console.log(khoa01.name);  // err with protected and private

khoa02.test1()  // ok

khoa01.test2()  // ok

