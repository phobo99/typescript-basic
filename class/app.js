var state;
(function (state) {
    state[state["Create"] = 10] = "Create";
    state[state["Processing"] = 11] = "Processing";
    state[state["Finish"] = 12] = "Finish";
})(state || (state = {}));
var CongViec = /** @class */ (function () {
    function CongViec(id, ten, trangthai) {
        this.id = 1;
        this.ten = "Pho";
        this.id = id;
        this.ten = ten;
        this.trangthai = trangthai;
    }
    CongViec.prototype.thongTin = function () {
        return this.id + " - ten: " + this.ten + " - trang thai: " + this.trangthai;
    };
    // ta có thể sử dụng thuộc tính/phương thức của class mà không cần tạo ra một đối tượng mới
    CongViec.testStatic = function () {
        console.log("thu xem co su dung duoc ham nay ma khong can phai tao mot instance ko");
    };
    return CongViec;
}());
var cv1 = new CongViec(1, "Ban hang", state.Create);
console.log(cv1);
console.log(cv1.thongTin());
console.log(CongViec.testStatic());
