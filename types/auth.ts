export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export interface AuthUser {
  _id: string;
  fullName: string;
  email: string;
  avatar?: string;
}

export type Credentials = {
  email: string;
  password: string;
};

export type SignUpPayload = Credentials & {
  fullName: string;
};

export type LogInPayload = Credentials;

export type UpdateProfilePayload = {
  imageUri: string;
};

export interface AuthState {
  authUser: AuthUser | null;
  isSigningUp: boolean;
  isLoggingIn: boolean;
  isUpdatingProfile: boolean;
  isCheckingAuth: boolean;

  checkAuth(): Promise<void>;
  signUp(payload: SignUpPayload): Promise<void>;
  logIn(payload: LogInPayload): Promise<void>;
  updateProfile(payload: UpdateProfilePayload): Promise<void>;
  logOut(): Promise<void>;
}
