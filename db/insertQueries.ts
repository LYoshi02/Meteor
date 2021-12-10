import { query } from "./index";

interface User {
  dni: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  address: string;
  email: string;
  phone: string;
}

export const insertNewUser = async (user: User, password: string) => {
  const result = await query(
    `
          INSERT INTO "Clientes" ("Dni", "Nombre", "Apellido", "FechaNacimiento", "Direccion", 
            "Telefono", "CorreoElectronico", "Contrasena")
          VALUES ($1, $2, $3, $4, $5, $6, $7, crypt($8, gen_salt('bf')))
      `,
    [
      user.dni,
      user.firstName,
      user.lastName,
      user.birthDate,
      user.address,
      user.phone,
      user.email,
      password,
    ]
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
