import { useEffect, useRef } from "react";
import { Outlet, useTransition } from "@remix-run/react";
import type { LoaderFunction, MetaFunction } from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";
import { redirect } from "@remix-run/server-runtime";
import { Header } from "~/page-components/student/common/header";
import { Sidebar } from "~/page-components/student/common/sidebar";
import type { LoadingBarRef } from "react-top-loading-bar";
import LoadingBar from "react-top-loading-bar";
import { getUserId } from "~/session.server";
import { useComputedUser } from "~/utils";

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await getUserId(request);
  if (!userId) return redirect("/sign-in");
  return json({});
};

export const meta: MetaFunction = () => {
  return {
    title: "Student Management Portal",
  };
};

export default function StudentLayoutPage() {
  const loadingBarRef = useRef(null);
  const user = useComputedUser();
  const transition = useTransition();

  useEffect(() => {
    if (loadingBarRef.current === null) return;
    if (transition.state !== "idle") {
      (loadingBarRef.current as LoadingBarRef).continuousStart(0, 0.5);
    } else {
      (loadingBarRef.current as LoadingBarRef).complete();
    }
  }, [loadingBarRef, transition.state]);

  return (
    <>
      <LoadingBar color="#3498db" ref={loadingBarRef} />
      {/* Sidebar */}
      <Header user={{ email: user.email, id: user.id, name: user.fullName }} />
      <Sidebar />
      <div className="w-full lg:pl-64">
        <Outlet></Outlet>
      </div>
    </>
  );
}
