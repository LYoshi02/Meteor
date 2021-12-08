export type Services = {
  internet: InternetService[];
  cable: {
    required: CableService[];
    optional: CableService[];
  };
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
  CantTvs: number;
};

export type Promotion = {
  NroPromocion: number;
  PorcentajeDto: number;
  Duracion: number;
  Servicios: number[];
};
