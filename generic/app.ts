function watch(x: number): number {
    return x
}
function watch2<T>(x: T): T {
    return x
}

console.log(watch(123))
console.log(watch2(9999));
console.log(watch2('day la ham generic'));


//Generic trong class
class computer {

    static getInfo = <T>(x: T[]) => {
        console.log(x);

    }
}
computer.getInfo<string>(["Ram 8gb", "SSD 129GB"])
computer.getInfo<any>(["Ram 8gb",127836, "SSD 129GB"])
