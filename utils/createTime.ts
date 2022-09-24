export default function CreateTime(create_time: string): string {
	const date = new Date(create_time);
	const now = new Date();
	const diff = now.getTime() - date.getTime();
	const diffSeconds = Math.floor(diff / 1000);
	const diffMinutes = Math.floor(diff / 60 / 1000);
	const diffHours = Math.floor(diff / 60 / 60 / 1000);
	const diffDays = Math.floor(diff / 24 / 60 / 60 / 1000);
	const diffWeeks = Math.floor(diff / 7 / 24 / 60 / 60 / 1000);
	const diffMonths = Math.floor(diff / 30 / 24 / 60 / 60 / 1000);
	const diffYears = Math.floor(diff / 365 / 24 / 60 / 60 / 1000);
	if (diffSeconds < 60) {
		return "Vừa xong";
	} else if (diffMinutes < 60) {
		return `${diffMinutes} phút trước`;
	} else if (diffHours < 24) {
		return `${diffHours} giờ trước`;
	} else if (diffDays < 7) {
		return `${diffDays} ngày trước`;
	} else if (diffWeeks < 4) {
		return `${diffWeeks} tuần trước`;
	} else if (diffMonths < 12) {
		return `${diffMonths} tháng trước`;
	} else {
		return `${diffYears} năm trước`;
	}
}
