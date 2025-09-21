export type IAmount = {
    username: string,
    balance: number;
    createdAt?: Date;
    updatedAt?: Date;
}


export type IUserInfo = {
    username: string
    role?: string
}


export type IWalletResponse = {
    balance: number
}