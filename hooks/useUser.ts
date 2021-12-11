import { useEffect } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";

import { AuthUser } from "../types";

type Props = {
  redirectTo?: string;
  redirectIfFound?: boolean;
};

const useUser = ({ redirectTo = "", redirectIfFound = false }: Props) => {
  const { data: user, mutate: mutateUser } = useSWR<AuthUser>("/api/auth/user");
  const router = useRouter();

  useEffect(() => {
    if (!redirectTo || !user) return;

    if (
      (redirectTo && !redirectIfFound && !user?.isLoggedIn) ||
      (redirectIfFound && user?.isLoggedIn)
    ) {
      router.push(redirectTo);
    }
  }, [redirectIfFound, redirectTo, user, router]);

  return { user, mutateUser };
};

export default useUser;
