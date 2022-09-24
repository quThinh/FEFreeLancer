import ticketApi from "@/api/ticketApi";
import UserLayout from "@/layouts/UserLayout";
import Head from "next/head";
import { useRouter } from "next/router";
import { ReactElement } from "react";
import createTime from 'utils/createTime';

export default function ComplainDetail() {
	const router = useRouter();
	const { query } = router;
	const { ticket: ticketDetail } = ticketApi.useItemTicket(
		query?.id ? { id: String(query.id) } : null
	);
	const { messages: messageList = []} = ticketApi.useMessageTicketList(
		query?.id ? String(query.id) : null
	);
	return (
		<div className="bg-white min-h-full">
			<Head>
				<title>Ticket #{String(ticketDetail?.ticket_id)}</title>
				<meta name="robot" content="noindex,nofollow" />
			</Head>
			<div>
				<div className="p-6 border-b">
					<h3 className="text-2xl font-semibold">
						Chi tiết hỗ trợ: #{ticketDetail?.ticket_id}: {ticketDetail?.title}
					</h3>
					<div className="text-sm text-neutral-600">
						Thời gian tạo: {createTime(ticketDetail?.create_time || "")}
					</div>
				</div>
				<div className="flex gap-4 p-4">
					<div className="w-3/4 border-r">
						{messageList.map((item) => (
							<div key={item.id}>
								<span>{item.content}</span>
							</div>
						))}
					</div>
					<div></div>
				</div>
			</div>
		</div>
	);
}

ComplainDetail.getLayout = (page: ReactElement) => {
	return <UserLayout>{page}</UserLayout>;
};
