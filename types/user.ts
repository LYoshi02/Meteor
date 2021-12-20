export type UserConfigFormValues = UserConfigData & UserConfigPassword;

export type UserConfigData = {
  firstName: string;
  lastName: string;
  address: string;
  phone: string;
  email: string;
};

export type UserConfigPassword = {
  currentPassword: string;
  newPassword: string;
};
