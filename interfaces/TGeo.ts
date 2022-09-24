export type TGeo = {
	_id: string;
	code: string;
	name: string;
};

export type TProvince = TGeo & {
	country_code: string;
};
