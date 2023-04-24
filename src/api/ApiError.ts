export class ApiError extends Error {
    status: number;
    url: string;

    constructor(message: string, status: number, url: string) {
        super(message)
        this.status = status
        this.url = url
    }
}