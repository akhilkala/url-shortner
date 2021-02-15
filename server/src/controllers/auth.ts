type AuthInput = {
  email: string;
  password: string;
  token?: string;
};

export const login = (
  _: undefined,
  { email, password, token }: AuthInput
) => {};

export const register = (_: undefined, { email, password }: AuthInput) => {};
