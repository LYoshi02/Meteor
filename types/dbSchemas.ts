export type ServiceSchema = {
  NroServicio: number;
  Nombre: string;
  Precio: string;
};

export type InternetServiceSchema = {
  NroServicio: number;
  Velocidad: number;
};

export type CableServiceSchema = {
  NroServicio: number;
  CantTvs: number;
  Opcional: boolean;
};

export type PromotionSchema = {
  NroPromocion: number;
  PorcentajeDto: number;
  Duracion: number;
  Finalizado: boolean;
};

export type ContractSchema = {
  NroContrato: number;
  FechaInicio: string;
  FechaFin: string | null;
  DniCliente: string;
  NroPromocion: number | null;
};

export type InvoiceSchema = {
  NroFactura: number;
  FechaFacturacion: string | null;
  Vencimiento: string;
  PeriodoInicio: string;
  PeriodoFin: string;
  DniCliente: string;
  NroContrato: number;
};

export type ClientSchema = {
  Dni: string;
  Nombre: string;
  Apellido: string;
  FechaNacimiento: string;
  Direccion: string;
  Telefono: string;
  CorreoElectronico: string;
};

export type UserSchema = {
  Contrasena: string;
  CorreoElectronico: string;
  Rol: number;
};

export type RoleSchema = {
  NroRol: number;
  Nombre: string;
};

export type InvoiceDetailSchema = {
  NroRenglon: number;
  Descripcion: string;
  Cantidad: number;
  TotalParcial: string;
  NroFactura: number;
  NroServicio: number;
  EsDescuento: boolean;
};
