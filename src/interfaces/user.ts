export type TRequestSignIn = {
    username: string,
    password: string
}

export type TResponseSignIn = {
    success: boolean,
    sessionId: string
}

export type TUserData = {
    id: number;
    username: string;
    email: string;
    password: string;
    role: number;
    balance: number;
}

export type TUserBalance = {
    balance: number
}

export type TUserSessionData = {
    user_id: number,
    user_role: number
}