
export interface User {
    id: string;
    email: string;
}
export interface LoginRequest {
    email: string;
    password: string;
}
export interface APIResponse {
    success: boolean;
    message: string;
    data: {
        access_token: string;
        user: User;
    };
    timestamp: string;
}