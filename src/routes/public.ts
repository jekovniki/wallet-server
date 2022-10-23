import bodyParser from "body-parser";
import { RestServer } from "../lib/rest";
import { Error } from "../utils/errors";

export async function setPublicRoutes(rest: RestServer) {
    const server = rest.getServer();

    server.use(bodyParser.json());

    server.get('/health-check', healthCheck);
}

export function healthCheck(_request: Record<string, any>, response: Record<string, any>): void {
    try {
        response.send({
            status: 'online'
        });
    } catch(error) {
        response.json(Error.response(error));
    }
}