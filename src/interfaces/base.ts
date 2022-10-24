export type TBaseResponse = {
    success: boolean;
    message?: string;
}

export type TRoles = {
    id: number;
    name: string;
    permissions: string;
}