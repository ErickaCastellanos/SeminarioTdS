export interface LinkedinUser {
    email: string;
    name: string;
    token: string;
    tokenExpirationTime: number;
    firstIdentification: boolean;
    _id?: unknown;
}

export enum AuthProvider {
    LINKEDIN
}

export interface Query {
    identifyWithOAuth(
        provider: AuthProvider,
      code: string,
      redirectUri: string,
    ): LinkedinUser
}