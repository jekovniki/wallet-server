export type TBaseResponse = {
    success: boolean;
    message?: string;
}

export type TRoles = {
    id: number;
    name: string;
    permissions: string;
}

export interface IBaseRequestBody {
    userId: number,
    sessionId: string
}

export interface IUserSession extends IBaseRequestBody {
    userRole: number,
    success: boolean
}