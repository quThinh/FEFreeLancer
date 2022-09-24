export default function convertToDateText(date? : string){
	const d = new Date(date || "");
	const year = d.getFullYear();
	let month = String(d.toLocaleString('default', { month: 'long' }));
 	let day = String(d.getDate());
	return `${month} ${day},${year}`;
}