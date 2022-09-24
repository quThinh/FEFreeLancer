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
				? "https://openjob.space/api"
				: process.env.NODE_ENV === "test"
				? "https://openjob.space/api"
				: "https://openjob.space/api",
	},
};
module.exports = nextConfig;
