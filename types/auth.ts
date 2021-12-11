export type AuthUser = {
  isLoggedIn: boolean;
  data: UserData | null;
};

export type UserData = {
  dni: string;
  nombre: string;
  apellido: string;
};
