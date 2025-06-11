export interface JwtTokenPayload {
    exp: number;   // Zeitpunkt des Ablaufs
    iat: number;   // Ausstellungszeitpunkt
    jti: string;   // JWT ID
    iss: string;   // Herausgeber
    aud: string;   // Audience
    sub: string;   // Subject
    typ: string;   // Type
    azp: string;   // Authorized party
    session_state: string; 
    acr: string;   // Authentication Context Class Reference
    allowed_origins: string[];
    realm_access: { roles: string[] };
    resource_access: {
        [key: string]: {
            roles: string[];
        }
    };
    scope: string;
    sid: string;   // Session ID
    email_verified: boolean;
    name: string;
    preferred_username: string;
    given_name: string;
    family_name: string;
    email: string;
}

export interface AuthCookiePayload {
    token: string;
    username: string;
}

export interface LoginStatus {
    errors: string[];
    loggedIn: boolean;
    expiresIn?: string;
    issuer?: string;
}

// Eventuell umschreiben zu const-array
export type BuchArt = 
  | "DRUCKAUSGABE"
  | "KINDLE";

export interface SuchkriterienInput {
    titel?: string;
    isbn?: string;
    rating?: number;
    art?: BuchArt;
    lieferbar?: boolean;
}
