import {
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
} from "@remix-run/react";
import { LinksFunction } from "@remix-run/node";

import "tailwind.css";

export function Layout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
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

export const links: LinksFunction = () => {
	return [
		{ rel: 'preconnect', href: 'fonts.gstatic.com', crossOrigin: 'anonymous' },
		{ rel: 'preconnect', href: 'fonts.googleapis.com' },
		{
			rel: 'stylesheet',
			href: 'https://fonts.googleapis.com/css2?family=Oswald:wght@200..700&display=swap',
		},
		{
			rel: 'stylesheet',
			href: 'https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap'
		}
	]
}