import { NextApiRequest, NextApiResponse, NextApiHandler } from "next";

import {
  AuthenticationError,
  AuthUser,
  ErrorTypes,
  GenericError,
  NotFoundError,
  ValidationError,
} from "../types";

type Handler = {
  [key: string]: NextApiHandler;
};

type Options = {
  requiresUserAuth?: boolean;
  requiresAdminAuth?: boolean;
};

export const apiHandler = (handler: Handler, options?: Options) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const method = req.method!.toLowerCase();

    // check handler supports HTTP method
    if (!handler[method]) {
      return res.status(405).end(`Método ${req.method} no admitido`);
    }

    try {
      validateUser(options, req.session?.user);

      // route handler
      await handler[method](req, res);
    } catch (err: any) {
      // global error handler
      errorHandler(err, res);
    }
  };
};

const validateUser = (
  options: Options | undefined,
  user: AuthUser | undefined
) => {
  if (!options) return;

  if (
    (options.requiresUserAuth && !isValidUserSession(user)) ||
    (options.requiresAdminAuth && !isValidAdminSession(user))
  ) {
    throw new AuthenticationError(
      "No estás autorizado para realizar esta acción"
    );
  }
};

const isValidUserSession = (user: AuthUser | undefined) => {
  return user && user.isLoggedIn && user.data && user.data.dni;
};

const isValidAdminSession = (user: AuthUser | undefined) => {
  return user && user.isLoggedIn && user.isAdmin;
};

const errorHandler = (err: ErrorTypes, res: NextApiResponse) => {
  console.log(err);
  if (err instanceof AuthenticationError) {
    return res.status(401).json({ message: err.message });
  }

  if (err instanceof ValidationError) {
    return res.status(422).json({ message: err.message });
  }

  if (err instanceof NotFoundError) {
    return res.status(404).json({ message: err.message });
  }

  if (err instanceof GenericError) {
    return res.status(err.status).json({ message: err.message });
  }

  return res
    .status(500)
    .json({ message: "Se produjo un error en el servidor" });
};
