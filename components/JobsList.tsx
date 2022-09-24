import TJob from "interfaces/EJob";
import ItemFindJob from "./ItemFindJob";
export default function JobsList(props: { jobs: TJob[] }) {
	return (
		<div className="flex flex-col gap-4">
			{props.jobs.map((job, index) => (
				<ItemFindJob key={index} job={job} />
			))}
		</div>
	);
}
