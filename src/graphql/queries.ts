import axios, { type AxiosResponse } from 'axios';
import type { SuchkriterienInput, LoginStatus, BuchInput } from "./interfaces";
import { buildQuery } from './queryHelper';
import Auth from './auth.ts';

const auth = new Auth();

export const login = async (username: string, password: string) => {
  const mutation = `
  mutation {
      login(username: "${username}", password: "${password}") {
        access_token
        expires_in
        roles
      }
  }`;

  const options = {
      method: 'POST',
      url: 'https://localhost:3000/graphql',
      headers: {
          'Content-Type': 'application/json',
          'X-REQUEST-TYPE': 'GraphQL',
      },
      data: {
          query: mutation,
      },
  };

  const LoginStatus: LoginStatus = {
      loggedIn: false,
      errors: [],
  };

  try {
    const result = await axios.request(options);
    const { errors, data } = result.data;
    const { login } = data;
    if (login) {
      const { access_token } = login;
      const loggedIn = auth.setAuthCookie(access_token);
      if (!loggedIn) {
        throw new Error('Login fehlgeschlagen');
      }
      LoginStatus.loggedIn = loggedIn;
    }
    if (errors) {
      const errMessage = errors
        .flatMap((err: { message: string }) => err.message)
        .toString();
      LoginStatus.errors?.push(errMessage);
    }
  } catch (err: any) {
    LoginStatus.errors?.push(err.message);
  }

  return LoginStatus;
};

export const queryBuecher = async (
  suchkriterien: SuchkriterienInput,
): Promise<AxiosResponse> => {
  const query = buildQuery(suchkriterien);

  const options = {
      method: 'POST',
      url: 'https://localhost:3000/graphql',
      headers: {
          'Content-Type': 'application/json',
          'X-REQUEST-TYPE': 'GraphQL',
          ...(auth.checkAuthCookie() && {
              Authorization: `Bearer ${auth.getAuthCookie().token}`,
          }),
      },
      data: {
          query,
      },
  };

  return axios.request(options);
};

export const createBuch = async (
  input: BuchInput,
): Promise<AxiosResponse> => {
  const mutation = `
    mutation CreateBuch($input: BuchInput!) {
      create(input: $input) {
        id
      }
    }
  `;

  const options = {
    method: 'POST',
    url: '/graphql',
    headers: {
      'Content-Type': 'application/json',
      'X-REQUEST-TYPE': 'GraphQL',
      ...(auth.checkAuthCookie() && {
        Authorization: `Bearer ${auth.getAuthCookie().token}`,
      }),
    },
    data: {
      query: mutation,
      variables: { input },
    },
  };

  return axios.request(options);
};