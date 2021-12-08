import { query } from "./index";

interface User {
  dni: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  address: string;
}

export const insertNewUser = async (user: User) => {
  const result = await query(
    `
          INSERT INTO "Clientes" ("Dni", "Nombre", "Apellido", "FechaNacimiento", "Direccion")
          VALUES ($1, $2, $3, $4, $5)
      `,
    [user.dni, user.firstName, user.lastName, user.birthDate, user.address]
  );
  return result;
};

export const insertUserEmail = async (dni: string, email: string) => {
  const result = await query(
    `
          INSERT INTO "CorreosCliente" ("DniCliente", "CorreoElectronico")
          VALUES ($1, $2)
      `,
    [dni, email]
  );
  return result;
};

export const insertUserPhone = async (dni: string, phone: string) => {
  const result = await query(
    `
            INSERT INTO "TelefonosCliente" ("DniCliente", "Telefono")
            VALUES ($1, $2)
        `,
    [dni, phone]
  );
  return result;
};

export const insertNewContract = async (dni: string, promotionNumber: any) => {
  const result = await query(
    `
        INSERT INTO "Contratos" ("DniCliente", "NroPromocion")
        VALUES ($1, $2)
        RETURNING *
      `,
    [dni, promotionNumber]
  );

  return result;
};

export const insertHiredServices = async (
  contractNumber: any,
  services: any
) => {
  const result = await query(
    `
        INSERT INTO "ServiciosContratados" ("NroServicio", "NroContrato", "Cantidad")
        SELECT u.val, $1, 1
        FROM unnest(cast($2 as integer[])) AS u(val)
      `,
    [contractNumber, services]
  );
  return result;
};
