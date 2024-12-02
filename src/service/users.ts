import apiClient from "@/lib/apiClient";
import { GetProfile } from "@/types/Users/GetProfile";
import { PostCreateProfile } from "@/types/Users/PostCreateProfile";

export const getProfile = (access_token: string): Promise<GetProfile> =>
  apiClient.get(`/api/getProfile`, { access_token: access_token });

export const postCreateProfile = (
  payload: PostCreateProfile,
  access_token: string
): Promise<any> => apiClient.post(`/api/createProfile`, payload, access_token);

export const putUpdateProfile = (
  payload: PostCreateProfile,
  access_token: string
): Promise<any> => apiClient.put(`/api/updateProfile`, payload, access_token);
