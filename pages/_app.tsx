import ErrorBoundary from "@/components/ErrorBoundary";
import "draft-js/dist/Draft.css";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import type { ReactElement, ReactNode } from "react";
import "react-toastify/dist/ReactToastify.css";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { SWRConfig } from "swr";
import "../styles/globals.css";
import api from "api";
import { RouteGuard } from "@/components/RouteGuard";
import "../utils/i18n";

type NextPageWithLayout = NextPage & {
	getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
	Component: NextPageWithLayout;
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
	const getLayout = Component.getLayout ?? ((page) => page);
	return (
		<ErrorBoundary>
			<SWRConfig
				value={{
					fetcher: (url) => api.get(url).then((res) => res.data),
					shouldRetryOnError: false,
				}}>
				<RouteGuard>
					<>{getLayout(<Component {...pageProps} />)}</>
				</RouteGuard>
			</SWRConfig>
		</ErrorBoundary>
	);
}
