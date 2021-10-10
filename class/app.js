var CongViec = /** @class */ (function () {
    function CongViec(id, ten, trangthai) {
        this.id = id;
        this.ten = ten;
        this.trangthai = trangthai;
    }
    CongViec.prototype.thongTin = function () {
        return this.id + " - ten: " + this.ten + " - trang thai: " + this.trangthai;
    };
    return CongViec;
}());
var cv1 = new CongViec(1, "Ban hang", "Online");
console.log(cv1);
