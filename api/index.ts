import AuthUtils from "@/utils/authUtils";
import axios from "axios";
import jwtDecode from "jwt-decode";
import getConfig from "next/config";
import authApi from "./authApi";

const apiClient = axios.create();

const baseURL = `${getConfig().publicRuntimeConfig.apiUrl}`;

apiClient.defaults.baseURL = baseURL;

apiClient.interceptors.response.use(
	(response) => {
		return response;
	},
	async (error) => {
		const originalRequest = error.config;
		const jwt_decode = AuthUtils.getRefreshToken()
			? jwtDecode(AuthUtils.getRefreshToken())
			: undefined;
		if (error.response.status === 401 && jwt_decode) {
			if ((jwt_decode as any).exp * 1000 < Date.now()) {
				authApi.logout();
			} else {
				await authApi
					.refreshToken()
					.then((res) => {
						originalRequest.headers.Authorization = `Bearer ${res.accessToken}`;
						return axios(originalRequest);
					})
					.catch(() => {
						authApi.logout();
					});
			}
		}
		return Promise.reject(error);
	}
);

const get = (url: string, params?: any) => {
	return apiClient.get(url, {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${AuthUtils.getAccessToken()}`,
		},
		params,
	});
};
const post = (url: string, data?: any) => {
	return apiClient.post(url, data, {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${AuthUtils.getAccessToken()}`,
		},
	});
};
const put = (url: string, data?: any) => {
	return apiClient.put(url, data, {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${AuthUtils.getAccessToken()}`,
		},
	});
};
const _delete = (url: string, data?: any) => {
	return apiClient.delete(url, {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${AuthUtils.getAccessToken()}`,
		},
		data,
	});
};
const patch = (url: string, data?: any) => {
	return apiClient.patch(url, data, {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${AuthUtils.getAccessToken()}`,
		},
	});
};

const api = {
	get,
	post,
	put,
	patch,
	delete: _delete,
};

export default api;
