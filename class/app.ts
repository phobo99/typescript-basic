class CongViec {
    id: number;
    ten: string;
    trangthai: string;

    constructor(id: number,ten: string,trangthai: string) {
        this.id = id;
        this.ten = ten;
        this.trangthai = trangthai;
    }

    thongTin(){
        return `${this.id} - ten: ${this.ten} - trang thai: ${this.trangthai}`
    }
}

let cv1 = new CongViec(1,"Ban hang","Online")

console.log(cv1)