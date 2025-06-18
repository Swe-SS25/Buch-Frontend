import Cookies from 'universal-cookie';
import { jwtDecode } from 'jwt-decode';
import type { AuthCookiePayload, JwtTokenPayload } from '@/graphql/interfaces';

const COOKIE_NAME = 'auth_cookie';
const CLIENT_ID = 'nest-client';

class Auth {
    readonly #cookies: Cookies;

    constructor() {
        this.#cookies = new Cookies();
    }

    setAuthCookie(token: string) {
        const decodedJwt = jwtDecode<JwtTokenPayload>(token);
        const { exp, preferred_username } = decodedJwt;
        const cookiePayload = {
            token,
            preferred_username,
        };
        this.#cookies.set(COOKIE_NAME, cookiePayload, {
            expires: new Date(exp * 1000),
            sameSite: 'strict',
        });
        console.log(this.#cookies.get(COOKIE_NAME));
        return this.checkAuthCookie();
    }

    getAuthCookie(): AuthCookiePayload {
        return this.#cookies.get(COOKIE_NAME);
    }

    checkAuthCookie() {
        return this.getAuthCookie() !== undefined;
    }

    removeAuthCookie() {
        this.#cookies.remove(COOKIE_NAME);
    }

    getJwtPayload(): JwtTokenPayload | null {
        const cookie = this.getAuthCookie();
        if (!cookie?.token) return null;
        try {
            return jwtDecode<JwtTokenPayload>(cookie.token);
        } catch {
            return null;
        }
    }

    getRoles(): string[] {
        const payload = this.getJwtPayload();
        if (!payload) return [];
        const realmRoles = payload.realm_access?.roles || [];
        const clientRoles = payload.resource_access?.[CLIENT_ID]?.roles || [];
        return [...realmRoles, ...clientRoles];
    }

    hasRole(role: string): boolean {
        return this.getRoles().includes(role);
    }
}

export default new Auth();
