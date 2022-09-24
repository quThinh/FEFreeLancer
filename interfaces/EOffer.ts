import * as Yup from "yup";

enum OfferStatus {
	PENDING = "PENDING",
	ACCEPTED = "ACCEPTED",
	REJECTED = "REJECTED",
}

export const offerSchema = Yup.object().shape({
	offer_price: Yup.number().required("Hãy nhập chi phí ước tính"),
	offer_finish_estimated_time: Yup.number().required("Hãy nhập thời gian dự kiến hoàn thành"),
	introduction: Yup.string().min(20,"Hãy nhập ít nhất 20 kí tự").required("Hãy nhập giới thiệu bản thân"),
});

type TOffer = {
	_id: string;
	provider_id: {
		_id: string;
		fullname: string;
		avatar: string;
		type: string;
	};
	job_id: string;
	offer_price: number;
	status: number;
	introduction: string;
	offer_finish_estimated_time: number;
	create_time: string;
};

export default TOffer;
