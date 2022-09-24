export default function removeUndefined(obj: any): any {
	if (obj === undefined) {
		return undefined;
	}
	if (obj === null) {
		return null;
	}
	if (typeof obj === "object") {
		const newObj: any = {};
		for (const key in obj) {
			if (obj.hasOwnProperty(key)) {
				const value = obj[key];
				if (value !== undefined) {
					newObj[key] = removeUndefined(value);
				}
			}
		}
		return newObj;
	}
	return obj;
}
