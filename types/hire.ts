export type Services = {
  internet: InternetService[];
  cable: CableService[];
};

export type InternetService = {
  nroServicio: number;
  nombre: string;
  precio: number;
};

export type CableService = {
  nroServicio: number;
  nombre: string;
  precio: number;
  opcional: boolean;
  cant_tvs: number;
};
