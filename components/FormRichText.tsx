import { useField } from "formik";
import dynamic from "next/dynamic";
const NoSSREditor = dynamic(() => import("./RichTextEditor"), { ssr: false });

interface FormRichTextProps {
	name: string;
	className?: string;
	placeholder?: string;
}
export default function FormRichText(props: FormRichTextProps) {
	const [field, meta, helpers] = useField(props.name);
	return (
		<div className={props.className}>
			<NoSSREditor
				onBlur={field.onBlur}
				editorState={field?.value}
				onChange={(editorState) => helpers.setValue(editorState)}
				placeholder={props.placeholder}
			/>
		</div>
	);
}
