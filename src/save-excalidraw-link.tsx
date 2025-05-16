import {
	Form,
	showToast,
	Toast,
	Action,
	ActionPanel,
	launchCommand,
	LaunchType,
} from "@raycast/api";
import { useForm } from "@raycast/utils";
import { createLink } from "./services/api/endpoints/links";
import { urlValidation } from "./services/validation/url";

interface FormValues {
	url: string;
	description: string;
}

export default function Command() {
	const { handleSubmit, itemProps } = useForm<FormValues>({
		validation: {
			url: (value) => {
				const result = urlValidation.format(value);
				if (!result.isValid) return result.message;
			},
			description: (value) => {
				if (!value) return "Required";
			},
		},
		async onSubmit(values) {
			const toast = await showToast({
				style: Toast.Style.Animated,
				title: "Creating excalidraw-save link...",
			});

			try {
				await createLink({ url: values.url, description: values.description });
				toast.style = Toast.Style.Success;
				toast.title = "Link created";

				await launchCommand({
					name: "list-excalidraw-links",
					type: LaunchType.UserInitiated,
				});
			} catch (error) {
				toast.style = Toast.Style.Failure;
				toast.title = "Failed to create link";
				toast.message =
					error instanceof Error ? error.message : "Unknown error occurred";
			}
		},
	});

	return (
		<Form
			enableDrafts
			actions={
				<ActionPanel>
					<Action.SubmitForm title="Create Link" onSubmit={handleSubmit} />
				</ActionPanel>
			}
		>
			<Form.TextField
				{...itemProps.url}
				title="URL"
				placeholder="https://excalidraw.com/#room=..."
				autoFocus
			/>
			<Form.TextField
				{...itemProps.description}
				title="Description"
				placeholder="Description for this excalidraw canvas"
			/>
		</Form>
	);
}
