import http, {Server, IncomingMessage, ServerResponse} from 'http';

const hostname: string = '127.0.0.1';
const port: number = 5001;

const server: Server = http.createServer((request: IncomingMessage, response: ServerResponse) => {
    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/html')
    // URL & POST
    if (request.url === '/login' && request.method === 'POST') {
        try {
            let body: any = '';
            request.on('data', (chunk) => {
                body += chunk;
            }).on('end', () => {
                let formData = JSON.parse(body);
                if (formData.name === 'Pho' && formData.password === '123') {
                    response.end(`<h3 style="color: green">Login is success!</h3>`)
                } else {
                    response.end(`<h3 style="color: red">Login fail</h3>`)
                }
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