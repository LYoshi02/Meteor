import { useEffect } from "react";
import Router from "next/router";
import useSWR from "swr";

import { User } from "../types";

type Props = {
  redirectTo: string;
  redirectIfFound: boolean;
};

const useUser = ({ redirectTo, redirectIfFound }: Props) => {
  const { data: user, mutate: mutateUser } = useSWR<User>("api/auth/user");

  useEffect(() => {
    if (!redirectTo || !user) return;

    if (
      (redirectTo && !redirectIfFound && !user?.isLoggedIn) ||
      (redirectIfFound && user?.isLoggedIn)
    ) {
      Router.push(redirectTo);
    }
  }, [redirectIfFound, redirectTo, user]);

  return { user, mutateUser };
};

export default useUser;
