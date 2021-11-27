import http, {Server, IncomingMessage, ServerResponse} from 'http';
import {StringUtil} from "./util/StringUtil";
import {MathUtil} from "./util/MathUtil";

const hostname: string = '127.0.0.1';
const port: number = 5001;

const server: Server = http.createServer((request: IncomingMessage, response: ServerResponse) => {
    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/html');
//String util
    let customerName: string = 'Pho'
    let length: number = StringUtil.printLength(customerName);
    let fullName: string = 'Luu Dang Pho'
    let resultName: string = StringUtil.printTriangle(fullName);

    //Math Util
    let theNumber: number = 5;
    let resultNumber: string = MathUtil.printMathTable(theNumber)
    // response.end(`<pre>${length}</pre>`)
    // response.end(`<pre>${resultName}</pre>`)
    response.end(`<pre>${resultNumber}</pre>`)
});

server.listen(port, hostname, () => {
    console.log(`NodeJs server is started at http://${hostname}:${port}`);
})