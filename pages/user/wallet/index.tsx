import transactionApi from "@/api/transactionApi";
import walletApi from "@/api/walletApi";
import PriceTag from "@/components/PriceTag";
import WalletTable from "@/components/WalletTable";
import UserLayout from "@/layouts/UserLayout";
import Head from "next/head";
import { ReactElement, useState } from "react";
import { FaAngleDown } from "react-icons/fa";

export default function Wallet() {
	const {
		myWallet,
		isLoading: isLoadingWallet,
		isError: isErrorWallet,
	} = walletApi.useMyWallet();

	const [filter, setFilter] = useState<{
		page: number;
		limit: number;
	}>({
		page: 1,
		limit: 10,
	});

	const {
		transactions,
		isLoading: isLoadingTransaction,
		isError: isErrorTransaction,
	} = transactionApi.useExternalTransaction(filter);
	return (
		<div className="bg-white min-h-full">
			<Head>
				<title>Quản lý ví</title>
				<meta name="robots" content="noindex" />
			</Head>
			<div className="sm:p-4 mt-4 sm:mt-[unset]">
				<div>Số dư tài khoản</div>
				<PriceTag
					price={myWallet?.available_balance}
					width={24}
					height={24}
					className="text-3xl font-semibold my-3"
				/>
			</div>
			<div className="flex my-4 sm:my-[unset] sm:px-4 items-center justify-between border-y sm:py-4">
				<div className="body-1-semibold text-neutral-100">
					Lịch sử nạp tiền
				</div>
				<div>
					<p className="text-base text-neutral-60 flex items-center">
						<span className="mr-3">Xếp theo: </span>
						<span className="text-neutral-100 cursor-pointer inline-flex items-center">
							Mới cập nhật <FaAngleDown className="ml-3" />
						</span>
					</p>
				</div>
			</div>
			<div className="overflow-x-auto">
				<WalletTable data={transactions} />
			</div>
		</div>
	);
}
Wallet.getLayout = (page: ReactElement) => {
	return <UserLayout>{page}</UserLayout>;
};
