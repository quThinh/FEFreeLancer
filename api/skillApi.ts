import TSkill from "interfaces/ESkill";
import useSWR from "swr";

function useSkill() {
	return useSWR<TSkill[]>("/skills");
}

const skillApi = {
	useSkill,
};

export default skillApi;
