import {
	Action,
	ActionPanel,
	Form,
	showToast,
	Toast,
	useNavigation,
} from "@raycast/api";
import { useForm } from "@raycast/utils";
import type { Link } from "../types";
import { updateLink } from "../services/api/endpoints/links";
import { urlValidation } from "../services/validation/url";

interface LinkDetailProps {
	link: Link;
	onRefresh: () => void;
}

interface FormValues {
	url?: string;
	description?: string;
	pinned?: boolean;
	archived?: boolean;
}

export const LinkDetail = ({ link, onRefresh }: LinkDetailProps) => {
	const { pop } = useNavigation();
	const { handleSubmit, itemProps } = useForm<FormValues>({
		validation: {
			url: (value) => {
				const result = urlValidation.format(value);
				if (!result.isValid) return result.message;
			},
		},
		async onSubmit(values) {
			const toast = await showToast({
				style: Toast.Style.Animated,
				title: "Updating link...",
			});

			try {
				await updateLink(link.id, {
					url: values.url,
					description: values.description,
					pinned: values.pinned,
					archived: values.archived,
				});

				toast.style = Toast.Style.Success;
				toast.title = "Link updated successfully";

				onRefresh(); // 更新后重新获取 links list
				pop(); // 更新成功后返回上一级
			} catch (error) {
				toast.style = Toast.Style.Failure;
				toast.title = "Failed to update link";
				toast.message =
					error instanceof Error ? error.message : "Unknown error occurred";
			}
		},
		// 使用传入的 link 对象的值作为表单的初始值
		initialValues: {
			url: link.url,
			description: link.description,
			pinned: link.pinned === 1,
			archived: link.archived === 1,
		},
	});

	return (
		<Form
			navigationTitle="Edit Link"
			actions={
				<ActionPanel>
					<Action.SubmitForm title="Update Link" onSubmit={handleSubmit} />
				</ActionPanel>
			}
		>
			<Form.TextField
				{...itemProps.url}
				title="URL"
				placeholder="https://excalidraw.com/#room=..."
			/>
			<Form.TextField
				{...itemProps.description}
				title="Description"
				placeholder="Description for this excalidraw canvas"
			/>
			<Form.Checkbox
				{...itemProps.pinned}
				title="Pinned"
				label="Pinned to the top of the list"
			/>
			<Form.Checkbox
				{...itemProps.archived}
				title="Archived"
				label="Archived links will not be shown in the default list"
			/>
		</Form>
	);
};
