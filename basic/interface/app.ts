//interface co ban
interface nguoi {
    tuoi?: number;
    ten: string;
}

function infoPerson(motnguoi: nguoi): void {
    console.log(`
    xin chao ${motnguoi.ten}, nam nay ban ${motnguoi.tuoi} phai khong
    `);
}

infoPerson({ tuoi: 21, ten: "Pho dep trai vcl" })


//interface class
interface interf {
    ten: string;
    tuoi: number;
    diachi: string;
    xemThonTin(): void;
    kiNang(mau: number): any;
    mauda(): void;
}

class vietnam implements interf {
    ten: string;
    tuoi: number;
    diachi: string;
    ngonngu: string;    //them

    xemThonTin(): void {
        console.log(`thong tin: ${this.ten}`);

    };
    kiNang(mau: number): any {
        return "dep trai ngoi ngoi"
    };
    mauda(): void {
        console.log(`mau da la mau vang`);

    };
}

let pho = new vietnam()
pho.ten = "pho";
pho.xemThonTin()