import { Outlet, useTransition } from "@remix-run/react";
import type { LoaderFunction, MetaFunction } from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";
import { useEffect, useRef } from "react";
import type { LoadingBarRef } from "react-top-loading-bar";
import LoadingBar from "react-top-loading-bar";
import { Header } from "~/page-components/student/common/header";
import { Sidebar } from "~/page-components/student/common/sidebar";
import { requireStudentId } from "~/session.server";
import { useComputedStudent } from "~/utils";

export const meta: MetaFunction = () => {
  return {
    title: "Student Management Portal",
  };
};

export const loader: LoaderFunction = async ({ request }) => {
  const studentId = await requireStudentId(request);
  return json({ studentId });
};

export default function StudentLayoutPage() {
  const loadingBarRef = useRef(null);
  const student = useComputedStudent();
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
      <Header
        user={{
          email: student.account.email,
          id: student.id,
          name: student.fullName,
        }}
      />
      <Sidebar />
      <div className="w-full lg:pl-64">
        <Outlet></Outlet>
      </div>
    </>
  );
}
