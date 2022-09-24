import { Editor, EditorState, Entity, RichUtils } from "draft-js";
import {
	AiOutlineLink,
	AiOutlineOrderedList,
	AiOutlineUnorderedList,
} from "react-icons/ai";
import 'draft-js/dist/Draft.css';
import { BsTypeBold } from "react-icons/bs";
import Button from "./Button";

interface RichTextEditorProps {
	editorState?: EditorState;
	onChange: (editorState: EditorState) => void;
	onBlur: (e: any) => void;
	placeholder?: string;
}
export default function RichTextEditor({
	editorState = EditorState.createEmpty(),
	onChange,
	onBlur,
	placeholder,
}: RichTextEditorProps) {
	
	return (
		<div className="p-4 h-60 border">
			<Editor
				onBlur={onBlur}
				editorState={editorState}
				onChange={(editorState) => onChange(editorState)}
				placeholder={placeholder}
			/>
			<div className="h-5 flex">
				<button type="button"
					onClick={() =>
						{
							console.log(editorState.getCurrentInlineStyle())
							onChange(
							RichUtils.toggleInlineStyle(editorState, "UNDERLINE")
						)}
					}>
					<strong>B</strong>
				</button>
				<button type="button"
					onClick={() =>
						onChange(
							RichUtils.toggleInlineStyle(editorState, "ITALIC")
						)
					}>
					<i>I</i>
				</button>
				<button type="button"
					onClick={() =>
						onChange(
							RichUtils.toggleBlockType(
								editorState,
								"ordered-list-item"
							)
						)
					}>
					<AiOutlineOrderedList />
				</button>
				<button type="button"
					onClick={() =>
						onChange(
							RichUtils.toggleBlockType(
								editorState,
								"unordered-list-item"
							)
						)
					}>
					<AiOutlineUnorderedList />
				</button>
				<button type="button"
					onClick={() =>
						onChange(
							RichUtils.toggleLink(
								editorState,
								editorState.getSelection(),
								Entity.create("UNDERLINE", "MUTABLE")
							)
						)
					}>
					<AiOutlineLink />
				</button>
			</div>
		</div>
	);
}
