export type Services = {
  internet: {
    nroServicio: number;
    nombre: string;
    precio: number;
  }[];
  cable: {
    nroServicio: number;
    nombre: string;
    precio: number;
    opcional: boolean;
  }[];
};
