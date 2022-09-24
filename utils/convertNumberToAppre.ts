export default function convertNumberToAppreviation(num?: number): string {
	if (num === undefined) {
		return "";
	}
	if (num < 0) {
		return `-${convertNumberToAppreviation(Math.abs(num))}`;
	}
	if (num < 10000) {
		return num.toString();
	}
	if (num < 1000000) {
		return `${Math.floor(num / 1000)}N`;
	}
	if (num < 1000000000) {
		return `${Math.floor(num / 1000000)}Tr`;
	}
	if (num < 1000000000000) {
		return `${Math.floor(num / 1000000000)}T`;
	}
	return num.toString();
}
