import { AuthUser } from "../types";

export const isValidSession = (user: AuthUser | undefined) => {
  return user && user.isLoggedIn && user.data && user.data.dni;
};

export const isValidAdminSession = (user: AuthUser | undefined) => {
  return user && user.isLoggedIn && user.isAdmin;
};
