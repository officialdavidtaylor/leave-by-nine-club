import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';
import type { LinksFunction, MetaFunction } from '@remix-run/node';

import './tailwind.css';

import favicon96 from './assets/favicon-96x96.png';
import faviconIco from './assets/favicon.ico';
import faviconSvg from './assets/favicon.svg';
import faviconAppleTouchIcon from './assets/apple-touch-icon.png';
import siteManifest from './assets/site.webmanifest';

export const links: LinksFunction = () => [
  {
    rel: 'icon',
    type: 'image/png',
    href: favicon96,
    sizes: '96x96',
  },
  {
    rel: 'apple-touch-icon',
    href: faviconAppleTouchIcon,
    sizes: '180x180',
  },
  {
    rel: 'icon',
    type: 'image/svg+xml',
    href: faviconSvg,
  },
  {
    rel: 'shortcut icon',
    href: faviconIco,
  },
  { rel: 'manifest', href: siteManifest },
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:ital,wght@0,400;0,700;1,400;1,700&family=Bungee+Shade&family=Geologica:wght@200&display=swap',
  },
];

export const meta: MetaFunction = () => [
  { name: 'apple-mobile-web-app-title', content: 'LeaveBy9' },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
