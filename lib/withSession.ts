import type { IronSessionOptions } from "iron-session";

export const sessionOptions: IronSessionOptions = {
  password: process.env.SECRET_COOKIE_PASSWORD as string,
  cookieName: "user-session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};

declare module "iron-session" {
  interface IronSessionData {
    user?: any; // TODO: define attributes
  }
}
