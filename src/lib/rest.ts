import { ServerConfiguration } from '../interfaces/server';

export class RestServer {
    private server: any;
    private port: string | undefined;

    constructor(configuration: ServerConfiguration) {
        this.port = configuration.port;
        this.server = configuration.server;
    }

    public start() {
        this.server.listen(this.port, () => {
            console.log(`Server listening on: localhost: ${this.port}`);
        });
    }

    public close() {
        this.server.listen(this.port, () => {
            this.server.close();
        });
    }

    public getServer(): any {
        return this.server;
    }

    public getPort(): string | undefined {
        return this.port;
    }
}