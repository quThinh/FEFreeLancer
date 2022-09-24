import jobProductApi from "@/api/jobProductApi";
import orderApi from "@/api/orderApi";
import reviewApi from "@/api/reviewApi";
import { Form, Formik } from "formik";
import EJob from "interfaces/EJob";
import Image from "next/image";
import { useState } from "react";
import Button from "./Button";
import CustomDialog from "./CustomDialog";
import FormTextArea from "./FormTextArea";
import Rating from "./Rating";

interface ReviewDialogProps {
	isOpen: boolean;
	onClose: () => void;
	idJob: string;
}

export default function ReviewDialog({
	isOpen,
	onClose,
	idJob,
}: ReviewDialogProps) {
	const {order, isError} = orderApi.getOrderById(idJob)
	const [rating, setRating] = useState(0);
	return (
		<CustomDialog
			onClose={() => onClose()}
			open={isOpen}
			onSubmit={() => onClose()}
			title="Đánh giá dịch vụ">
			<div className="flex flex-col divide-y divide-1-grey">
				<div className="py-8">
					<div className="h-[38px] w-1/2 flex">
						<div className="mr-2">
							<Image
								src={"/work.jpg"}
								alt="media"
								className="rounded-full"
								width={"48px"}
								height={"48px"}
							/>
						</div>
						<div>
							<p className="body-4-semibold m-0">
								{order?.provider_id?.fullname || ""}
							</p>
							<span className="text-center p-1 text-[10px] bg-gradient-to-r from-[#FF4D97] to-[#FF9500] text-white rounded-tl-lg rounded-br-lg">
								TOP RATE
							</span>
						</div>
					</div>
				</div>
				<div className="flex items-center py-4">
					<div>Dịch vụ</div>
					<div className="ml-auto body-5-semibold text-neutral-100">
						{order?.product_id?.name || ""}
					</div>
				</div>
				<div className="flex items-center py-4">
					<div>Đánh giá</div>
					<div className="ml-auto">
						<Rating
							value={rating}
							onChange={(value) => {
								setRating(value);
							}}
						/>
					</div>
				</div>
				<div className="py-4">
					<Formik
						initialValues={{
							comment: "",
							initRating: 0,
						}}
						onSubmit={(values) => {
							reviewApi
								.createOrderReview({
									rate: rating ? rating : values.initRating,
									content: values.comment,
									orderId: order ? order._id : idJob,
								})
								.then((res) => {
									console.log(res);
									onClose();
								})
								.catch((e) => {
									console.log(e);
								});
								onClose();
						}}>
						{(props) => (
							<Form>
								<label>Nhận xét dịch vụ</label>
								<FormTextArea
									rows={4}
									name="comment"
									className="border p-4 w-full"
									placeholder="Nhập mô tả dịch vụ"
									maxLength={500}
								/>
								<p className="flex justify-between text-sm text-neutral-60">
									<span>Tối đa 500 ký tự </span>
									<span>
										{props.values.comment.length}
										/500
									</span>
								</p>
								<div className="flex items-center gap-3 justify-end">
									<Button
										type="button"
										sm
										secondary
										onClick={() => onClose()}>
										Hủy
									</Button>
									<Button type="submit" sm primary>
										Hoàn thành
									</Button>
								</div>
							</Form>
						)}
					</Formik>
				</div>
			</div>
		</CustomDialog>
	);
}
