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

import { getAccount } from "./session.server";
import tailwindStylesheetUrl from "./styles/tailwind.css";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: tailwindStylesheetUrl }];
};

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Omni Channel",
  viewport: "width=device-width,initial-scale=1",
});

type LoaderData = {
  account: Awaited<ReturnType<typeof getAccount>>;
};

export const loader: LoaderFunction = async ({ request }) => {
  const account = await getAccount(request);
  return json<LoaderData>({
    account,
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
