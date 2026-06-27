import { headers } from "next/headers";
import { auth } from "../auth";

export const authUserData = async () => {
  const userSession = await auth.api.getSession({
    headers: await headers()
  });
  const user = userSession?.user;
  return user;
}