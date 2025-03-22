
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
export interface ApiErrorResponse {
    success: boolean;
    message: string;
    error: {
        code: string;
        details: {
            message: string[];
            error: string;
            statusCode: number;
        };
    };
    timestamp: string;
}
export interface RegisterRequest {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export interface LoginResponse {
    success: boolean;
    message: string;
    data: {
        access_token: string;
        user: {
            id: string;
            email: string;
        };
    };
    timestamp: string;
}

export 
interface ErrorResponse {
    status: number;
    data: {
        message: string;
    };
}
