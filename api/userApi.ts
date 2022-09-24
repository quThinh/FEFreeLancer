import api from "api";
import TCategory from "interfaces/ECategory";
import TClient from "interfaces/EClient";
import TSkill from "interfaces/ESkill";
import { NextRouter } from "next/router";
import { toast } from "react-toastify";
import useSWR from "swr";
import i18n from "utils/i18n";

function useUser() {
	const { data, error } = useSWR<TClient>("/user");
	return {
		user: data,
		isLoading: !error && !data,
		isError: error,
	};
}

const changePassword = async (old_password: string, new_password: string) => {
	return await api.patch("/user/change/password", {
		old_password,
		new_password,
	});
};

export interface IEditProfile {
	phone: string;
	fullname?: string;
	birthday?: string;
	address?: string;
	introduction?: string;
	category?: TCategory[];
	skill?: TSkill[];
	social_media_contact?: { link: string; logo?: string }[];
	experience?: {
		job_name: string;
		image: string;
		company_name: string;
		option_time: string;
		start_time: string;
		end_time: string;
		address: string;
		description: string;
	}[];
	eudcation?: {
		image: string;
		university_name: string;
		degree_major: string;
		start_time: string;
		end_time: string;
		description: string;
	}[];
}

const editProfile = async (data: IEditProfile) => {
	return await api.put("/user/change/profile", data);
};

const changeEmail = async (email: string) => {
	return await api
		.patch("/user/change/email", {
			email,
		})
		.catch((error) => {});
};

const register = async ({
	email,
	password,
	fullname,
	phone,
	router,
}: {
	email: string;
	password: string;
	fullname: string;
	phone: string;
	router: NextRouter;
}) => {
	return await api
		.post("/user", {
			email,
			password,
			fullname,
			phone,
		})
		.then(() => router.push("/user/register/verify"))
		.catch((error) => {
			toast.error("Lỗi: " + i18n.t(error?.response?.data?.message));
		});
};

const verifyEmail = async (token: string) => {
	return await api.get(`/user/verify/${token}`);
};
const forgetPasswordVerify = async (token: string, onSuccess?: () => void) => {
	return await api
		.get(`/user/forgot-password/verify/${token}`)
		.then(() => {
			if (onSuccess) {
				onSuccess();
			}
		})
		.catch((error) => {
			toast.error("Lỗi: " + error?.response?.data?.message);
		});
};

const forgetPassword = async (email: string, router: NextRouter) => {
	return await api
		.post("/user/forgot-password", {
			email,
		})
		.then(() => router.push("/user/forgot-password/verify"))
		.catch((error) => {
			toast.error("Lỗi: " + i18n.t(error?.response?.data?.message));
		});
};
const resetPassword = async (
	{
		token,
		password,
		confirm_password,
	}: {
		token: string;
		password: string;
		confirm_password: string;
	},
	onSuccess?: () => void
) => {
	return await api
		.post("/user/forgot-password/updatePassword", {
			active_token: token,
			new_password: password,
			confirm_new_password: confirm_password,
		})
		.then(() => {
			toast.success("Mật khẩu đã được thay đổi");
			if (onSuccess) {
				onSuccess();
			}
		})
		.catch((error) => {
			toast.error("Lỗi: " + i18n.t(error?.response?.data?.message));
		});
};

const userApi = {
	changePassword,
	editProfile,
	changeEmail,
	register,
	verifyEmail,
	forgetPasswordVerify,
	forgetPassword,
	resetPassword,
	useUser,
};

export default userApi;
