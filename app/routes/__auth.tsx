import { Outlet } from "@remix-run/react";
import type { LoaderFunction } from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";
import { redirect } from "@remix-run/server-runtime";

import { getStudent } from "~/session.server";

type AuthLayoutData = {
  redirect: string;
};

export const loader: LoaderFunction = async ({ request }) => {
  try {
    const student = await getStudent(request);
    if (student) {
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
        <div className="absolute top-0 left-0 -z-10 h-full w-full">
          <img draggable="false" src="images/wave.svg" alt="wave" />
        </div>
        <Outlet></Outlet>
      </div>
    </>
  );
}
