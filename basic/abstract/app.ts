//nhap, mo ta tinh nang cua class
abstract class Phone {
    name: string;

    public sendMessage() {
        console.log('send message');

    }

    abstract facebook(): void;

    public call() {
        console.log('call phone');

    }
}

//chinh xasc hoa no tao ra class su dung lai class abstract tren
class Android extends Phone {
    // thua huong lai tat ca thuoc tinh cua class abstract

    facebook() {
        console.log('like image facebook');
    }
}
let samsung = new Android();
samsung.sendMessage();
samsung.call();
samsung.facebook();