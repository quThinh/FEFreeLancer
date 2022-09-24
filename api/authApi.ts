import AuthUtils from "@/utils/authUtils";
import api from "../api";
import { AxiosError } from "axios";
import jwtDecode from "jwt-decode";
import getConfig from "next/config";
import Router from "next/router";
import { toast } from "react-toastify";

const baseURL = `${getConfig().publicRuntimeConfig.apiUrl}`;

export interface ILogin {
	email: string;
	password: string;
	returnUrl?: string;
}

async function login({ email, password, returnUrl }: ILogin) {
	return await api
		.post("/auth/login", { email, password })
		.then((res) => {
			const user = jwtDecode(res.data.accessToken);
			if ((user as any).role === "client") {
				localStorage.setItem("user", JSON.stringify(res.data));
				Router.push(returnUrl || "/");
				return res.data;
			} else {
				toast.error("Thông tin đăng nhập không hợp lệ", {
					position: "top-center",
					autoClose: 1500,
				});
				return null;
			}
		})
		.catch((err) => {
			let e = err as AxiosError<any>;
			toast.error(e?.response?.data.message, {
				position: "top-center",
				autoClose: 1500,
			});
		});
}
function logout() {
	localStorage.removeItem("user");
	Router.push("/auth/login");
}

async function refreshToken() {
	const user = AuthUtils.getUser();
	if (!user) return;
	return await fetch(`${baseURL}/auth/refresh`, {
		method: "POST",
		headers: {
			Authorization: `Bearer ${AuthUtils.getAccessToken()}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			refreshToken: AuthUtils.getRefreshToken(),
			accessToken: user.accessToken,
		}),
	})
		.then((res) => res.json())
		.then((res) => {
			if (res.accessToken) {
				localStorage.setItem("user", JSON.stringify(res));
				return res;
			}
			return null;
		});
}

const authApi = {
	login,
	logout,
	refreshToken,
};
export default authApi;
