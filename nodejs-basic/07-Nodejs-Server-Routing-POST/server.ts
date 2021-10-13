import http, {Server, IncomingMessage, ServerResponse} from 'http';

const hostname: string = '127.0.0.1';
const port: number = 5001;

const server: Server = http.createServer((request: IncomingMessage, response: ServerResponse) => {
    response.statusCode = 200;
    response.setHeader('Content-Type', 'application/json')
    // URL & POST
    if (request.url === '/user' && request.method === 'POST') {
        try {
            let body: any = '';
            request.on('data', (chunk) => {
                body += chunk;
            }).on('end', () => {
                let formData = JSON.parse(body);
                response.end(`<pre>${JSON.stringify(formData)}</pre>`)
            })
        } catch (error) {
            console.error(error)
        }

    }
    // response.end(`<h3 style="color: green">Wellcome to Nodejs server from Pho </h3>`)

});

server.listen(port, hostname, () => {
    console.log(`NodeJs server is started at http://${hostname}:${port}`);
})