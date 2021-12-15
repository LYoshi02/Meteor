export type Invoice = {
  NroFactura: number;
  FechaFacturacion: string | null;
  Vencimiento: string;
  PeriodoInicio: string;
  PeriodoFin: string;
  DniCliente: string;
  NroContrato: number;
};
