import { query } from ".";
import { UserConfigFormValues } from "../types";

export const updateUser = async (user: UserConfigFormValues, dni: string) => {
  const result = await query(
    `
        UPDATE "Clientes"
        SET "Nombre" = $2, "Apellido" = $3, "Direccion" = $4, 
            "CorreoElectronico" = $5, "Telefono" = $6,
            "Contrasena" = CASE 
                WHEN length($7::VARCHAR) > 0 THEN
                    crypt($7, gen_salt('bf'))
                ELSE
                    "Contrasena"
                END
        WHERE "Dni" = $1
    `,
    [
      dni,
      user.firstName,
      user.lastName,
      user.address,
      user.email,
      user.phone,
      user.newPassword,
    ]
  );

  return result;
};
