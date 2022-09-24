import api from "api";
import { AxiosError } from "axios";
import { BsBank } from "react-icons/bs";
import { toast } from "react-toastify";
import useSWR from "swr";

const useMyWallet = () => {
	const { data, error } = useSWR("/wallet/my");
	return {
		myWallet: data,
		isLoading: !data && !error,
		isError: error,
	};
};


export interface IdepositMoney {
	amount: number,
	bank: string,
	sender_name: string,
	sender_account: string,
	sender_bank: string,
	sender_bank_branch: string,
	content: string,
}

export interface IGetBankList {
	page: number;
	limit: number;
}

const depositMoney = async (depositRequest : IdepositMoney) => {
	return await api
		.post("/wallet/deposit",
			depositRequest
		)
		.then(() => toast.info("Đang xử lý nộp tiền"))
		.catch((error: unknown) => {
			let e = error as AxiosError<any>;
			toast.error(e?.response?.data.message);
		});
};

function useadminBankList(filter : IGetBankList){
		const {data} = useSWR("/admin_bank/all")
		return {
			adminlistBank: data?.data
		}
}

function uselistBank() {
	const { data, error } = useSWR("https://api.vietqr.io/v2/banks")
	return {
		listBank: data?.data,
		isError: error,
	}
}

const withdrawMoney = async ({
	amount,
	bank,
	ownerName,
	accountNumber,
}: {
	amount: number;
	bank: string;
	ownerName: string;
	accountNumber: string;
}) => {
	return await api
		.post("/wallet/withdraw", {
			amount: amount,
			bank: bank,
			ownerName: ownerName,
			accountNumber: accountNumber,
		})
		.then(() => toast.info("Đang xử lý rút tiền"))
		.catch((error) => {
			if (error?.response?.data.message == "insufficient available balance")
				toast.error("Không đủ số dư");
			else if(error?.response?.data.message == "you have a pending withdraw transaction")
				toast.error("Bạn đang có 1 giao dịch rút tiền chưa được xử lý")
		});
};

interface IGetVNPAYIPN {
	vnp_Amount: string;
	vnp_TmnCode: string;
	vnp_BankCode: string;
	vnp_BankTranNo: string;
	vnp_OrderInfo: string;
	vnp_CardType: string;
	vnp_PayDate: string;
	vnp_TransactionNo: string;
	vnp_ResponseCode: string;
	vnp_TxnRef: string;
	vnp_SecureHash: string;
	vnp_SecureHashType: string;
	vnp_TransactionStatus?: string;
}

const getVNPAYIPN = async (params: IGetVNPAYIPN) => {
	return await api.get("/wallet/VnPayIPN", { params });
};

const walletApi = {
	useadminBankList,
	useMyWallet,
	depositMoney,
	withdrawMoney,
	getVNPAYIPN,
	uselistBank,
};

export default walletApi;
