export type UserFormValues = {
  firstName: string;
  lastName: string;
  dni: number;
  birthDate: Date;
  address: string;
  email: string;
};

export type ServicesFormValues = {
  internet: string;
  cable: string[];
};

export type HireFormValues = {
  user: UserFormValues;
  services: ServicesFormValues;
};
