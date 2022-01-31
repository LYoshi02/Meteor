import { useEffect } from "react";
import { NextSeo } from "next-seo";

import useUser from "../hooks/useUser";
import fetchJson from "../utils/fetchJson";
import { AuthUser } from "../types";

function LogoutPage() {
  const { mutateUser } = useUser({ redirectTo: "/", redirectIfFound: false });

  useEffect(() => {
    fetchJson<AuthUser>("/api/auth/logout", { method: "POST" }).then(
      (result) => {
        mutateUser(result);
      }
    );
  }, [mutateUser]);

  return (
    <>
      <NextSeo title="Cerrando Sesión..." noindex />
    </>
  );
}

export default LogoutPage;
