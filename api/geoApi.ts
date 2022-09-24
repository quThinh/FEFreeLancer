import { TProvince } from "interfaces/TGeo";
import useSWR from "swr";

function useCountries() {
	const { data, error } = useSWR("/geo/countries");
	return {
		countries: data,
		isLoading: !data && !error,
		isError: error,
	};
}

function useProvinces() {
	const { data, error } = useSWR<TProvince[]>("/geo/provinces");
	return {
		provinces: data,
		isLoading: !data && !error,
		isError: error,
	};
}

function useDistricts() {
	const { data, error } = useSWR<TProvince[]>("/geo/districts");
	return {
		districts: data,
		isLoading: !data && !error,
		isError: error,
	};
}

function useWards() {
	const { data, error } = useSWR<TProvince[]>("/geo/wards");
	return {
		wards: data,
		isLoading: !data && !error,
		isError: error,
	};
}

function useCountryByCode(code: string) {
	const { data, error } = useSWR(`/geo/countries/${code}`);
	return {
		country: data,
		isLoading: !data && !error,
		isError: error,
	};
}

function useDistrictByCode(code: string) {
	const { data, error } = useSWR(`/geo/districts/${code}`);
	return {
		district: data,
		isLoading: !data && !error,
		isError: error,
	};
}

function useProvinceByCode(code: string) {
	const { data, error } = useSWR(`/geo/provinces/${code}`);
	return {
		province: data,
		isLoading: !data && !error,
		isError: error,
	};
}

function useWardByCode(code: string) {
	const { data, error } = useSWR(`/geo/wards/${code}`);
	return {
		ward: data,
		isLoading: !data && !error,
		isError: error,
	};
}

function useProvincesByCountryCode(code: string) {
	const { data, error } = useSWR(`/geo/provinces/bycountry/${code}`);
	return {
		provinces: data,
		isLoading: !data && !error,
		isError: error,
	};
}

function useDistrictsByProvinceCode(code: string) {
	const { data, error } = useSWR(`/geo/districts/byprovince/${code}`);
	return {
		districts: data,
		isLoading: !data && !error,
		isError: error,
	};
}

function useWardsByDistrictCode(code: string) {
	const { data, error } = useSWR(`/geo/wards/bydistrict/${code}`);
	return {
		wards: data,
		isLoading: !data && !error,
		isError: error,
	};
}

const geoApi = {
	useCountries,
	useProvinces,
	useDistricts,
	useWards,
	useCountryByCode,
	useDistrictByCode,
	useProvinceByCode,
	useWardByCode,
	useProvincesByCountryCode,
	useDistrictsByProvinceCode,
	useWardsByDistrictCode,
};

export default geoApi;
