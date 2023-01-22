export interface Error {
    status?: number;
    message?: string;
}

export interface JwtPayload {
    id: string;
    email: string;
}
