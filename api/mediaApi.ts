import api from "api";

const getURLImages = async (data: FormData) => {
	return await api
		.post("https://openjob.space/api/medias/file/", data)
		.then((response) => response.data)
		.catch((error: unknown) => {});
};

const mediaApi = {
	getURLImages,
};

export default mediaApi;
