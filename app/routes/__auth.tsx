import { Outlet } from "@remix-run/react";
import type { LoaderFunction } from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";
import { redirect } from "@remix-run/server-runtime";

import { getUser } from "~/session.server";

type AuthLayoutData = {
  redirect: string;
};

export const loader: LoaderFunction = async ({ request }) => {
  try {
    const user = await getUser(request);
    if (user) {
      return redirect("/");
    }
  } catch (err) {
    console.log(err);
  } finally {
    return json<AuthLayoutData>({
      redirect: "/",
    });
  }
};

export default function AuthLayout() {
  return (
    <>
      <div className="h-full">
        <div
          className="absolute -z-10 h-full w-full bg-no-repeat"
          style={{ backgroundImage: "url(images/wave.svg) " }}
        ></div>
        <Outlet></Outlet>
      </div>
    </>
  );
}
