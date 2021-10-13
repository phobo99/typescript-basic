import http from "http";

export class ApiRouter {
    public static mapRoutes(request: http.IncomingMessage, response: http.ServerResponse) {
        let url: string | undefined = request.url;
        let method: string | undefined = request.method;
        let result: string = '';
        if (url === '/' && method === 'GET') {
            result = `<h3 style="color: green">Wellcome to Nodejs server from Pho </h3>`
        } else if (url === '/about' && method === 'GET') {
            result = `<h3 style="color: green">About me</h3>`
        } else {
            result = `<h3 style="color: green">Page not found!</h3>`
        }
        response.end(`${result}`)
    }
}