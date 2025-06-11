import Cookies from 'universal-cookie';
import { jwtDecode } from 'jwt-decode';
import type { AuthCookiePayload, JwtTokenPayload } from '@/graphql/interfaces';

const COOKIE_NAME = 'auth_cookie';

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
}

export default Auth;