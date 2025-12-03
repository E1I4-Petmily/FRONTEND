import { axiosInstance } from "./axios";
import type { SignupRequest, LoginRequest, UserResponse } from "../types/user";
import axios from "axios";

export async function signup(signupData: SignupRequest) {
  const response = await axiosInstance.post(
    "/api/v1/auth/users/register",
    signupData
  );

  return response.data;
}

export async function login(loginData: LoginRequest): Promise<string | null> {
  const { username, password } = loginData;

  const params = new URLSearchParams();
  params.append("username", username);
  params.append("password", password);

  try {
    const response = await axiosInstance.post(
      "/api/v1/auth/users/login",
      params,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    console.log("📩 응답 데이터:", response.data);

    const accessToken = response.data?.accessToken ?? null;

    console.log("📩 AccessToken 값: ", accessToken);

    if (accessToken) {
      localStorage.setItem("accessToken", accessToken);
    }
    return accessToken;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.error("로그인 실패:", err.response?.status, err.response?.data);
    } else {
      console.error("알 수 없는 에러", err);
    }
    return null;
  }
}

export async function getUserProfile(): Promise<UserResponse> {
  const response = await axiosInstance.get("/api/v1/users/me");

  return response.data;
}
