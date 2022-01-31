export type RefreshTokenResponseType = {
    accessToken: string;
    refreshToken: string;
    user: {
        id: string;
        login: string;
    }
}