function getUser() {
	const user = localStorage.getItem("user");
	return typeof user === "string" ? JSON.parse(user) : null;
}

function getAccessToken() {
	const user = getUser();
	return user ? user.accessToken : "";
}

function getRefreshToken(): string {
	const user = getUser();
	return user ? user.refreshToken : "";
}

function isLoggedIn() {
	return !!getUser();
}

const AuthUtils = {
	getUser,
	getAccessToken,
	getRefreshToken,
	isLoggedIn,
};

export default AuthUtils;
