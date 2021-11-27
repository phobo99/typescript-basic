let courseName: string = `Backend web development`;
console.log(courseName)

let printNumber = (start: number, end: number): void => {
    let temp: string = '';
    if (start < end) {
        for (let i: number = start; i <= end; i++) {
            temp += `${i} `
        }
        console.log(temp)
    }else {
        console.log('invalid number')
    }
}
printNumber(1,10);