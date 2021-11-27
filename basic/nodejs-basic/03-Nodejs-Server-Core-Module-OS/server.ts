import http, {Server, IncomingMessage, ServerResponse} from 'http';
import * as os from "os";

const hostname: string = '127.0.0.1';
const port: number = 5001;

const server: Server = http.createServer((request: IncomingMessage, response: ServerResponse) => {
    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/html');

    //OS Module
    let osData = {
        totalMemory: os.totalmem(),
        freeMemory: os.freemem(),
        homedir: os.homedir(),
        computerName: os.hostname()
    };
    response.end(`<pre>${JSON.stringify(osData)}</pre>`);
    // response.end(`<h3 style="color: green">Wellcome to Nodejs server from Pho </h3>`)
});

server.listen(port, hostname, () => {
    console.log(`NodeJs server is started at http://${hostname}:${port}`);
})