import * as Yup from "yup";
import { InferType } from "yup";
import { date } from "yup/lib/locale";

export enum UserRole {
	ADMIN = "admin",
	CLIENT = "client",
}
export enum UserStatus {
	NEW,
	ACTIVE,
	INACTIVE,
}
export enum UserGender {
	MALE = "male",
	FEMALE = "female",
	OTHER = "other",
}

export const userEduSchema = Yup.object().shape({
	img_file: Yup.mixed().required("Hãy chọn một ảnh"),
	university_name: Yup.string().required("Hãy nhập tên trường đại học"),
	degree_major: Yup.string().required("Hãy nhập bằng cấp và lĩnh vực"),
	start_time: Yup.date().required("Chọn thời gian bắt đầu học"),
	end_time: Yup.date().required("Chọn thời gian kết thúc học"),
	description: Yup.string().default(""),
});

export const userServiceSchema = Yup.object().shape({
	logo: Yup.mixed().required("Hãy chọn một ảnh"),
	name: Yup.string().required("Hãy nhập tên dịch vụ"),
	upper_bound_fee: Yup.number().required("Hãy nhập giá dịch vụ"),
});

export const userExpSchema = Yup.object().shape({
	img_file: Yup.mixed().required("Hãy chọn một ảnh"),
	job_name: Yup.string().required("Hãy nhập tên công việc"),
	company_name: Yup.string().required("Hãy nhập tên công ty"),
	option_time: Yup.string().default("Part-time"),
	start_time: Yup.date().required("Chọn thời gian làm việc"),
	end_time: Yup.date().required("Chọn thời gian làm việc"),
	address: Yup.string().required("Hãy nhập địa chỉ làm việc"),
	description: Yup.string().required("Hãy mô tả về công việc"),
});

export const serviceSchema = Yup.object().shape({
	title: Yup.string().required("Hãy nhập tên dịch vụ"),
	lower_bound_fee: Yup.number().required("Hãy nhập mức giá tối thiểu"),
	upper_bound_fee: Yup.number().required("Hãy nhập mức giá tối đa"),
	work_form: Yup.mixed().required("Hãy chọn hình thức làm việc"),
	finish_estimated_time: Yup.number().required("Hãy chọn thời gian dự kiến hoàn thành").min(1, "Thời gian dự kiến hoàn thành không được bé hơn 1"),
	expiration_time: Yup.date()
		.min(new Date(), "Thời gian kết thúc phải lớn hơn thời gian hiện tại")
		.required("Hãy nhập thời gian kết thúc"),
});

export const jobSchema = Yup.object().shape({
	name: Yup.string().required("Hãy nhập tên công việc"),
	providing_method: Yup.mixed().required("Hãy chọn hình thức làm việc"),
	finish_estimated_time: Yup.number().required(
		"Hãy chọn thời gian dự kiến hoàn thành"
	),
	lower_bound_fee: Yup.number().required("Hãy nhập mức giá tối thiểu"),
	upper_bound_fee: Yup.number().required("Hãy nhập mức giá tối đa"),
	payment_method: Yup.mixed().required("Hãy chọn phương thức thanh toán"),
	required_level: Yup.mixed().required("Hãy chọn yêu cầu kinh nghiệm"),
	image: Yup.mixed().required("Thêm ít nhất 1 ảnh"),
	expiration_time: Yup.string().required("Hãy chọn thời gian kết thúc"),
});

export const offerSchema = Yup.object().shape({
	offer_finish_estimated_time: Yup.number().required(
		"Hãy chọn thời gian dự kiến hoàn thành"
	),
	offer_price: Yup.number().required("Hãy nhập mức giá tối thiểu"),
	introduction: Yup.string()
		.max(20000)
		.min(20, "Hãy nhập ít nhất là 20 kí tự"),
});

export const depositionInfo = Yup.object().shape({
	bank_id: Yup.string().required("Hãy chọn ngân hàng của bạn"),
	amount: Yup.number().required("Hãy nhập số tiền muốn rút"),
	bank_number: Yup.string().required("Hãy nhập số tài khoản của bạn"),
	bank_name: Yup.string().required("Hãy nhập tên tài khoản"),
});

export const userSchema = Yup.object().shape({
	_id: Yup.string().default(""),
	avatar: Yup.string().default(""),
	email: Yup.string().email().required().default(""),
	fullname: Yup.string().required().default(""),
	address: Yup.string().default(""),
	phone: Yup.string().required().default(""),
	sex: Yup.string().default(""),
	birthday: Yup.string().default(""),
	status: Yup.mixed().oneOf([
		UserStatus.NEW,
		UserStatus.ACTIVE,
		UserStatus.INACTIVE,
	]),
	description: Yup.string().max(20000),
	experience: Yup.object(),
	type: Yup.mixed<UserRole>().oneOf(Object.values(UserRole)),
});

type TUser = InferType<typeof userSchema>;
export default TUser;
