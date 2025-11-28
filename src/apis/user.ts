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

export async function login(loginData: LoginRequest): Promise<void> {
  const { username, password } = loginData;

  const response = await axios.post(
    "https://petmilly.duckdns.org/api/v1/auth/users/login",
    null,
    {
      params: { username, password },
    }
  );

  console.log("📩 응답 헤더:", response.headers);
  console.log("📩 응답 데이터:", response.data);

  console.log("📦 요청 URL:", "/api/v1/auth/users/login");
  console.log("📦 요청 params:", { username, password });

  const authHeader =
    response.headers["authorization"] || response.headers["Authorization"];

  const accessToken = authHeader?.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : null;

  console.log("📩 AccessToken 값: ", accessToken);

  if (accessToken) {
    localStorage.setItem("accessToken", accessToken);
  } else {
    throw new Error("로그인 실패: 토큰이 없습니다.");
  }
}

export async function getUserProfile(): Promise<UserResponse> {
  const response = await axiosInstance.get("/api/v1/users/me");

  return response.data;
}
