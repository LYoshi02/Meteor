export type Services = {
  internet: InternetService[];
  cable: CableService[];
};

export type InternetService = {
  NroServicio: number;
  Nombre: string;
  Precio: string;
};

export type CableService = {
  NroServicio: number;
  Nombre: string;
  Precio: string;
  Opcional: boolean;
  CantTvs: number;
};

export type Deal = {
  NroPromocion: number;
  PorcentajeDto: number;
  Duracion: number;
  Servicios: number[];
};
