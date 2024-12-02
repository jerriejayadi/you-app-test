import apiClient from "@/lib/apiClient";
import { PostLoginPayload, PostLoginResponse } from "@/types/Auth/PostLogin";
import { PostRegisterPayload, PostRegisterResponse } from "@/types/Auth/PostRegister";

export const postLogin = (
  payload: PostLoginPayload
): Promise<PostLoginResponse> =>
  apiClient.post(`/api/login`, payload);

export const postRegister = (
  payload: PostRegisterPayload
): Promise<PostRegisterResponse> =>
  apiClient.post(`/api/register`, payload);
