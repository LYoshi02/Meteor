import { useEffect } from "react";

import useUser from "../../hooks/useUser";
import fetchJson from "../../utils/fetchJson";
import { AuthUser } from "../../types";

function LogoutPage() {
  const { mutateUser } = useUser({ redirectTo: "/", redirectIfFound: false });

  useEffect(() => {
    fetchJson<AuthUser>("/api/auth/logout", { method: "POST" }).then(
      (result) => {
        mutateUser(result);
      }
    );
  }, [mutateUser]);

  return <></>;
}

export default LogoutPage;
