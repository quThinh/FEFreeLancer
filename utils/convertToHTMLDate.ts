export default function convertToHTMLDate(date?: string) {
	if (!date) return "";
	const d = new Date(date || "");
	const year = d.getFullYear();
	let month = String(d.getMonth() + 1);
	month = Number(month) < 10 ? "0" + month : month;
	let day = String(d.getDate());
	day = Number(day) < 10 ? "0" + day : day;
	return `${year}-${month}-${day}`;
}
