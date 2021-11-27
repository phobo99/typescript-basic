enum state {
    Create = 10,
    Processing,
    Finish
}

class CongViec {
    id: number = 1;
    ten: string = "Pho";
    trangthai: state;

    constructor(id: number, ten: string, trangthai: state) {
        this.id = id;
        this.ten = ten;
        this.trangthai = trangthai;
    }

    thongTin() {
        return `${this.id} - ten: ${this.ten} - trang thai: ${this.trangthai}`
    }

    // ta có thể sử dụng thuộc tính/phương thức của class mà không cần tạo ra một đối tượng mới
    static testStatic() {
        console.log("thu xem co su dung duoc ham nay ma khong can phai tao mot instance ko");
    }
}

let cv1 = new CongViec(1, "Ban hang", state.Create)

console.log(cv1)
console.log(cv1.thongTin());
console.log(CongViec.testStatic());

