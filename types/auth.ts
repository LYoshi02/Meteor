export type AuthUser = {
  isLoggedIn: boolean;
  isAdmin: boolean;
  data: UserData | null;
};

export type UserData = {
  dni: string;
  firstName: string;
  lastName: string;
};
