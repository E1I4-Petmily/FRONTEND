export interface SignupRequest {
  username: string; // email
  password: string;
  nickname: string;
  userProfile: number;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface UserResponse {
  nickname: string;
  userProfile: number;
}
