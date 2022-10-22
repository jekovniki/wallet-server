

export class Database {
    private connection: any;

    constructor(connection: any) {
        this.connection = connection;
    }

    public getConnection(): any {
        return this.connection;
    }

    public async connect(): Promise<void> {
        this.connection.connect((error: any) => {
            if (error) {
                throw error;
            }

            console.log('Database successfully connected!');
        });
    }

    public async end(): Promise<void> {
        this.connection.end((error: any) => {
            if (error) {
                throw error;
            }
        });
    }

    public async query(queryString: string, parameters: any = []): Promise<any> {
        return new Promise((resolve, reject) => {
            this.connection.query(queryString, parameters, (error: any, result: any) => {
                if (error) {
                    console.log(error);
                    reject(error);   
                }

                resolve(result);
            })
        })
    }
}