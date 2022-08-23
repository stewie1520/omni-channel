import type {
  LinksFunction,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import "reflect-metadata";

import tailwindStylesheetUrl from "./styles/tailwind.css";
import { getStudent } from "./session.server";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: tailwindStylesheetUrl }];
};

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Omni Channel",
  viewport: "width=device-width,initial-scale=1",
});

type LoaderData = {
  student: Awaited<ReturnType<typeof getStudent>>;
};

export const loader: LoaderFunction = async ({ request }) => {
  const student = await getStudent(request);
  return json<LoaderData>({
    student,
  });
};

export default function App() {
  return (
    <html lang="en" className="h-full">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="h-full">
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
        <script src="js/hs-ui.bundle.js"></script>
      </body>
    </html>
  );
}
