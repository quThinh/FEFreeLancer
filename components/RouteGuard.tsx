// Copy from jasonwatmore.com - https://jasonwatmore.com/post/2021/08/30/next-js-redirect-to-login-page-if-unauthenticated
import AuthUtils from "@/utils/authUtils";
import publicRoutes from "lib/publicRoutes";
import { useRouter } from "next/router";
import { pathToRegexp } from "path-to-regexp";
import { ReactElement, useEffect, useState } from "react";

export { RouteGuard };

function RouteGuard({ children }: { children: ReactElement }) {
	const router = useRouter();
	const [authorized, setAuthorized] = useState(false);

	useEffect(() => {
		// on initial load - run auth check
		authCheck(router.asPath);

		// on route change complete - run auth check
		router.events.on("routeChangeComplete", authCheck);

		// unsubscribe from events in useEffect return function
		return () => {
			router.events.off("routeChangeComplete", authCheck);
		};

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	function authCheck(url: string) {
		// redirect to login page if accessing a private page and not logged in
		const publicPaths = publicRoutes;
		const path = url.split("?")[0];
		if (
			!AuthUtils.isLoggedIn() &&
			!publicPaths.filter((route) => pathToRegexp(route).test(path))
				.length
		) {
			setAuthorized(false);
			router.push({
				pathname: "/auth/login",
				query: { returnUrl: router.asPath },
			});
		} else {
			setAuthorized(true);
		}
	}

	return authorized ? children : null;
}
