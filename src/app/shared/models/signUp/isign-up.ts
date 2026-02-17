export interface IsignUp {

  name: string;
  email: string;
  password: string;
  rePassword: string;
  phone: string;
}

export interface ISignupResponse {
  message: string;
  token: string;
  user: IsignUp;
}
