export interface PostLoginPayload {
  email: string;
  username: string;
  password: string;
}

export interface PostLoginResponse {
  message: string;
  access_token: string;
}
