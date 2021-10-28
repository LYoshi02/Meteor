export type UserFormValues = {
  firstName: string;
  lastName: string;
  dni: number;
  birthDate: Date;
  address: string;
  phone: string;
  email: string;
};

export type ServicesFormValues = {
  internet: string;
  cable: {
    required: string;
    optional: string[];
  };
};

export type HireFormValues = {
  user: UserFormValues;
  services: ServicesFormValues;
};
