/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		domains: [
			"images.unsplash.com",
			"www.coolgenerator.com",
			"facebook.com",
			"openjob.space",
			"niubi.vn",
			"niubi.a2ztech.vn",
		],
	},
	publicRuntimeConfig: {
		apiUrl:
			process.env.NODE_ENV === "development"
				? "http://localhost:5000"
				: process.env.NODE_ENV === "test"
				? "http://localhost:5000"
				: "https://localhost:5000",
	},
};
module.exports = nextConfig;
